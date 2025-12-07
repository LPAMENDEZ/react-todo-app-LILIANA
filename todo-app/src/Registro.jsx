import { useState } from "react";

export default function Registro() {
  const [form, setForm] = useState({ nombre: "", correo: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.nombre || !form.correo) return alert("Todos los campos son obligatorios");

    console.log("Datos:", form);
  }

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
        <input name="correo" value={form.correo} onChange={handleChange} placeholder="Correo" />
        <button>Enviar</button>
      </form>
    </div>
  );
}


