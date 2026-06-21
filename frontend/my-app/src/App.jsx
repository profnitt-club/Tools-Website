import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar'
import ToolsNavbar from './components/ToolsNavbar';
import MainBody from './components/MainBody'
import Strategies from './components/Strategies';
import CardDetails from './components/CardDetails';
import News from './components/News'

// Admin imports
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProjectsList from './pages/admin/ProjectsList';
import ProjectForm from './pages/admin/ProjectForm';
import ContactsList from './pages/admin/ContactsList';

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes — existing UI unchanged */}
        <Route path="/" element={<><Navbar/> <MainBody /></>} />
        <Route path="/strategies" element={<><ToolsNavbar/> <Strategies /></>} />
        <Route path="/card-details" element={<><ToolsNavbar/> <CardDetails /></>} />
        <Route path="/projects/:id" element={<><ToolsNavbar/> <CardDetails /></>} />
        <Route path="/news" element={<><ToolsNavbar/> <News /></>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/edit/:id" element={<ProjectForm />} />
          <Route path="contacts" element={<ContactsList />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App