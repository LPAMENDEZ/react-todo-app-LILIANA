import { useEffect, useState } from "react";
import axios from "axios";

export default function Todos() {
  const API = "https://jsonplaceholder.typicode.com/users";

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get(API).then((res) =>
      setUsers(res.data.map((u) => ({ ...u, completed: false })))
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) return;

    const res = await axios.post(API, { name, email });

    setUsers([
      ...users,
      { ...res.data, id: users.length + 1, completed: false },
    ]);

    setName("");
    setEmail("");
  };

  const toggleUser = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, completed: !u.completed } : u
      )
    );
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/${id}`);
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div>
      <h2>Usuarios</h2>

      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" />
        <button>Crear</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <span
              onClick={() => toggleUser(u.id)}
              style={{
                cursor: "pointer",
                textDecoration: u.completed ? "line-through" : "none",
              }}
            >
              {u.name} — {u.email}
            </span>

            <button onClick={() => deleteUser(u.id)} style={{ marginLeft: "10px" }}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}







