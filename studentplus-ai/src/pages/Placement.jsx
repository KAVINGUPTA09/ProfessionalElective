import React, { useEffect, useState } from "react";
import { placementService } from "../services/api";

const Placement = () => {
  const [form, setForm] = useState({
    skills: 7,
    projects: 4,
    aptitude: 70,
    communication: 65,
    cgpa: 8,
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadDashboard = async (payload = form) => {
    try {
      setLoading(true);
      setError("");

      const res = await placementService.getDashboard(payload);
      setData(res.data);
      localStorage.setItem("placementResult", JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.details ||
          err?.response?.data?.error ||
          "Placement dashboard failed"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard(form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = () => {
    loadDashboard(form);
  };

  const bars = data
    ? [
        {
          label: "Technical Skills",
          value: data.technical_skills,
          color: "from-cyan-400 to-blue-500",
        },
        {
          label: "Communication",
          value: data.communication,
          color: "from-emerald-400 to-cyan-400",
        },
        {
          label: "Projects & Portfolio",
          value: data.projects_portfolio,
          color: "from-sky-400 to-indigo-400",
        },
        {
          label: "Aptitude & Reasoning",
          value: data.aptitude_reasoning,
          color: "from-cyan-300 to-teal-400",
        },
        {
          label: "Coding Proficiency",
          value: data.coding_proficiency,
          color: "from-purple-400 to-indigo-500",
        },
      ]
    : [];

  return (
    <div className="text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 inline-block rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
              Placement Intelligence
            </p>
            <h1 className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-4xl font-extrabold text-transparent">
              Placement Readiness Dashboard
            </h1>
            <p className="mt-3 max-w-3xl text-slate-300">
              Generate a dynamic placement score using your skill depth, projects,
              aptitude, communication, and CGPA.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            Dynamic Score Engine
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <TopMiniCard
            title="Current Score"
            value={data?.placement_score ?? "--"}
            color="text-cyan-300"
          />
          <TopMiniCard
            title="Readiness"
            value={data?.readiness_level ?? "--"}
            color="text-emerald-300"
          />
          <TopMiniCard
            title="Eligible Companies"
            value={data?.companies_eligible ?? "--"}
            color="text-yellow-300"
          />
          <TopMiniCard
            title="Improvement"
            value={data?.improvement ? `+${data.improvement}` : "--"}
            color="text-purple-300"
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Placement Inputs
                </h2>
                <p className="mt-1 text-sm text-slate-300">
                  Fill your indicators to generate a personalized placement dashboard.
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                Personalized
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                label="Skills Count"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                min="0"
                max="10"
              />
              <InputField
                label="Projects Count"
                name="projects"
                value={form.projects}
                onChange={handleChange}
                min="0"
                max="10"
              />
              <InputField
                label="Aptitude Score"
                name="aptitude"
                value={form.aptitude}
                onChange={handleChange}
                min="0"
                max="100"
              />
              <InputField
                label="Communication Score"
                name="communication"
                value={form.communication}
                onChange={handleChange}
                min="0"
                max="100"
              />
              <div className="md:col-span-2">
                <InputField
                  label="CGPA"
                  name="cgpa"
                  value={form.cgpa}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  max="10"
                />
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-900/40 p-4 text-sm text-slate-300">
              <p className="font-semibold text-cyan-300">Tip</p>
              <p className="mt-2">
                Better communication, stronger projects, and higher aptitude
                can significantly improve your readiness score.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-200 hover:scale-[1.01] hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Generating..." : "Generate Placement Dashboard"}
            </button>

            {error && (
              <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {data ? (
              <>
                <div className="grid gap-4 md:grid-cols-3">
                  <StatCard
                    title="Placement Score"
                    value={`${data.placement_score}/100`}
                    sub="Overall readiness"
                    color="text-cyan-300"
                  />
                  <StatCard
                    title="Companies Eligible"
                    value={data.companies_eligible}
                    sub="Potential shortlist scope"
                    color="text-emerald-300"
                  />
                  <StatCard
                    title="Growth Window"
                    value={`+${data.improvement}`}
                    sub="Improvement room"
                    color="text-purple-300"
                  />
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Overall Readiness
                    </p>

                    <div className="mt-6 flex items-center gap-6">
                      <div className="relative h-28 w-28">
                        <svg className="h-28 w-28 -rotate-90">
                          <circle
                            cx="56"
                            cy="56"
                            r="44"
                            stroke="rgba(255,255,255,0.12)"
                            strokeWidth="10"
                            fill="none"
                          />
                          <circle
                            cx="56"
                            cy="56"
                            r="44"
                            stroke="url(#gradPlacementGauge)"
                            strokeWidth="10"
                            fill="none"
                            strokeDasharray={2 * Math.PI * 44}
                            strokeDashoffset={
                              2 * Math.PI * 44 * (1 - data.placement_score / 100)
                            }
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient
                              id="gradPlacementGauge"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#22d3ee" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                          </defs>
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-cyan-300">
                            {data.placement_score}
                          </span>
                          <span className="text-xs text-slate-400">/100</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-2xl font-bold text-white">
                          {data.readiness_level}
                        </p>
                        <p className="mt-1 text-sm text-slate-300">
                          Placement-fit assessment based on your current profile
                        </p>
                        <div className="mt-3 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
                          AI evaluated
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 space-y-4">
                      {bars.map((item) => (
                        <div key={item.label}>
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-slate-300">{item.label}</span>
                            <span className="text-slate-300">{item.value}%</span>
                          </div>
                          <div className="h-3 rounded-full bg-white/10">
                            <div
                              className={`h-3 rounded-full bg-gradient-to-r ${item.color}`}
                              style={{ width: `${item.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <InfoPanel
                      title="Placement Recommendation"
                      text={data.suggestion}
                    />
                    <InfoPanel
                      title="Quick Insight"
                      text="Strong project depth plus communication practice can improve interview conversion quickly."
                    />
                    <InfoPanel
                      title="Input Summary"
                      text={`Skills: ${data.input_used?.skills}, Projects: ${data.input_used?.projects}, Aptitude: ${data.input_used?.aptitude}, Communication: ${data.input_used?.communication}, CGPA: ${data.input_used?.cgpa}`}
                    />
                  </div>
                </div>
              </>
            ) : (
              !loading && (
                <div className="rounded-3xl border border-dashed border-white/10 bg-white/10 p-8 text-center text-slate-400 shadow-2xl backdrop-blur-xl">
                  Fill the input panel and generate your placement dashboard.
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function InputField({ label, name, value, onChange, step, min, max }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </label>
      <input
        type="number"
        name={name}
        value={value}
        step={step || "1"}
        min={min}
        max={max}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
      />
    </div>
  );
}

function TopMiniCard({ title, value, color }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {title}
      </p>
      <p className={`mt-3 text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function StatCard({ title, value, sub, color }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {title}
      </p>
      <p className={`mt-3 text-4xl font-bold ${color}`}>{value}</p>
      <p className="mt-1 text-sm text-slate-300">{sub}</p>
    </div>
  );
}

function InfoPanel({ title, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <div className="mt-4 rounded-2xl bg-slate-900/40 p-4 text-sm text-slate-300">
        {text}
      </div>
    </div>
  );
}

export default Placement;