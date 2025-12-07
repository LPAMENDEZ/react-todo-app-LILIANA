import { useEffect, useState } from "react";
import axios from "axios";

export default function Todos() {
  const API = "https://jsonplaceholder.typicode.com/users";

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(API);
      setUsers(res.data);
    };
    fetchData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!name.trim() || !email.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await axios.post(API, {
        name,
        email
      });

    
      const newUser = {
        id: users.length + 1,
        name,
        email
      };

      setUsers([...users, newUser]);


      setName("");
      setEmail("");
    } catch (err) {
      alert("Error al crear usuario");
    }
  };

  return (
    <div>
      <h2>Usuarios</h2>


      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Crear</button>
      </form>

      {/* Listado */}
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <strong>{u.name}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}





