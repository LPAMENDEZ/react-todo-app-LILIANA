import { useEffect, useState } from "react";
import axios from "axios";

export default function Todos() {
  const API = "https://jsonplaceholder.typicode.com/users";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function cargarUsuarios() {
    try {
      const res = await axios.get(API);
      setUsers(res.data.map((u) => ({ ...u, completed: false })));
    } catch {
      setError("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }

  async function crearUsuario(e) {
    e.preventDefault();

    if (!name || !email) return alert("Completa los campos");

    const res = await axios.post(API, { name, email });

    setUsers([...users, { ...res.data, id: users.length + 1, completed: false }]);

    setName("");
    setEmail("");
  }

  function toggleUsuario(id) {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, completed: !u.completed } : u
      )
    );
  }

  async function eliminarUsuario(id) {
    await axios.delete(`${API}/${id}`);
    setUsers(users.filter((u) => u.id !== id));
  }

  if (loading) return <h2>Cargando…</h2>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Usuarios</h2>

      <form onSubmit={crearUsuario}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" />
        <button>Crear</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <span
              onClick={() => toggleUsuario(u.id)}
              style={{
                cursor: "pointer",
                textDecoration: u.completed ? "line-through" : "none",
              }}
            >
              {u.name} — {u.email}
            </span>

            <button onClick={() => eliminarUsuario(u.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}











