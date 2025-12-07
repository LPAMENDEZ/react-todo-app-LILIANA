import { useEffect, useState } from "react";
import axios from "axios";

export default function Todos() {
  const API = "https://jsonplaceholder.typicode.com/users";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(API);
        setUsers(res.data);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <h2>Cargando...</h2>;

  return (
    <div>
      <h2>Usuarios</h2>

      <form>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" />
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </div>
  );
}








