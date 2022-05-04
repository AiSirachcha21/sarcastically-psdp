from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from backend.src.api.Sarcastically import Sarcastically

app = Flask(__name__)
api = Api(app)

# Config
app.config["DEBUG"] = True

# Register Routes
api.add_resource(Sarcastically, "/sarcastically")

CORS(app)

if __name__ == "__main__":
    app.run(debug=True)
