import React, { useState } from "react";
import ResultCard from "./ResultCard";

export default function TravelForm() {
    const [form, setForm] = useState({
        name: "",
        ageGroup: "",
        currentLocation: "",
        preferredDestination: "",
        travelExperience: "",
        personality: [],
        socialPreference: "",
        destinationTypes: [],
        travelPace: "",
        foodPreferences: [],
        foodAdventureLevel: "",
        interests: [],
        tripDuration: "",
        dailyTravelTime: "",
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    /* ---------- HANDLERS (UNCHANGED) ---------- */
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleMultiSelect = (name, value) => {
        setForm((prev) => ({
            ...prev,
            [name]: prev[name].includes(value)
                ? prev[name].filter((v) => v !== value)
                : [...prev[name], value],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch("https://travel-backend-plan.onrender.com/api/travel/recommend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            setResult({
                place: data.destination,
                food: data.food,
                activities: data.activities || form.interests.join(", "),
                reason: data.reason,
                highlights: data.highlights,
                localTips: data.localTips,
                bestTimeToVisit: data.bestTimeToVisit,
                travelMoodMatch: data.travelMoodMatch,
            });
        } catch {
            alert("AI service failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="travel-form" className="min-h-screen w-full bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-10">

            {/* ================= RESULT ================= */}
            {result && (
                <div className="max-w-6xl mx-auto mb-10 relative">
                    <button
                        onClick={() => setResult(null)}
                        className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white shadow-lg text-gray-600 hover:text-red-600 flex items-center justify-center text-xl"
                    >
                        ✕
                    </button>

                    <ResultCard data={result} />
                </div>
            )}

            {/* ================= FORM ================= */}
            {!result && (
                <form
                    onSubmit={handleSubmit}
                    className="
                        

                        // max-w-6xl mx-auto
                        // bg-white
                        // rounded-2xl
                        // shadow-xl
                        
                        // space-y-12
                        // w-full
                        bg-cover bg-center p-6 

                    "
                    // className="bg-cover bg-center p-6 relative"
                    style={{
                        backgroundImage: `
      linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
      url('/img4.jpg')
    `,
                        backgroundSize: "cover",
                        backgroundPosition: "czenter",
                    }}
                >
                    <div className=" p-4 rounded-lg">
                        <h1 className="text-3xl font-bold text-white mb-2">Basic Profile</h1>
                        <Grid>
                            <Input label="Name / Nickname" name="name" placeholder="Your name" onChange={handleChange} required={true} />
                            <Select label="Age Group" name="ageGroup" options={["18–25", "26–35", "36–50", "50+"]} onChange={handleChange} />
                            <Input label="Current Location" name="currentLocation" placeholder="Jaipur, Delhi" onChange={handleChange}  required={true} />
                            <Input label="Preferred Destination" name="preferredDestination" placeholder="Goa, Manali" onChange={handleChange} />
                            <Select label="Travel Experience" name="travelExperience" options={["First-time", "Occasional", "Frequent", "Digital Nomad"]} onChange={handleChange}  required={true} />
                        </Grid>
                    </div>

                    <div className=" p-4 rounded-lg">
                        <h1 className="text-3xl font-bold text-white mb-2"> Personality & Style</h1>
                        <CheckboxGroup className="cursor-pointer"
                            
                            options={[
                                "Introvert",
                                "Extrovert",
                                "Balanced",
                                "Explorer",
                                "Relaxer",
                                "Cultural Enthusiast",
                                "Adventure Seeker",
                            ]}
                            name="personality"
                            selectedValues={form.personality}
                            onToggle={handleMultiSelect}
                            required={true}
                        />
                    </div>

                    <div className=" p-4 rounded-lg">
                        <h1 className="text-3xl font-bold text-white mb-2">Destination & Travel Style</h1>
                        <CheckboxGroup
                            // title="Destination Type"
                            className="cursor-pointer"
                            options={[
                                "Mountains",
                                "Beach",
                                "City",
                                "Nature",
                                "Desert",
                                "Snow",
                                "Spiritual",
                                "Cultural",
                                "Adventure",
                                "Historical",
                                "Relaxation",
                                "Wildlife",
                                "Offbeat",
                            ]}
                            name="destinationTypes"
                            selectedValues={form.destinationTypes}
                            onToggle={handleMultiSelect}
                            required={true}
                        />

                        <Grid>
                            <Select
                                className="cursor-pointer"
                                label="Travel Pace"
                                name="travelPace"
                                options={["Slow & relaxed", "Balanced", "Fast & packed"]}
                                onChange={handleChange}
                                required={true}
                            />
                        </Grid>
                    </div>

                    <div className=" p-4 rounded-lg">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Food & Culture
                        </h1>
                        <CheckboxGroup
                            className="cursor-pointer"
                            // title="Food Preference"
                            options={[
                                "Vegetarian",
                                "Vegan",
                                "Non-Veg",
                                "Street Food",
                                "Fine Dining",
                                "Local Cuisine",
                                "Exotic Foods",
                                "Seafood",
                                "Spicy Foods",
                            ]}
                            name="foodPreferences"
                            selectedValues={form.foodPreferences}
                            onToggle={handleMultiSelect}
                            required={true}
                        />
                    </div>

                    <div className=" p-4 rounded-lg">
                        <h1 className="text-3xl font-bold text-white mb-2">Interests & Activities</h1>
                        <CheckboxGroup
                            className="cursor-pointer"
                            options={[
                                "Sightseeing",
                                "Adventure",
                                "Photography",
                                "Yoga",
                                "Museums",
                                "Festivals",
                                "Relaxation",
                                "Hiking",
                                "Shopping",
                                "Nightlife",
                                "Wildlife",
                                "Food Tours",
                                "Historical Sites",
                                "Water Sports",
                            ]}
                            name="interests"
                            selectedValues={form.interests}
                            onToggle={handleMultiSelect}
                            required={true}
                        />
                    </div>

                    <div className=" p-4 rounded-lg">
                        <h1 className="text-3xl font-bold text-white mb-2">Time & Planning</h1>
                        <Grid>
                            <Select
                                className="cursor-pointer"
                                label="Trip Duration"
                                name="tripDuration"
                                options={["1–2 Days", "3–5 Days", "6–10 Days", "More than 10 Days"]}
                                onChange={handleChange}
                                required={true}
                            />
                            <Select
                                className="cursor-pointer"
                                label="Daily Travel Time"
                                name="dailyTravelTime"
                                options={["4–6 hours", "6–8 hours", "Flexible"]}
                                onChange={handleChange}
                                required={true}
                            />
                        </Grid>
                    </div>
                    
                    <button
                        disabled={loading}
                        className="
                            w-full
                            py-4
                            rounded-xl
                            text-lg
                            font-semibold
                            text-white
                            bg-linear-to-r from-blue-600 to-indigo-600
                            hover:from-blue-700 hover:to-indigo-700
                            transition
                            disabled:opacity-60
                            cursor-pointer
                        "
                    >
                        {loading ? "Generating your travel plan..." : " Generate My Travel Plan"}
                    </button>
                </form>
            )}
        </div>
    );
}

/* ---------- UI HELPERS ---------- */

function FormSection({ title, desc, children }) {
    return (
        <section className="space-y-5">
            <div>
                <h2 className="text-xl font-semibold text-white">{title}</h2>
                {desc && <p className="text-sm text-slate-500 mt-1">{desc}</p>}
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                {children}
            </div>
        </section>
    );
}

function Grid({ children }) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">{children}</div>;
}

function Input({ label, name, placeholder, onChange }) {
    return (
        <div>
            <label className="text-sm font-medium text-white">{label}</label>
            <input
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                className="
                    mt-1
                    w-full
                    px-4 py-3
                    rounded-lg
                    border border-slate-300
                    focus:ring-2 focus:ring-blue-500
                    focus:outline-none
                    text-white
                "
            />
        </div>
    );
}

function Select({ label, name, options, onChange }) {
    return (
        <div>
            <label className="text-sm font-medium text-white">{label}</label>
            <select
                name={name}
                onChange={onChange}
                className="
                    mt-1
                    w-full
                    px-4 py-3
                    rounded-lg
                    border border-slate-300
                    bg-white
                    focus:ring-2 focus:ring-blue-500
                "
            >
                <option value="">Select</option>
                {options.map((opt) => (
                    <option key={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );
}

function CheckboxGroup({ title, options, name, onToggle, selectedValues }) {
    return (
        <div>
            {title && <p className="text-sm font-medium text-slate-600 mb-3">{title}</p>}
            <div className="flex flex-wrap gap-2">
                {options.map((opt) => {
                    const active = selectedValues.includes(opt);
                    return (
                        <button
                            type="button"
                            key={opt}
                            onClick={() => onToggle(name, opt)}
                            className={`
                                px-4 py-2
                                rounded-full
                                text-sm
                                border
                                transition
                                ${active
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"}
                            `}
                        >
                            {opt}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
