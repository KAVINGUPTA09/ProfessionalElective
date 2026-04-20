import React, { useMemo, useState } from "react";
import { skillService } from "../services/api";

const Skills = () => {
  const [skills, setSkills] = useState(
    "html, css, javascript, react, node.js"
  );
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async () => {
  try {
    setLoading(true);
    setError("");
    setResult(null);

    const res = await skillService.predictCareer({ skills });
    setResult(res.data);
    localStorage.setItem("careerResult", JSON.stringify(res.data));
  } catch (err) {
    console.error(err);
    setError(
      err?.response?.data?.details ||
        err?.response?.data?.error ||
        "Career prediction failed"
    );
  } finally {
    setLoading(false);
  }
};

  const skillList = useMemo(() => {
    return skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [skills]);

  const dashboardMetrics = useMemo(() => {
    const text = skills.toLowerCase();

    let technical = 55;
    let communication = 50;
    let projects = 52;
    let aptitude = 58;
    let domain = 54;
    let coding = 56;

    if (text.includes("html")) technical += 8;
    if (text.includes("css")) technical += 6;
    if (text.includes("javascript")) coding += 10;
    if (text.includes("react")) projects += 10;
    if (text.includes("node")) domain += 8;
    if (text.includes("python")) technical += 10;
    if (text.includes("machine learning")) domain += 12;
    if (text.includes("deep learning")) domain += 10;
    if (text.includes("sql")) aptitude += 8;
    if (text.includes("pandas")) technical += 6;
    if (text.includes("numpy")) technical += 6;
    if (text.includes("communication")) communication += 15;
    if (text.includes("api")) projects += 8;

    technical = Math.min(95, technical);
    communication = Math.min(95, communication);
    projects = Math.min(95, projects);
    aptitude = Math.min(95, aptitude);
    domain = Math.min(95, domain);
    coding = Math.min(95, coding);

    const overall = Math.round(
      (technical + communication + projects + aptitude + domain + coding) / 6
    );

    return {
      overall,
      technical,
      communication,
      projects,
      aptitude,
      domain,
      coding,
      companiesEligible: Math.max(8, Math.round(overall / 3)),
      improvement: Math.max(2, Math.round((overall - 60) / 2)),
      batchRank: Math.max(1, 100 - overall),
    };
  }, [skills]);

  const getRoleColor = (role) => {
    if (!role) return "text-cyan-300";
    const text = role.toLowerCase();

    if (text.includes("data")) return "text-yellow-300";
    if (text.includes("ai") || text.includes("ml")) return "text-purple-300";
    if (
      text.includes("front") ||
      text.includes("full stack") ||
      text.includes("web")
    )
      return "text-cyan-300";
    if (text.includes("software") || text.includes("engineer"))
      return "text-emerald-300";

    return "text-cyan-300";
  };

  const readinessLabel =
    dashboardMetrics.overall >= 80
      ? "Excellent Match"
      : dashboardMetrics.overall >= 70
      ? "Strong Match"
      : dashboardMetrics.overall >= 60
      ? "Good Standing"
      : "Needs Improvement";

  const progressItems = [
    {
      label: "Technical Skills",
      value: dashboardMetrics.technical,
      bar: "from-cyan-400 to-blue-500",
    },
    {
      label: "Communication",
      value: dashboardMetrics.communication,
      bar: "from-emerald-400 to-cyan-400",
    },
    {
      label: "Projects & Portfolio",
      value: dashboardMetrics.projects,
      bar: "from-sky-400 to-indigo-400",
    },
    {
      label: "Aptitude & Reasoning",
      value: dashboardMetrics.aptitude,
      bar: "from-cyan-300 to-teal-400",
    },
    {
      label: "Coding Proficiency",
      value: dashboardMetrics.coding,
      bar: "from-cyan-400 to-blue-400",
    },
  ];

  return (
    <div className="text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              Skill & Career Intelligence
            </h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              Analyze your skills, predict the best-fit career path, and explore
              a role-focused roadmap in a premium AI dashboard.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            Vectorizer Active
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Match Score
            </p>
            <p className="mt-3 text-4xl font-bold text-cyan-300">
              {dashboardMetrics.overall}
            </p>
            <p className="mt-1 text-sm text-slate-300">
              Top {dashboardMetrics.batchRank}% skill alignment
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Related Roles
            </p>
            <p className="mt-3 text-4xl font-bold text-emerald-300">
              {result?.related_roles?.length || 3}
            </p>
            <p className="mt-1 text-sm text-slate-300">
              Best-fit role suggestions
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Score Growth
            </p>
            <p className="mt-3 text-4xl font-bold text-cyan-300">
              +{dashboardMetrics.improvement}
            </p>
            <p className="mt-1 text-sm text-slate-300">
              Improvement potential
            </p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Skill Input
              </p>

              <div className="mt-5">
                <textarea
                  rows="8"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="html, css, javascript, react, node.js"
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              <div className="mt-4 rounded-2xl bg-slate-900/40 p-4 text-sm text-slate-300">
                <p className="font-semibold text-cyan-300">Examples</p>
                <p className="mt-2">
                  Data Science → python, pandas, numpy, sql, statistics
                </p>
                <p>
                  AI/ML → python, machine learning, deep learning, tensorflow
                </p>
                <p>
                  Web Development → html, css, javascript, react, node.js
                </p>
              </div>

              <button
                onClick={handlePredict}
                disabled={loading}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-200 hover:scale-[1.01] hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Predicting..." : "Predict Career Path"}
              </button>

              {error && <p className="mt-4 text-red-400">{error}</p>}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
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
                        stroke="url(#gradSkillGauge)"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={2 * Math.PI * 44}
                        strokeDashoffset={
                          2 * Math.PI * 44 * (1 - dashboardMetrics.overall / 100)
                        }
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="gradSkillGauge"
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
                        {dashboardMetrics.overall}
                      </span>
                      <span className="text-xs text-slate-400">/100</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-white">
                      {readinessLabel}
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      Confidence-driven skill assessment
                    </p>
                    <div className="mt-3 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
                      {result?.confidence
                        ? `${Math.round(result.confidence * 100)}% confidence`
                        : "Ready for prediction"}
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {progressItems.map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-300">{item.label}</span>
                        <span className="text-slate-300">{item.value}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-white/10">
                        <div
                          className={`h-3 rounded-full bg-gradient-to-r ${item.bar}`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Skill Radar
                </p>

                <div className="mt-6 flex items-center justify-center">
                  <div className="relative h-64 w-64">
                    <div className="absolute inset-0 rounded-full border border-cyan-400/10" />
                    <div className="absolute inset-6 rounded-full border border-cyan-400/10" />
                    <div className="absolute inset-12 rounded-full border border-cyan-400/10" />

                    <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full">
                      <polygon
                        points="150,35 235,90 220,200 150,245 75,205 65,95"
                        fill="rgba(34,211,238,0.12)"
                        stroke="rgba(59,130,246,0.8)"
                        strokeWidth="3"
                      />
                    </svg>

                    <span className="absolute left-1/2 top-2 -translate-x-1/2 text-xs text-slate-300">
                      Technical
                    </span>
                    <span className="absolute right-2 top-16 text-xs text-slate-300">
                      Communication
                    </span>
                    <span className="absolute bottom-16 right-4 text-xs text-slate-300">
                      Projects
                    </span>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-slate-300">
                      Aptitude
                    </span>
                    <span className="absolute bottom-16 left-4 text-xs text-slate-300">
                      Coding
                    </span>
                    <span className="absolute left-2 top-16 text-xs text-slate-300">
                      Domain
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                AI Career Summary
              </p>
              <div className="mt-4 rounded-2xl bg-slate-900/40 p-4 text-sm text-slate-300">
                {result?.ai_summary ||
                  "AI-generated summary will appear here after prediction."}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Prediction Result
              </p>

              {result ? (
                <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5">
                  <p className="text-sm uppercase tracking-widest text-cyan-300">
                    Recommended Career
                  </p>
                  <p className={`mt-2 text-4xl font-bold ${getRoleColor(result.recommended_role)}`}>
                    {result.recommended_role}
                  </p>
                  <p className="mt-3 text-sm text-yellow-300">
                    Confidence: {Math.round(result.confidence * 100)}%
                  </p>
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-slate-900/40 p-6 text-center text-slate-400">
                  No prediction yet.
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Related Roles
              </p>

              {result?.related_roles?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {result.related_roles.map((role, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-300"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl bg-slate-900/40 p-4 text-sm text-slate-300">
                  Related roles will appear here.
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Missing Skills
              </p>

              {result?.missing_skills?.length ? (
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  {result.missing_skills.map((item, index) => (
                    <li key={index} className="rounded-2xl bg-slate-900/40 p-4">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-4 rounded-2xl bg-slate-900/40 p-4 text-sm text-slate-300">
                  Missing skills will appear here.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Career Roadmap
          </p>

          {result?.roadmap?.length ? (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {result.roadmap.map((step, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-slate-900/40 p-4 text-sm text-slate-300"
                >
                  <span className="font-semibold text-cyan-300">
                    Step {index + 1}:
                  </span>{" "}
                  {step}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl bg-slate-900/40 p-4 text-sm text-slate-300">
              Career roadmap will appear here after prediction.
            </div>
          )}
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Input Summary
          </p>
          <div className="mt-4 rounded-2xl bg-slate-900/40 p-4 text-sm text-slate-300">
            {result?.input_used?.join
              ? result.input_used.join(", ")
              : result?.input_used || "Your entered skills will be shown here."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;