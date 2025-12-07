import { useEffect, useState } from "react";
import axios from "axios";

export default function Todos() {
  const API = "https://jsonplaceholder.typicode.com/users";
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(API).then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>Usuarios</h2>
    </div>
  );
}


