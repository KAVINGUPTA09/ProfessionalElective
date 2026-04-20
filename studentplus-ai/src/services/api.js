import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sp_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authService = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  me: () => api.get("/auth/me"),
  logout: () => localStorage.removeItem("sp_token"),
};

export const dashboardService = {
  getSummary: () => api.get("/dashboard/summary"),
  getAIInsights: () => api.get("/dashboard/insights"),
};

export const academicService = {
  predictRisk: (data) => api.post("/predict-risk", data),
  predictStudentPerformance: (data) => api.post("/student-performance", data),
  getGPAForecast: (data) => api.post("/forecast-gpa", data),
};

export const placementService = {
  getDashboard: (data) => api.post("/placement-dashboard", data),
  getReadinessScore: (data) => api.post("/placement-score", data),
};
export const skillService = {
  predictCareer: (data) => api.post("/career-predict", data),
};

export const resumeService = {
  analyzeResume: (data) => api.post("/analyze-resume", data),

  uploadResume: (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return api.post("/analyze-resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export const internshipService = {
  predictInternship: (data) => api.post("/internships", data),
};

export const analyticsService = {
  getInstituteAnalytics: () => api.get("/institutional-analytics"),
};

export const assistantService = {
  ask: (query) => api.post("/assistant/query", { query }),
};

export default api;