import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Todos from "./components/Todos";
import Registro from "./components/Registro";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const API = "https://jsonplaceholder.typicode.com/users";

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(API).then((res) => setUsers(res.data));
  }, []);

  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <Link to="/">Inicio</Link>
        <Link to="/todos">Usuarios</Link>
        <Link to="/registro">Registro</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        {/* 💥 Aquí pasamos users y setUsers */}
        <Route
          path="/todos"
          element={<Todos users={users} setUsers={setUsers} />}
        />

        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
