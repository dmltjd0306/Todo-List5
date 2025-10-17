import React, { useState, useEffect } from "react";

export default function TodoList({ user, onLogout }) {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Load saved todos for this user
  useEffect(() => {
    const saved = localStorage.getItem(`todos_${user}`);
    if (saved) setTodos(JSON.parse(saved));
  }, [user]);

  // Save todos when they change
  useEffect(() => {
    localStorage.setItem(`todos_${user}`, JSON.stringify(todos));
  }, [todos, user]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTodos([...todos, { text: task, done: false }]);
    setTask("");
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div>
      <h2>✅ {user}'s Todo List</h2>
      <form onSubmit={addTodo}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New task..."
          style={styles.input}
        />
        <button style={styles.button}>Add</button>
      </form>

      <ul style={styles.list}>
        {todos.map((t, i) => (
          <li key={i} style={styles.item}>
            <span
              onClick={() => toggleTodo(i)}
              style={{
                textDecoration: t.done ? "line-through" : "none",
                cursor: "pointer",
                flexGrow: 1,
              }}
            >
              {t.text}
            </span>
            <button
              onClick={() => deleteTodo(i)}
              style={styles.deleteButton}
              title="Delete"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <button onClick={onLogout} style={styles.logout}>
        🚪 Logout
      </button>
    </div>
  );
}

const styles = {
  input: {
    padding: "0.6rem",
    marginRight: "0.5rem",
    borderRadius: "0.4rem",
    border: "1px solid #ccc",
    width: "60%",
  },
  button: {
    padding: "0.6rem 1rem",
    borderRadius: "0.4rem",
    border: "none",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "1rem",
    textAlign: "left",
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.4rem 0.8rem",
    background: "#f8f9fa",
    borderRadius: "0.4rem",
    marginBottom: "0.5rem",
  },
  deleteButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  },
  logout: {
    marginTop: "1rem",
    padding: "0.6rem 1rem",
    border: "none",
    borderRadius: "0.4rem",
    background: "#dc3545",
    color: "white",
    cursor: "pointer",
  },
};
