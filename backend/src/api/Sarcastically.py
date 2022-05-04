from flask_restful import Resource
from flask import request, jsonify


class Sarcastically(Resource):
    def post(self):
        body = request.json
        return {"data": body['data']}, 201

    def get(self):
        return {"data": "You have access to the API"}, 201
