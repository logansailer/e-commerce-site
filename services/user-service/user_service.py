from flask import Flask, request, jsonify
from flask_cors import CORS
import json, os, http.client

app = Flask(__name__)

# allows frontend interaction
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(BASE_DIR, "database", "users.json")


# opens and gets data from database
def load_db():
    # initializes db if it doesnt exist
    if not os.path.exists(DB_FILE):
        return {"users": []}
    # opens db if it does exist
    with open(DB_FILE, "r") as f:
        # gets content of db
        content = f.read().strip()
        # returns proper format if DB is empty
        if not content:
            return {"users": []}
        # if not empty loads db
        db = json.loads(content)
        if "users" not in db:
            db["users"] = []
        return db


# saves data into databaase
def save_db(db):
    # get the directory of the db file
    db_dir = os.path.dirname(DB_FILE)
    # create the directory if it doesn't exist
    os.makedirs(db_dir, exist_ok=True)
    # write the db content to the file
    with open(DB_FILE, "w") as f:
        json.dump(db, f, indent=4)


def hash_password_with_service(password):
    conn = http.client.HTTPConnection("localhost", 7000)
    payload = json.dumps({"password": password})
    headers = {"Content-Type": "application/json"}

    conn.request("POST", "/hash", payload, headers)
    response = conn.getresponse()

    if response.status != 200:
        raise Exception("Hashing service error")

    body = response.read().decode()
    return json.loads(body)["hash"]


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"success": False, "error": "Missing username or password"}), 400

    db = load_db()

    # Check for duplicate usernames
    for user in db["users"]:
        if user["username"] == username:
            return jsonify({"success": False, "error": "Username already taken"}), 409

    # Hash password
    password_hash = hash_password_with_service(password)

    # Create new user (no cart)
    db["users"].append({"username": username, "password_hash": password_hash})
    save_db(db)

    return jsonify({"success": True, "username": username}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"success": False, "error": "Missing username or password"}), 400

    db = load_db()

    for user in db["users"]:
        if user["username"] == username:
            password_hash = hash_password_with_service(password)

            if password_hash == user["password_hash"]:
                return jsonify({"success": True, "username": username}), 200
            else:
                return jsonify({"success": False, "error": "Invalid password"}), 401

    return jsonify({"success": False, "error": "User not found"}), 404


def main():
    print("User Microservice running on port 9000")
    app.run(host="localhost", port=9000)


if __name__ == "__main__":
    main()
