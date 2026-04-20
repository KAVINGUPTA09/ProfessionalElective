import React, { useState } from "react";
import { resumeService } from "../services/api";

const ResumeAnalyzer = () => {
  const [resumeText, setResumeText] = useState(
    "Python developer with machine learning projects, internship experience, GitHub portfolio, and strong skills in pandas, numpy, scikit-learn, and APIs."
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyzeText = async () => {
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const res = await resumeService.analyzeResume({
        resumeText,
      });

      setResult(res.data);
      localStorage.setItem("resumeResult", JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.details ||
          err?.response?.data?.error ||
          "Resume analysis failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPdf = async () => {
    if (!selectedFile) {
      setError("Please choose a PDF file first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const res = await resumeService.uploadResume(selectedFile);
      setResult(res.data);
      localStorage.setItem("resumeResult", JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.details ||
          err?.response?.data?.error ||
          "PDF resume analysis failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const gaugeColor = (score) => {
    if (score >= 85) return "text-emerald-400";
    if (score >= 70) return "text-cyan-400";
    if (score >= 55) return "text-yellow-400";
    return "text-red-400";
  };

  const highlightKeywords = (text, keywords) => {
    if (!text || !keywords?.length) return text;

    let highlighted = text;
    keywords.forEach((kw) => {
      const regex = new RegExp(`(${kw})`, "gi");
      highlighted = highlighted.replace(
        regex,
        '<mark class="bg-cyan-400/30 text-cyan-200 px-1 rounded">$1</mark>'
      );
    });

    return highlighted;
  };

  return (
    <div className="text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 inline-block rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
            AI Resume Intelligence
          </p>
          <h1 className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-4xl font-extrabold text-transparent">
            Resume Analyzer
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Analyze resume text using machine learning and get role prediction,
            ATS score, AI suggestions, and keyword insights.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Resume Input</h2>
                <p className="mt-1 text-sm text-slate-300">
                  Paste resume text or upload a PDF.
                </p>
              </div>
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                NLP Model Active
              </div>
            </div>

            <textarea
              rows="12"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              placeholder="Paste resume text here..."
            />

            <div className="mt-4 rounded-2xl border border-dashed border-white/10 bg-slate-900/40 p-4">
              <label className="mb-2 block text-sm text-slate-300">
                Upload Resume PDF
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="block w-full text-sm text-slate-300"
              />
              {selectedFile && (
                <p className="mt-2 text-xs text-cyan-300">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <button
                onClick={handleAnalyzeText}
                disabled={loading}
                className="rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-200 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Analyzing..." : "Analyze Text Resume"}
              </button>

              <button
                onClick={handleUploadPdf}
                disabled={loading}
                className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-6 py-3 text-base font-semibold text-cyan-300 transition duration-200 hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Uploading..." : "Analyze PDF Resume"}
              </button>
            </div>

            {error && <p className="mt-4 text-red-400">{error}</p>}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white">Prediction Result</h3>
              <p className="mt-2 text-sm text-slate-300">
                Resume classification and ATS score will appear here.
              </p>

              {result ? (
                <>
                  <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5">
                    <p className="text-sm uppercase tracking-widest text-cyan-300 opacity-80">
                      Predicted Role
                    </p>
                    <p className="mt-2 text-3xl font-bold text-white">
                      {result.predicted_role}
                    </p>
                    <p className="mt-3 text-sm text-yellow-300">
                      Confidence: {Math.round(result.confidence * 100)}%
                    </p>
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/40 p-5">
                    <p className="text-sm text-slate-400">ATS Score</p>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="relative h-24 w-24">
                        <svg className="h-24 w-24 -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="38"
                            stroke="rgba(255,255,255,0.12)"
                            strokeWidth="8"
                            fill="none"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="38"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={2 * Math.PI * 38}
                            strokeDashoffset={
                              2 * Math.PI * 38 * (1 - result.resume_score / 100)
                            }
                            className={gaugeColor(result.resume_score)}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className={`text-xl font-bold ${gaugeColor(
                              result.resume_score
                            )}`}
                          >
                            {result.resume_score}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p
                          className={`text-lg font-semibold ${gaugeColor(
                            result.resume_score
                          )}`}
                        >
                          {result.ats_level}
                        </p>
                        <p className="text-sm text-slate-400">
                          Resume Score: {result.resume_score}/100
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-slate-900/40 p-6 text-center text-slate-400">
                  No analysis yet. Paste resume text or upload PDF.
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white">AI Suggestions</h3>

              {result?.ai_summary ? (
                <div className="mt-4 rounded-2xl bg-slate-900/40 p-4 text-sm text-slate-300">
                  {result.ai_summary}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl bg-slate-900/40 p-4 text-sm text-slate-300">
                  AI summary will appear here after analysis.
                </div>
              )}

              {result?.suggestions?.length ? (
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  {result.suggestions.map((item, index) => (
                    <li key={index} className="rounded-2xl bg-slate-900/40 p-4">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white">Keyword Highlights</h3>
          <p className="mt-2 text-sm text-slate-300">
            Matched keywords in extracted or pasted resume text.
          </p>

          {result?.extracted_text_preview ? (
            <div
              className="mt-4 rounded-2xl bg-slate-900/40 p-4 text-sm leading-7 text-slate-200"
              dangerouslySetInnerHTML={{
                __html: highlightKeywords(
                  result.extracted_text_preview,
                  result.matched_keywords
                ),
              }}
            />
          ) : (
            <div className="mt-4 rounded-2xl bg-slate-900/40 p-4 text-sm text-slate-300">
              Resume preview with highlighted keywords will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;