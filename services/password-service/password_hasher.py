from flask import Flask, request, jsonify
from flask_cors import CORS
import hashlib

app = Flask(__name__)

# allows frontend interaction
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


# hashes password via sha256 encryption
def hash_password(password):
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    return hashed_password


# sets route for app to post to with password
@app.route("/hash", methods=["POST"])
def hash_endpoint():
    # gets the data from the request
    data = request.get_json()

    # returns an error if not a password
    if not data or "password" not in data:
        return jsonify({"error": "Password not sent"}), 400

    # hashes password
    password = data["password"]
    hashed = hash_password(password)

    # returns hash
    return jsonify({"hash": hashed})


def main():
    print("Password hashing Microservice is running.")
    # run locally
    app.run(host="localhost", port=7000)


if __name__ == "__main__":
    main()
