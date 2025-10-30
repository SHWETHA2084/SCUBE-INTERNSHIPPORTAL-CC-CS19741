import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingPage } from './components/LandingPage';
import { StudentDashboard } from './components/StudentDashboard';
import { CompanyDashboard } from './components/CompanyDashboard';
import { AdminPanel } from './components/AdminPanel';
import { AuthPage } from './components/AuthPage';
import { userManager, User } from './utils/userManager';
import { Toaster } from './components/ui/sonner';

export type UserRole = 'student' | 'company' | 'admin' | null;
export type CurrentPage = 'landing' | 'student-dashboard' | 'company-dashboard' | 'admin-panel' | 'auth';

interface AppState {
  currentPage: CurrentPage;
  user: User | null;
  isAuthenticated: boolean;
}                   

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentPage: 'landing',
    user: null,
    isAuthenticated: false
  });

  // Check for existing user session on app load
  useEffect(() => {
    const currentUser = userManager.getCurrentUser();
    if (currentUser) {
      setAppState({
        currentPage: currentUser.role === 'student' ? 'student-dashboard' : 
                     currentUser.role === 'company' ? 'company-dashboard' : 'admin-panel',
        user: currentUser,
        isAuthenticated: true
      });
    }
  }, []);

  const navigateTo = (page: CurrentPage) => {
    setAppState(prev => ({
      ...prev,
      currentPage: page
    }));
  };

  const handleLogin = (user: User) => {
    setAppState({
      currentPage: user.role === 'student' ? 'student-dashboard' : 
                   user.role === 'company' ? 'company-dashboard' : 'admin-panel',
      user: user,
      isAuthenticated: true
    });
  };

  const handleLogout = () => {
    userManager.logout();
    setAppState({
      currentPage: 'landing',
      user: null,
      isAuthenticated: false
    });
  };

  const renderCurrentPage = () => {
    switch (appState.currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigateTo} />;
      case 'student-dashboard':
        return <StudentDashboard user={appState.user} onLogout={handleLogout} />;
      case 'company-dashboard':
        return <CompanyDashboard user={appState.user} onLogout={handleLogout} />;
      case 'admin-panel':
        return <AdminPanel user={appState.user} onLogout={handleLogout} />;
      case 'auth':
        return <AuthPage onLogin={handleLogin} onBack={() => navigateTo('landing')} />;
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      <AnimatePresence mode="wait">
        <motion.div
          key={appState.currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {renderCurrentPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}