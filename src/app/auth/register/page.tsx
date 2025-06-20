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
      alert("🎉 Registered successfully!");
      router.push("/auth/login");
    } else {
      const data = await res.json();
      alert(data.message || "Failed to register.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50 ">
      <form
        onSubmit={handleRegister}
        className="relative bg-white border-[3px] border-green-400 rounded-2xl p-8 shadow-xl w-full max-w-md transform rotate-[1.5deg] hover:rotate-0 transition-all duration-300"
      >
        {/* Decorative Badge */}
        <div className="absolute top-[-20px] right-[-20px] bg-green-400 text-white text-sm px-4 py-1 rounded-full border-2 border-black shadow-md rotate-[6deg]">
          Let’s Go!
        </div>

        <h2 className="text-4xl font-bold text-center text-green-700 mb-8 underline decoration-wavy decoration-yellow-400">
          Join ReadRack ✍️
        </h2>

        <input
          type="text"
          placeholder="✏️ Username"
          className="w-full p-3 mb-4 border-2 border-dashed border-green-300 rounded-lg bg-yellow-100 placeholder:text-gray-600"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="📧 Email"
          className="w-full p-3 mb-4 border-2 border-dashed border-green-300 rounded-lg bg-yellow-100 placeholder:text-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="🔒 Password"
          className="w-full p-3 mb-6 border-2 border-dashed border-green-300 rounded-lg bg-yellow-100 placeholder:text-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-2 px-4 rounded-xl shadow-md border-2 border-black transition-all duration-300">
          🎨 Register
        </button>

        <p className="text-sm text-center mt-6 text-gray-700">
          Already part of the doodle club?{" "}
          <a href="/auth/login" className="text-blue-600 font-semibold underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
