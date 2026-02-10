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
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed");
                return;
            }

            // ✅ Save logged-in user
            localStorage.setItem("user", JSON.stringify(data.user));

            // ✅ Redirect to home
            navigate("/home");
        } catch (err) {
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
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-xl"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-xl"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-xl"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
