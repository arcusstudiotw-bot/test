
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { RefreshIcon } from './icons/SidebarIcons';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-12a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1h-6a1 1 0 01-1-1V6zM5 21a1 1 0 011-1h6a1 1 0 011 1v-2a1 1 0 01-1-1H6a1 1 0 01-1 1v2z" />
  </svg>
);

const RepairDialogs: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const getSuggestion = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setSuggestion('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const prompt = `你是一位專門處理家庭關係的溝通專家。請將以下這句可能引發爭執或對方防衛心理的話，改寫成一句或多句更具建設性、更溫和、更能促進溝通的表達方式。請著重於表達自身感受與需求，而非指責對方。

      原始語句：「${inputText}」

      請提供1-3個不同的改寫建議，並簡要說明每個建議的優點。`;
      
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [{ parts: [{ text: prompt }] }],
      });
      setSuggestion(response.text);
    } catch (error) {
      console.error("Error getting suggestion:", error);
      setSuggestion("抱歉，無法取得建議。請檢查您的網路連線或稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">修復對話模組</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">輸入一句你在溝通中想說但覺得可能不太妥當的話，讓 AI 協助你用更好的方式表達。</p>
      
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="mb-6">
          <label htmlFor="userInput" className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">你想說的話：</label>
          <textarea
            id="userInput"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-32 p-4 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            placeholder="例如：你每次都把東西亂丟！"
          />
        </div>

        <div className="text-center mb-6">
          <button
            onClick={getSuggestion}
            disabled={loading || !inputText.trim()}
            className="inline-flex items-center justify-center px-8 py-3 bg-teal-500 text-white font-bold rounded-full hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
          >
            {loading ? (
              <>
                <RefreshIcon className="w-5 h-5 mr-2 animate-spin" />
                正在思考...
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5 mr-2" />
                取得 AI 建議
              </>
            )}
          </button>
        </div>

        {suggestion && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">AI 溝通建議：</h3>
            <div className="p-6 bg-teal-50 dark:bg-gray-700/50 border-l-4 border-teal-500 rounded-lg whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
              {suggestion}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepairDialogs;
