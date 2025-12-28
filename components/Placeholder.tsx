
import React from 'react';

interface PlaceholderProps {
  title: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ title }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">{title}</h1>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
        </svg>
        <h2 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">功能開發中</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          「{title}」功能即將推出，敬請期待！
        </p>
      </div>
    </div>
  );
};

export default Placeholder;
