from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from backend.src.Sarcastically import Sarcastically

app = Flask(__name__)
app.config["DEBUG"] = True

# Middleware
api = Api(app)
CORS(app)

# Register Routes
api.add_resource(Sarcastically, "/sarcastically")

if __name__ == "__main__":
    app.run(debug=True)
