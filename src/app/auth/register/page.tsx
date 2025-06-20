'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) {
      alert("Registered successfully!");
      router.push("/auth/login");
    } else {
      const data = await res.json();
      alert(data.message || "Failed to register.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <input type="text" placeholder="Username" className="w-full p-2 border mb-4 rounded"
          value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" className="w-full p-2 border mb-4 rounded"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-2 border mb-6 rounded"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Register</button>
        <p className="text-sm mt-4 text-center">Have an account? <a href="/auth/login" className="text-blue-600">Login</a></p>
      </form>
    </div>
  );
}
