/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { ToastContainer } from './components/common/ToastContainer';
import { NotificationCenter } from './components/common/NotificationCenter';
import { LoginModal } from './components/common/LoginModal';
import { LandingPage } from './components/landing/LandingPage';
import { FarmerApp } from './components/farmer/FarmerApp';
import { OperatorDashboard } from './components/operator/OperatorDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainContent: React.FC = () => {
  const { role } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        {role === 'landing' && <LandingPage />}
        {role === 'farmer' && <FarmerApp />}
        {role === 'operator' && <OperatorDashboard />}
        {role === 'admin' && <AdminDashboard />}
      </main>
      <ToastContainer />
      <NotificationCenter />
      <LoginModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
