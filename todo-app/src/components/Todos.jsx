import { useEffect, useState } from "react";
import axios from "axios";

export default function Todos() {
  const API = "https://jsonplaceholder.typicode.com/users";

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("todos");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API);
        setUsers(res.data);
      } catch (err) {
        setError("Error al obtener los usuarios");
      } finally {
        setLoading(false);
      }
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
    
      if (editId) {
        await axios.patch(`${API}/${editId}`, {
          name,
          email
        });

        setUsers(
          users.map((u) =>
            u.id === editId ? { ...u, name, email } : u
          )
        );

        setEditId(null);
        setName("");
        setEmail("");
        return;
      }

      const res = await axios.post(API, {
        name,
        email
      });

      setUsers([...users, { ...res.data, id: users.length + 1 }]);
      setName("");
      setEmail("");

    } catch (err) {
      alert("Error en la petición");
    }
  };

  // Eliminar
  const deleteUser = async (id) => {
    if (!confirm("¿Eliminar usuario?")) return;

    await axios.delete(`${API}/${id}`);
    setUsers(users.filter((u) => u.id !== id));
  };


  const startEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
  };


  const filteredUsers = users.filter((u) => {
    if (filter === "gmail") return u.email.endsWith("@gmail.com");
    if (filter === "biz") return u.email.endsWith(".biz");
    return true;
  });

  if (loading) return <h2>Cargando usuarios...</h2>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Usuarios</h2>

      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setFilter("todos")}>Todos</button>
        <button onClick={() => setFilter("gmail")}>Solo Gmail</button>
        <button onClick={() => setFilter("biz")}>Solo .biz</button>
      </div>

      <form onSubmit={handleSubmit}>
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

        <button>{editId ? "Actualizar" : "Crear"}</button>
      </form>

     
      <ul>
        {filteredUsers.map((u) => (
          <li key={u.id}>
            <div style={{ flex: 1 }}>
              <strong>{u.name}</strong> <br />
              <small>{u.email}</small>
            </div>

           
            <button
              style={{ background: "#ffa500", marginRight: "10px" }}
              onClick={() => startEdit(u)}
            >
              Editar
            </button>

          
            <button onClick={() => deleteUser(u.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}











