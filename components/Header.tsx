
import React from 'react';
import { MenuIcon } from './icons/MenuIcon';
import { UserCircleIcon } from './icons/SidebarIcons';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="text-gray-500 dark:text-gray-300 focus:outline-none lg:hidden">
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex items-center">
        <span className="mr-4 font-medium">歡迎回來, 使用者</span>
        <UserCircleIcon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
      </div>
    </header>
  );
};

export default Header;
