import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "https://travel-backend-plan.onrender.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // remove if not using cookies
                    body: JSON.stringify(form),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed");
                setLoading(false);
                return;
            }

            // ✅ Save user
            localStorage.setItem("user", JSON.stringify(data.user));

            // ✅ Redirect
            navigate("/home");

        } catch (err) {
            console.error("Login Error:", err);
            setError("Server not responding. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-emerald-100">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 space-y-6"
            >
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold">
                        🌍 Travel Planner Login
                    </h2>
                </div>

                {error && (
                    <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                        {error}
                    </p>
                )}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 transition text-white font-semibold disabled:opacity-60"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
