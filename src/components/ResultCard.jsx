import React from "react";

export default function ResultCard({ data }) {
    return (
        <div
            className="
        mt-10
        relative
        rounded-3xl
        border border-green-300
        bg-white/85 backdrop-blur-md
        shadow-2xl
        p-6 sm:p-8
        animate-fade-in-up
      "
        >
            {/* HEADER */}
            <div className="mb-6 text-center">
                <h2
                    className="
            text-2xl sm:text-3xl font-extrabold
            bg-gradient-to-r from-green-500 via-emerald-400 to-green-600
            bg-clip-text text-transparent
          "
                >
                    Your Travel Recommendation
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    {data.travelMoodMatch}
                </p>
            </div>

            {/* MAIN DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Info icon="📍" label="Destination" value={data.place} />
                <Info icon="🍽" label="Must-Try Food" value={data.food} />
                <Info
                    icon="🎯"
                    label="Activities"
                    value={data.activities}
                    full
                />
            </div>

            {/* WHY */}
            <Section title="🤖 Why this suits you">
                <p className="text-gray-800 leading-relaxed">{data.reason}</p>
            </Section>

            {/* EXTRA AI CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

                {/* HIGHLIGHTS */}
                <Section title="✨ Trip Highlights">
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {data.highlights?.map((point, i) => (   
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </Section>

                {/* LOCAL TIPS */}
                <Section title="🗺 Local Travel Tips">
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {data.localTips?.map((tip, i) => (
                            <li key={i}>{tip}</li>
                        ))}
                    </ul>
                </Section>
            </div>

            {/* FOOTER INFO */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center text-sm">
                <Badge text={`🕒 Best time: ${data.bestTimeToVisit}`} />
                <Badge text={`🧑‍🤝‍🧑 Travel Mood: ${data.travelMoodMatch}`}  />
               
            </div>
        </div>
    );
}

/* --------- SMALL HELPERS --------- */

function Info({ icon, label, value, full }) {
    return (
        <div className={`flex gap-3 ${full ? "sm:col-span-2" : ""}`}>
            <span className="text-xl">{icon}</span>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-semibold text-gray-800">{value}</p>
            </div>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div className="p-4 rounded-xl bg-gray-50 border">
            <p className="font-semibold text-gray-800 mb-2">{title}</p>
            {children}
        </div>
    );
}

function Badge({ text }) {
    return (
        <span className="px-4 py-2 rounded-full bg-green-600/90 text-white shadow text-xs font-semibold">
            {text}
        </span>
    );
}
