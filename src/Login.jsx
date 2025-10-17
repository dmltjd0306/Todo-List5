import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) onLogin(username.trim());
  };

  return (
    <div>
      <h2>🔐 Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button}>Login</button>
      </form>
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
};
