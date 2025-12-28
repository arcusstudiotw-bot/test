
import React, { useState } from 'react';

const Auth: React.FC = () => {
    const [name, setName] = useState('王小明');
    const [email, setEmail] = useState('user@example.com');
    const [notifications, setNotifications] = useState({
        dailyPractice: true,
        newSuggestions: true,
        invites: false,
    });

    const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setNotifications(prev => ({ ...prev, [name]: checked }));
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">使用者帳號與設定</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">個人資料</h2>
                    <p className="text-gray-500 dark:text-gray-400">管理你的帳號資訊。</p>
                </div>
                <div className="md:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                    <form>
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">姓名</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">電子郵件</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="px-6 py-2 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition">
                                儲存變更
                            </button>
                        </div>
                    </form>
                </div>

                <div className="md:col-span-1">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">通知設定</h2>
                    <p className="text-gray-500 dark:text-gray-400">選擇你想收到的通知類型。</p>
                </div>
                <div className="md:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700 dark:text-gray-300">每日練習提醒</span>
                             <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="dailyPractice" checked={notifications.dailyPractice} onChange={handleNotificationChange} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700 dark:text-gray-300">AI 新建議通知</span>
                             <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="newSuggestions" checked={notifications.newSuggestions} onChange={handleNotificationChange} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700 dark:text-gray-300">家庭成員邀請回覆</span>
                             <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="invites" checked={notifications.invites} onChange={handleNotificationChange} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                 <div className="md:col-span-3 flex justify-end space-x-4 mt-4">
                    <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300">
                        登出
                    </button>
                    <button className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600">
                        刪除帳號
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
