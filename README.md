# Sarcastically
___

## What is it ?
Sarcastically is machine learning algorithm based on a text and audio multi-model approach developed using Tensorflow and Keras on top of the MUStARD dataset. Built for the purpose of the Bachelors of Computer Science at the University of Westminster.

## Technology Used
The technology for the project is defined in the environment.yml file listed in the root of the project.

## Purpose of the application
Sarcastically was built in order to improve sarcasm detection by utilizing better audio models focused on natural human voice which is able to provide better features which can be used to improve the accuracy of the sarcasm detection. This accompanied by the text model helps in improving the goal of this project as a whole.

## Before you use the model
You will need to download the following files:
1. [The WikiWord Vectors Dataset from FastText](https://dl.fbaipublicfiles.com/fasttext/vectors-english/wiki-news-300d-1M.vec.zip)
2. The MUStARD Dataset Files
   1. [The video files](https://drive.google.com/file/d/1i9ixalVcXskA5_BkNnbR60sqJqvGyi6E/view?usp=sharing)
   2. [The JSON file containing the labelled data for the dataset](https://github.com/soujanyaporia/MUStARD/blob/master/data/sarcasm_data.json)

After you download the above, do the following:
1. Make sure that the audio files are stored in a folder named `mmsd_raw_data` in the root of the project.
2. Run the cells in the `audio-model-preprocessing.ipynb` file in order to convert the `mp4` videos into `.wav` files.
3. Run the cells in `mustard_normalizer.ipynb` to normalize the data into a CSV file named `normalized_mustard_dataset.csv`

Finally,
1. Create a conda environment based on the environment.yml file as below
```shell
conda create -n <your_env_name> -f environment.yml
```
2. Activate the conda environment
```shell
source activate <your_env_name>
```

## To train the model
Open the sarcastically.ipynb file and run all the cells. (make sure you've downloaded the files in the previous step)

## If you run into any issues
Contact me at ryanjk.kuruppu@gmail.com

## If you want access to my research paper
Checkout my final report at [`docs/sarcastically.pdf`](docs/final_report_2022.pdf)