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
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-100 via-white to-emerald-100">

            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute w-full h-full object-cover"
            >
                <source
                    src="login.mp4"
                    type="video/mp4"
                />
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
            <form
                onSubmit={handleLogin}
                className="relative z-10 w-full max-w-md p-10 rounded-3xl
                bg-white/10 backdrop-blur-xl
             
                shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
                space-y-6 text-white
                border-t-6 border-green-500"
            >
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold bg-linear-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
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
                    className="w-full py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 text-white font-semibold shadow-sm disabled:opacity-60"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

