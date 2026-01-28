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
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed");
                setLoading(false);
                return;
            }

            // ✅ Save real backend user
            localStorage.setItem("user", JSON.stringify(data.user));

            // ✅ Go to Travel Form
            navigate("/home");
        } catch (err) {
            setError("Server not responding. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-100 via-white to-emerald-100">

            {/* Background blobs */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-200/40 rounded-full blur-3xl"></div>

            {/* Login Card */}
            <form
                onSubmit={handleLogin}
                className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-100 p-8 sm:p-10 space-y-6"
            >
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                        🌍 Travel Planner Login
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Start your personalized travel journey
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-lg">
                        {error}
                    </p>
                )}

                {/* Username */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        name="username"
                        placeholder="Enter your username"
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none transition"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none transition"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none transition"
                    />
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-emerald-500 shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all disabled:opacity-60"
                >
                    {loading ? "Logging in..." : "Login & Plan My Trip"}
                </button>

                <p className="text-center text-xs text-gray-400">
                    ✨ Discover destinations made just for you
                </p>
            </form>
        </div>
    );
}
