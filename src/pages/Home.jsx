import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TravelForm from "../components/TravelForm";

export default function Home() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [showAvatar, setShowAvatar] = useState(true);

    /* ================= AUTH CHECK ================= */
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/");
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    /* ================= SCROLL LOGIC ================= */
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowAvatar(false);
                setOpen(false); // scroll pe dropdown band
            } else {
                setShowAvatar(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* ================= LOGOUT ================= */
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const firstLetter =
        user?.username?.charAt(0)?.toUpperCase() ||
        user?.email?.charAt(0)?.toUpperCase();

    return (
        <>
            {/* ================= AVATAR (ONLY HOME TOP) ================= */}
            {showAvatar && (
                <div className="fixed top-4 right-6 z-50">
                    <div className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className="
                                w-12 h-12 rounded-full
                                bg-green-600 text-white
                                flex items-center justify-center
                                font-bold text-lg shadow-lg
                                transition-all
                            "
                        >
                            {firstLetter}
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg border overflow-hidden">
                                <button
                                    onClick={handleLogout}
                                    className="
                                        w-full px-4 py-3 text-left text-sm
                                        hover:bg-red-50 text-red-600
                                        font-semibold
                                    "
                                >
                                    🚪 Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ================= HERO SECTION ================= */}
            <div className="relative w-full h-screen overflow-hidden">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="/travel.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 flex items-center justify-center h-full px-6">
                    <div className="text-center max-w-3xl animate-fade-in-up">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-green-300 mb-6">
                            Travel Recommendation App
                        </h1>

                        <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
                            Tell us about your personality & interests. <br />
                            Get a{" "}
                            <span className="text-green-300 font-semibold">
                                personalized travel plan
                            </span>{" "}
                            just for you ✨
                        </p>

                        <a
                            href="#travel-form"
                            className="
                                inline-block mt-8 px-6 py-3
                                rounded-full bg-green-600/90
                                text-white font-semibold
                                shadow-lg
                            "
                        >
                            Start Planning 🚀
                        </a>
                    </div>
                </div>
            </div>

            {/* ================= FORM SECTION ================= */}
            <div id="travel-form" className="w-full px-2 py-5">
                <TravelForm />
            </div>
        </>
    );
}
