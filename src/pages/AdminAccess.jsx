// src/pages/AdminAccess.jsx
import { useState } from "react";
import AdminPage from "./AdminPage"; // import from components

export default function AdminAccess() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  const ADMIN_PASSWORD = "Admin123"; // Change this

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) setAuthorized(true);
    else alert("Incorrect password!");
  };

  if (!authorized)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-10">
        <h1 className="text-2xl mb-4">Admin Login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 rounded text-black"
          placeholder="Enter password"
        />
        <button onClick={handleLogin} className="bg-blue-600 px-4 py-2 rounded">
          Login
        </button>
      </div>
    );

  return <AdminPage />;
}