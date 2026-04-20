# StudentPlus AI — Frontend

> Intelligent Academic Ecosystem | React + Vite + Tailwind CSS

---

## 🗂️ Project Structure

```
studentplus-ai/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx      # Main layout wrapper
│   │   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   │   └── Topbar.jsx         # Top header bar
│   │   └── ui/
│   │       └── index.jsx          # Reusable UI components
│   ├── hooks/
│   │   ├── useAuth.jsx            # Auth context + JWT
│   │   └── useApi.js              # Generic API fetch hook
│   ├── pages/
│   │   ├── Login.jsx              # Login page
│   │   ├── Overview.jsx           # Dashboard overview
│   │   ├── AcademicRisk.jsx       # GPA forecast + risk
│   │   ├── Placement.jsx          # Placement readiness
│   │   ├── Skills.jsx             # Skill gap + roadmap
│   │   ├── ResumeAnalyzer.jsx     # Resume upload + ATS
│   │   ├── Internship.jsx         # Internship matching
│   │   ├── Assistant.jsx          # AI chat assistant
│   │   └── Analytics.jsx          # Institutional analytics
│   ├── services/
│   │   └── api.js                 # All FastAPI endpoint calls
│   ├── App.jsx                    # Routes
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles + Tailwind
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env — set VITE_API_URL to your FastAPI server
```

### 3. Start development server
```bash
npm run dev
# Opens at http://localhost:3000
```

### 4. Build for production
```bash
npm run build
```

---

## 🔌 Backend API Endpoints Expected

All endpoints in `src/services/api.js` — connect to FastAPI backend:

| Module            | Endpoints                                          |
|-------------------|----------------------------------------------------|
| Auth              | POST /auth/login, /auth/register, GET /auth/me    |
| Dashboard         | GET /dashboard/summary, /dashboard/insights        |
| Academic Risk     | GET /academic/risk, /gpa-forecast, /study-plan     |
| Placement         | GET /placement/score, /company-eligibility         |
| Skills            | GET /skills/map, /career-matches, /roadmap         |
| Resume            | POST /resume/analyze, GET /resume/last             |
| Internship        | GET /internships/matches, POST /internships/:id/apply |
| AI Assistant      | POST /assistant/chat                               |
| Analytics         | GET /analytics/batch-summary, /at-risk             |

---

## 🎨 Design System

- **Font**: Sora (UI) + JetBrains Mono (numbers/code)
- **Theme**: Dark (`#0D0F17` base)
- **Accent**: `#6C63FF` (purple) + `#00D4AA` (teal)
- **Components**: MetricCard, ScoreRing, ProgressBar, Badge, StatusPill, InsightCard, Skeleton

---

## 📦 Key Dependencies

| Package          | Purpose                          |
|------------------|----------------------------------|
| react-router-dom | Client-side routing              |
| recharts         | Charts (Bar, Line, Radar)        |
| axios            | HTTP client for FastAPI calls    |
| lucide-react     | Icons                            |
| react-hot-toast  | Toast notifications              |
| tailwindcss      | Utility-first styling            |
| clsx             | Conditional classnames           |

---

## 🤖 ML Model Integration Points

Your teammates' models plug in via the FastAPI layer:

- **GPA Forecast** → `GET /academic/gpa-forecast` → LSTM model output
- **Placement Score** → `GET /placement/score` → Random Forest output
- **Career Matching** → `GET /skills/career-matches` → NLP similarity scores
- **Resume ATS** → `POST /resume/analyze` → NLP keyword extraction
- **Academic Risk** → `GET /academic/risk` → Gradient Boosting output

---

*Built with ❤️ for StudentPlus AI*
