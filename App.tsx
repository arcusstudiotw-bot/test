
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Auth from './components/Auth';
import PracticeCoach from './components/PracticeCoach';
import FamilyMap from './components/FamilyMap';
import RepairDialogs from './components/RepairDialogs';
import EmotionTracker from './components/EmotionTracker';
import EmpathyAssistant from './components/EmpathyAssistant';
import Placeholder from './components/Placeholder';
import { MenuIcon } from './components/icons/MenuIcon';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <HashRouter>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8">
              <Routes>
                <Route path="/" element={<Navigate to="/tracker" replace />} />
                <Route path="/tracker" element={<EmotionTracker />} />
                <Route path="/coach" element={<PracticeCoach />} />
                <Route path="/map" element={<FamilyMap />} />
                <Route path="/repair" element={<RepairDialogs />} />
                <Route path="/assistant" element={<EmpathyAssistant />} />
                <Route path="/collaboration" element={<Placeholder title="共筆與邀請 (Collaboration)" />} />
                <Route path="/notifications" element={<Placeholder title="系統通知與提醒 (Notifications)" />} />
                <Route path="/privacy" element={<Placeholder title="安全與隱私控制 (Privacy & Safety)" />} />
                <Route path="/help" element={<Placeholder title="教學與支援中心 (Help & Guidance)" />} />
                <Route path="/profile" element={<Auth />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
