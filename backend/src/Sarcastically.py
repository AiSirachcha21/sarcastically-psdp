import sys

from flask_restful import Resource
from flask import request, url_for
import os
import subprocess

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from werkzeug.datastructures import FileStorage
import librosa
import numpy as np
from tensorflow.keras.models import load_model


class Sarcastically(Resource):
    model_folder_path = "static"
    @staticmethod
    def convert_audio_to_wav(file):
        command = ['ffmpeg', '-y', '-i', '-', '-f', 'wav', '-']
        process = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
        wav_file, error_data = process.communicate(file)
        return wav_file, error_data

    @staticmethod
    def prepare_audio(audio: FileStorage):
        audio, audio_sample_rate = librosa.load(audio)
        audio_features = librosa.feature.mfcc(y=audio, sr=audio_sample_rate, n_mfcc=13)
        audio_scaled_features = np.mean(audio_features.T, axis=0)
        reshaped_audio_scaled_features = audio_scaled_features.reshape(1, -1)
        return reshaped_audio_scaled_features

    @staticmethod
    def prepare_text(text: str):
        tokenizer = Tokenizer()
        sequences = tokenizer.texts_to_sequences(text)
        padded_sequences = pad_sequences(sequences, maxlen=60, padding='post')
        return padded_sequences

    @staticmethod
    def predict_audio(scaled_features):
        model = load_model(os.path.join(Sarcastically.model_folder_path, "audio_model.h5"))
        return model.predict(scaled_features)

    @staticmethod
    def predict_text(padded_sequences):
        model = load_model(os.path.join(Sarcastically.model_folder_path, "text_model.h5"))
        return model.predict(padded_sequences)

    @staticmethod
    def get_prediction_result(audio_prediction, text_prediction):
        text_model_weight = .195
        audio_model_weight = 1 - text_model_weight

        total_0 = (audio_prediction[0][0] * audio_model_weight + text_prediction[0][0] * text_model_weight)
        total_1 = (audio_prediction[0][1] * audio_model_weight + text_prediction[0][1] * text_model_weight)

        total = total_0 - total_1
        return 0 if total <= 0 else 1

    # Controllers
    def post(self):
        text_prediction = []
        audio_prediction = []
        predictions = {"audio": audio_prediction, "text": text_prediction}

        if "multipart/form-data" in request.content_type:
            audio_file: FileStorage = request.files['audio_file']
            audio_file_content_type = audio_file.content_type

            if "audio/" not in audio_file_content_type:
                return {"data": "Invalid File Type Provided"}, 400

            scaled_audio_features = self.prepare_audio(audio_file)
            audio_prediction = self.predict_audio(scaled_audio_features)

            text_utterance = request.form["text_utterance"]
            padded_text_sequences = self.prepare_text(text_utterance)
            text_prediction = self.predict_text(padded_text_sequences)

            if len(audio_prediction) == 0 and len(text_prediction) == 0:
                predictions["audio"] = 0
                predictions["text"] = 0
            elif len(audio_prediction) != 0 and len(text_prediction) == 0:
                predictions["audio"] = audio_prediction
                predictions["text"] = 0
            elif len(audio_prediction) == 0 and len(text_prediction) != 0:
                predictions["audio"] = 0
                predictions["text"] = text_prediction.tolist()
            else:
                predictions["audio"] = audio_prediction.tolist()
                predictions["text"] = text_prediction.tolist()

            prediction = self.get_prediction_result(predictions['audio'], predictions['text'])
            return {"result": prediction}, 200
        return 200

    def get(self):
        return {"data": "You have access to the API"}, 201
