import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './hooks/useAuth'
import AppLayout from './components/layout/AppLayout'

// Pages
import Login from './pages/Login'
import Overview from './pages/Overview'
import AcademicRisk from './pages/AcademicRisk'
import Placement from './pages/Placement'
import Skills from './pages/Skills'
import ResumeAnalyzer from './pages/ResumeAnalyzer'
import Internship from './pages/Internship'
import Assistant from './pages/Assistant'
import Analytics from './pages/Analytics'

export default function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1A1D2B',
            color: '#E8EAF0',
            border: '1px solid #2A2D3E',
            fontSize: '13px',
            borderRadius: '12px',
          }
        }}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppLayout><Overview /></AppLayout>} />
        <Route path="/academic-risk" element={<AppLayout><AcademicRisk /></AppLayout>} />
        <Route path="/placement" element={<AppLayout><Placement /></AppLayout>} />
        <Route path="/skills" element={<AppLayout><Skills /></AppLayout>} />
        <Route path="/resume" element={<AppLayout><ResumeAnalyzer /></AppLayout>} />
        <Route path="/internship" element={<AppLayout><Internship /></AppLayout>} />
        <Route path="/assistant" element={<AppLayout><Assistant /></AppLayout>} />
        <Route path="/analytics" element={<AppLayout><Analytics /></AppLayout>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  )
}