import { useState } from "react";
import api from "../services/api";

export default function AcademicRisk() {
  const [riskForm, setRiskForm] = useState({
    age_at_enrollment: 20,
    curricular_units_1st_sem_enrolled: 6,
    curricular_units_1st_sem_approved: 5,
    curricular_units_1st_sem_grade: 12,
    curricular_units_2nd_sem_enrolled: 6,
    curricular_units_2nd_sem_approved: 5,
    curricular_units_2nd_sem_grade: 13,
  });

  const [perfForm, setPerfForm] = useState({
    study_hours: 5,
    attendance: 85,
    assignments: 8,
    internal_marks: 75,
  });

  const [riskResult, setRiskResult] = useState(null);
  const [perfResult, setPerfResult] = useState(null);
  const [loadingRisk, setLoadingRisk] = useState(false);
  const [loadingPerf, setLoadingPerf] = useState(false);

  const handleRiskChange = (e) => {
    setRiskForm({
      ...riskForm,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handlePerfChange = (e) => {
    setPerfForm({
      ...perfForm,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleRiskPredict = async () => {
    try {
      setLoadingRisk(true);

      const res = await api.post("/predict-risk", {
        ...riskForm,
        marital_status: 1,
        application_mode: 1,
        application_order: 1,
        course: 171,
        daytime_evening_attendance: 1,
        previous_qualification: 1,
        nacionality: 1,
        mother_s_qualification: 1,
        father_s_qualification: 1,
        mother_s_occupation: 1,
        father_s_occupation: 1,
        displaced: 0,
        educational_special_needs: 0,
        debtor: 0,
        tuition_fees_up_to_date: 1,
        gender: 1,
        scholarship_holder: 0,
        international: 0,
        curricular_units_1st_sem_credited: 0,
        curricular_units_1st_sem_without_evaluations: 0,
        curricular_units_2nd_sem_credited: 0,
        curricular_units_2nd_sem_without_evaluations: 0,
        unemployment_rate: 10.8,
        inflation_rate: 1.4,
        gdp: 1.74,
      });

      setRiskResult(res.data);
      localStorage.setItem("academicRiskResult", JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      alert("Academic risk prediction failed.");
    } finally {
      setLoadingRisk(false);
    }
  };

  const handlePerfPredict = async () => {
    try {
      setLoadingPerf(true);

      const res = await api.post("/student-performance", perfForm);

      setPerfResult(res.data);
      localStorage.setItem("studentPerformanceResult", JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      alert("Student performance prediction failed.");
    } finally {
      setLoadingPerf(false);
    }
  };

  const riskBadge = (risk) => {
    if (risk === "Low Risk") {
      return "bg-emerald-500/15 border border-emerald-400/30 text-emerald-300";
    }
    if (risk === "Medium Risk") {
      return "bg-yellow-500/15 border border-yellow-400/30 text-yellow-300";
    }
    return "bg-red-500/15 border border-red-400/30 text-red-300";
  };

  const perfBadge = (perf) => {
    const text = String(perf || "").toLowerCase();
    if (text.includes("good") || text.includes("excellent")) {
      return "bg-emerald-500/15 border border-emerald-400/30 text-emerald-300";
    }
    if (text.includes("average") || text.includes("medium")) {
      return "bg-yellow-500/15 border border-yellow-400/30 text-yellow-300";
    }
    return "bg-red-500/15 border border-red-400/30 text-red-300";
  };

  const perfBars = [
    {
      label: "Study Consistency",
      value: Math.min(100, perfForm.study_hours * 12),
      color: "from-cyan-400 to-blue-500",
    },
    {
      label: "Attendance",
      value: perfForm.attendance,
      color: "from-emerald-400 to-cyan-400",
    },
    {
      label: "Assignments",
      value: Math.min(100, perfForm.assignments * 10),
      color: "from-sky-400 to-indigo-400",
    },
    {
      label: "Internal Marks",
      value: perfForm.internal_marks,
      color: "from-cyan-300 to-teal-400",
    },
  ];

  return (
    <div className="text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 inline-block rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
              Academic Intelligence Engine
            </p>
            <h1 className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-4xl font-extrabold text-transparent">
              Academic Risk & Student Performance
            </h1>
            <p className="mt-3 max-w-3xl text-slate-300">
              Analyze academic risk, predict performance quality, and estimate GPA
              through an AI-powered student intelligence dashboard.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            ML Models Active
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Predicted GPA</p>
            <p className="mt-3 text-4xl font-bold text-cyan-300">
              {perfResult?.predicted_gpa ?? "--"}
            </p>
            <p className="mt-1 text-sm text-slate-300">Live ML estimate</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Performance</p>
            <p className="mt-3 text-3xl font-bold text-emerald-300">
              {perfResult?.performance ?? "--"}
            </p>
            <p className="mt-1 text-sm text-slate-300">Student quality band</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Academic Risk</p>
            <p className="mt-3 text-3xl font-bold text-yellow-300">
              {riskResult?.risk_level ?? "--"}
            </p>
            <p className="mt-1 text-sm text-slate-300">Risk prediction status</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Confidence</p>
            <p className="mt-3 text-4xl font-bold text-cyan-300">
              {perfResult?.confidence ? `${Math.round(perfResult.confidence * 100)}%` : "90%"}
            </p>
            <p className="mt-1 text-sm text-slate-300">Performance model confidence</p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Academic Risk Inputs</h2>
                  <p className="mt-1 text-sm text-slate-300">
                    Core academic indicators for risk-level prediction.
                  </p>
                </div>
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                  Risk Model
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="Age at Enrollment"
                  name="age_at_enrollment"
                  value={riskForm.age_at_enrollment}
                  onChange={handleRiskChange}
                />
                <InputField
                  label="1st Sem Subjects Enrolled"
                  name="curricular_units_1st_sem_enrolled"
                  value={riskForm.curricular_units_1st_sem_enrolled}
                  onChange={handleRiskChange}
                />
                <InputField
                  label="1st Sem Subjects Passed"
                  name="curricular_units_1st_sem_approved"
                  value={riskForm.curricular_units_1st_sem_approved}
                  onChange={handleRiskChange}
                />
                <InputField
                  label="1st Sem Grade"
                  name="curricular_units_1st_sem_grade"
                  value={riskForm.curricular_units_1st_sem_grade}
                  onChange={handleRiskChange}
                />
                <InputField
                  label="2nd Sem Subjects Enrolled"
                  name="curricular_units_2nd_sem_enrolled"
                  value={riskForm.curricular_units_2nd_sem_enrolled}
                  onChange={handleRiskChange}
                />
                <InputField
                  label="2nd Sem Subjects Passed"
                  name="curricular_units_2nd_sem_approved"
                  value={riskForm.curricular_units_2nd_sem_approved}
                  onChange={handleRiskChange}
                />
                <InputField
                  label="2nd Sem Grade"
                  name="curricular_units_2nd_sem_grade"
                  value={riskForm.curricular_units_2nd_sem_grade}
                  onChange={handleRiskChange}
                />
              </div>

              <button
                onClick={handleRiskPredict}
                disabled={loadingRisk}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-200 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loadingRisk ? "Predicting Risk..." : "Predict Academic Risk"}
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Student Performance Inputs</h2>
                  <p className="mt-1 text-sm text-slate-300">
                    Predict GPA and overall performance category.
                  </p>
                </div>
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                  GPA Model
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="Study Hours"
                  name="study_hours"
                  value={perfForm.study_hours}
                  onChange={handlePerfChange}
                />
                <InputField
                  label="Attendance %"
                  name="attendance"
                  value={perfForm.attendance}
                  onChange={handlePerfChange}
                />
                <InputField
                  label="Assignments Score"
                  name="assignments"
                  value={perfForm.assignments}
                  onChange={handlePerfChange}
                />
                <InputField
                  label="Internal Marks"
                  name="internal_marks"
                  value={perfForm.internal_marks}
                  onChange={handlePerfChange}
                />
              </div>

              <button
                onClick={handlePerfPredict}
                disabled={loadingPerf}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-200 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loadingPerf ? "Predicting Performance..." : "Predict Student Performance"}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white">Prediction Summary</h3>

              {riskResult ? (
                <div className={`mt-5 rounded-2xl p-5 ${riskBadge(riskResult.risk_level)}`}>
                  <p className="text-sm uppercase tracking-widest opacity-80">Academic Risk</p>
                  <p className="mt-2 text-3xl font-bold">{riskResult.risk_level}</p>
                  <p className="mt-3 text-sm opacity-80">
                    Raw Prediction: {riskResult.raw_prediction}
                  </p>
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-slate-900/40 p-5 text-sm text-slate-400">
                  Academic risk result will appear here.
                </div>
              )}

              {perfResult ? (
                <div className={`mt-5 rounded-2xl p-5 ${perfBadge(perfResult.performance)}`}>
                  <p className="text-sm uppercase tracking-widest opacity-80">Performance Level</p>
                  <p className="mt-2 text-3xl font-bold">{perfResult.performance}</p>
                  <p className="mt-3 text-sm opacity-80">
                    Predicted GPA: {perfResult.predicted_gpa}
                  </p>
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-slate-900/40 p-5 text-sm text-slate-400">
                  Student performance result will appear here.
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white">Performance Breakdown</h3>

              <div className="mt-5 space-y-4">
                {perfBars.map((item) => (
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

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white">AI Insights</h3>

              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="rounded-2xl bg-slate-900/40 p-4">
                  <span className="font-semibold text-emerald-300">Strong Zone:</span>{" "}
                  Higher attendance and consistent internal marks usually improve GPA prediction.
                </div>
                <div className="rounded-2xl bg-slate-900/40 p-4">
                  <span className="font-semibold text-yellow-300">Watch Area:</span>{" "}
                  Low study hours or weak assignment scores can reduce performance class.
                </div>
                <div className="rounded-2xl bg-slate-900/40 p-4">
                  <span className="font-semibold text-cyan-300">Recommendation:</span>{" "}
                  Maintain regular study hours, improve assignment quality, and keep attendance above 80%.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
      />
    </div>
  );
}