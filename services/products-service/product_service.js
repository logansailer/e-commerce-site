const cors = require("cors");
const express = require("express");
const fs = require("fs");
const router = express.Router();
const PORT = 8000;

const app = express();
app.use("/api", router);
app.use(cors());

router.get("/", (req, res) => {
  res.send("Welcome to the server");
});

const db = JSON.parse(fs.readFileSync("db.json"));
app.get("/api/products", (req, res) => {
  res.json(db);
});

app.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});

module.exports = router;
