import React from "react";
import TravelForm from "../components/TravelForm";

export default function Home() {
    return (
        <>
            {/* ================= HERO WITH VIDEO BACKGROUND ================= */}
            <div className="relative w-full h-screen overflow-hidden">

                {/* 🎥 BACKGROUND VIDEO */}
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="/travel.mp4" type="video/mp4" />
                </video>

                {/* 🌫 OVERLAY */}
                <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

                {/* 📝 HERO CONTENT */}
                <div className="relative z-10 flex items-center justify-center h-full px-6">
                    <div className="text-center max-w-3xl animate-fade-in-up">

                        <h1
                            className="
                text-4xl md:text-5xl font-extrabold mb-6
                bg-gradient-to-r from-green-400 via-emerald-300 to-green-500
                bg-clip-text text-transparent
              "
                        >
                            Travel Recommendation App
                        </h1>

                        <p
                            className="
                text-lg md:text-xl text-gray-100 leading-relaxed
                animate-fade-in delay-200
              "
                        >
                            Tell us about your personality, interests & travel style.
                            <br className="hidden sm:block" />
                            Our App will craft a{" "}
                            <span className="text-green-300 font-semibold">
                                personalized travel plan
                            </span>{" "}
                            just for you.
                        </p>

                        {/* CTA */}
                        <div className="mt-8 animate-fade-in delay-300">
                            <a href="#travel-form"
                                className="
                  inline-block px-6 py-3 rounded-full
                  bg-green-600/90 text-white font-semibold
                  shadow-lg backdrop-blur-md
                "
                            >
                                Start Planning Your Journey 🚀
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            {/* ================= FORM SECTION ================= */}
            <div className="w-full px-2 py-5 ">
                <div className="w-full   animate-fade-in-up">
                    <TravelForm />
                </div>
            </div>
        </>
    );
}
