'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) router.push("/");
    else alert("Invalid credentials");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50 ">
      <form
        onSubmit={handleLogin}
        className="relative bg-white border-[3px] border-purple-300 rounded-2xl p-8 shadow-xl w-full max-w-md transform rotate-[-1.5deg] hover:rotate-0 transition-all duration-300"
      >
        {/* Decorative Badge */}
        <div className="absolute top-[-20px] left-[-20px] bg-pink-400 text-white text-sm px-4 py-1 rounded-full border-2 border-black shadow-md rotate-[-5deg]">
          Welcome Back!
        </div>

        <h2 className="text-4xl font-bold text-center text-purple-700 mb-8 underline decoration-wavy decoration-pink-400">
          Login to ReadRack
        </h2>

        <input
          type="email"
          placeholder="📧 Email"
          className="w-full p-3 mb-4 border-2 border-dashed border-purple-300 rounded-lg bg-yellow-100 placeholder:text-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="🔒 Password"
          className="w-full p-3 mb-6 border-2 border-dashed border-pink-300 rounded-lg bg-yellow-100 placeholder:text-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="w-full bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold py-2 px-4 rounded-xl shadow-md border-2 border-black transition-all duration-300"
        >
          🚀 Login
        </button>

        <p className="text-sm text-center mt-6 text-gray-700">
          No account?{" "}
          <a href="/auth/register" className="text-blue-600 font-semibold underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}
