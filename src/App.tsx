import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Exercises from './pages/Exercises';
import { isSupabaseConfigured } from './lib/supabase';

function App() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Dumbbell className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-4">Welcome to GymPro</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <p className="text-blue-700 text-center">
              Please connect to Supabase using the "Connect to Supabase" button in the top right corner to start using the application.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exercises" element={<Exercises />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;