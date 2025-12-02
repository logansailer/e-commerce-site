from flask import Flask, request, jsonify
from flask_cors import CORS
import json, os

app = Flask(__name__)

# allows frontend interaction
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(BASE_DIR, "database", "carts.json")


# opens and gets data from database
def load_db():
    # initializes db if it doesnt exist
    if not os.path.exists(DB_FILE):
        return {"carts": {}}
    # opens db if it does exist
    with open(DB_FILE, "r") as f:
        content = f.read().strip()
        # returns proper format if DB is empty
        if not content:
            return {"carts": {}}
        return json.loads(content)


# saves data into databaase
def save_db(db):
    # get the directory of the db file
    db_dir = os.path.dirname(DB_FILE)
    # create the directory if it doesn't exist
    os.makedirs(db_dir, exist_ok=True)
    with open(DB_FILE, "w") as f:
        json.dump(db, f, indent=4)


@app.route("/cart/<username>", methods=["GET"])
def get_cart(username):
    db = load_db()
    cart = db["carts"].get(username, [])
    return jsonify({"cart": cart})


@app.route("/cart/<username>/add", methods=["POST"])
def add_to_cart(username):
    db = load_db()
    payload = request.get_json()
    item = payload.get("item")

    if item is None:
        return jsonify({"error": "Missing item"}), 400

    if username not in db["carts"]:
        db["carts"][username] = []

    # Convert item ID to string
    item_id = str(item.get("id"))
    quantity_to_add = int(item.get("quantity", 1))

    # Check if item already exists in cart
    existing_item = next(
        (i for i in db["carts"][username] if str(i.get("id")) == item_id), None
    )

    if existing_item:
        # Item exists, increment quantity
        existing_item["quantity"] += quantity_to_add
    else:
        # Item does not exist, add new
        item["quantity"] = quantity_to_add
        db["carts"][username].append(item)

    save_db(db)

    return jsonify({"message": "Item added", "cart": db["carts"][username]})


@app.route("/cart/<username>/remove", methods=["POST"])
def remove_from_cart(username):
    db = load_db()
    item_id = request.get_json().get("itemId")

    if item_id is None:
        return jsonify({"error": "Missing itemId"}), 400

    cart = db["carts"].get(username, [])

    # Remove first matching item with same id
    db["carts"][username] = [item for item in cart if item.get("id") != item_id]
    save_db(db)

    return jsonify({"message": "Item removed", "cart": db["carts"][username]})


@app.route("/cart/<username>/set", methods=["POST"])
def set_cart(username):
    db = load_db()
    cart = request.get_json().get("cart", [])

    db["carts"][username] = cart
    save_db(db)

    return jsonify({"message": "Cart replaced", "cart": cart})


@app.route("/cart/<username>/clear", methods=["POST"])
def clear_cart(username):
    db = load_db()
    db["carts"][username] = []
    save_db(db)

    return jsonify({"message": "Cart cleared"})


def main():
    print("Cart Microservice running on port 9100")
    app.run(host="localhost", port=5000)


if __name__ == "__main__":
    main()
