
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChartBarIcon, HeartIcon, MapIcon, SparklesIcon, UsersIcon, BellIcon, ShieldCheckIcon, QuestionMarkCircleIcon, CogIcon, ArrowLeftIcon, HomeIcon } from './icons/SidebarIcons';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems = [
  { to: '/tracker', icon: ChartBarIcon, label: '情緒紀錄與分析' },
  { to: '/coach', icon: HeartIcon, label: '引導式情緒練習' },
  { to: '/map', icon: MapIcon, label: '家庭關係指導地圖' },
  { to: '/repair', icon: SparklesIcon, label: '修復對話模組' },
  { to: '/assistant', icon: UsersIcon, label: 'AI 共感建議' },
  { to: '/collaboration', icon: UsersIcon, label: '共筆與邀請' },
  { to: '/notifications', icon: BellIcon, label: '系統通知' },
  { to: '/privacy', icon: ShieldCheckIcon, label: '安全與隱私' },
  { to: '/help', icon: QuestionMarkCircleIcon, label: '教學與支援' },
  { to: '/profile', icon: CogIcon, label: '使用者設定' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const activeLinkClass = "bg-teal-700 text-white";
  const inactiveLinkClass = "text-gray-300 hover:bg-teal-600 hover:text-white";

  return (
    <>
      <div className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={() => setIsOpen(false)}></div>
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-teal-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:flex lg:flex-shrink-0`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-20 px-4 border-b border-teal-700">
            <div className="flex items-center">
              <HomeIcon className="h-8 w-8 text-white" />
              <span className="ml-3 text-2xl font-semibold">家和APP</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-300 hover:text-white">
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 mt-6 px-2 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive ? activeLinkClass : inactiveLinkClass}`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
