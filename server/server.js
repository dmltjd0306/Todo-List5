import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory "database"
const users = {}; // { username: [todos] }

app.post("/login", (req, res) => {
  const { username } = req.body;
  if (!users[username]) users[username] = [];
  res.json({ success: true, todos: users[username] });
});

app.post("/todos", (req, res) => {
  const { username, todos } = req.body;
  users[username] = todos;
  res.json({ success: true });
});

app.listen(port, () =>
  console.log(`✅ Server running on http://localhost:${port}`)
);
