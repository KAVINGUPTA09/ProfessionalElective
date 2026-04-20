import React, { useState } from "react";
import axios from "axios";

const Internship = () => {
  const [form, setForm] = useState({
    domain: "Web Development",
    experience: "Beginner",
    skills: "html, css, javascript, react",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.post("http://localhost:5000/api/internships", {
        domain: form.domain,
        experience: form.experience,
        skills: form.skills.split(",").map((s) => s.trim()),
      });

      setResult(res.data);
      localStorage.setItem("internshipResult", JSON.stringify(res.data));
    } catch (err) {
      console.log(err);
      setError(
        err?.response?.data?.details ||
          err?.response?.data?.error ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role) => {
    if (!role) return "text-green-400";
    if (role.includes("AI")) return "text-purple-400";
    if (role.includes("Web")) return "text-cyan-400";
    if (role.includes("Data")) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="mb-2 inline-block rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
            AI Internship Recommender
          </p>
          <h1 className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-4xl font-extrabold text-transparent">
            Internship Recommendation AI
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Get personalized internship recommendations based on your profile.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/60 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Candidate Profile</h2>

            <div className="mb-4">
              <label className="block mb-1 text-sm">Domain</label>
              <select
                name="domain"
                value={form.domain}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/10"
              >
                <option>Web Development</option>
                <option>Data Science</option>
                <option>AI</option>
                <option>Machine Learning</option>
                <option>Data Analysis</option>
                <option>Software Development</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm">Experience</label>
              <select
                name="experience"
                value={form.experience}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/10"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block mb-1 text-sm">Skills</label>
              <input
                type="text"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="html, css, javascript"
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/10"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 transition transform hover:scale-105 p-3 rounded-xl font-semibold"
            >
              {loading ? "Predicting..." : "Get Internship Recommendation"}
            </button>

            {error && <p className="text-red-400 mt-4">{error}</p>}
          </div>

          <div className="bg-slate-800/60 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Prediction Result</h2>

            {!result && (
              <p className="text-slate-400">
                No prediction yet. Fill form and click button.
              </p>
            )}

            {result && (
              <div>
                <p className="text-lg">Recommended Role:</p>

                <p
                  className={`text-2xl font-bold mt-2 ${getRoleColor(
                    result.recommended_role
                  )}`}
                >
                  {result.recommended_role}
                </p>

                {result.confidence && (
                  <p className="text-sm text-yellow-400 mt-2">
                    Confidence: {Math.round(result.confidence * 100)}%
                  </p>
                )}

                {result.suggestion && (
                  <p className="mt-3 text-sm text-slate-400">
                    Based on your profile, improve:
                    <span className="text-cyan-400"> {result.suggestion}</span>
                  </p>
                )}

                <p className="mt-3 text-sm text-slate-400">
                  Closely related tracks may also include Data Science Intern,
                  ML Intern, or Data Analyst Intern.
                </p>

                <div className="mt-6 text-sm text-slate-400">
                  <p>Domain: {result.input_used.domain}</p>
                  <p>Experience: {result.input_used.experience}</p>
                  <p>Skills: {result.input_used.skills.join(", ")}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Internship;