import { useState } from "react";

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
  });

  const [mensaje, setMensaje] = useState("");

  
  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  
  function handleSubmit(e) {
    e.preventDefault();

    if (!form.nombre.trim() || !form.correo.trim()) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    console.log("Datos enviados:", form);

    setMensaje("Registrado correctamente ");

 
    setForm({
      nombre: "",
      correo: "",
    });
  }

  return (
    <div className="page">
      <h1>Página de Registro</h1>

      
      {mensaje && <p style={{ color: "green", fontWeight: "bold" }}>{mensaje}</p>}

      <form onSubmit={handleSubmit}>
        
        <div>
          <label htmlFor="nombre">Nombre:</label><br />
          <input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label htmlFor="correo">Correo:</label><br />
          <input
            id="correo"
            name="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            placeholder="tu correo"
          />
        </div>

        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
}



