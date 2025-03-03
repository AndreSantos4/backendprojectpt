const express = require("express");
const pg = require("pg");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await db.query("SELECT * FROM users WHERE username = $1 AND password = $2", [username, password]);
  if (result.rows.length > 0) {
    res.json({ success: true, message: "Login bem-sucedido!" });
  } else {
    res.status(401).json({ success: false, message: "Credenciais inválidas" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
