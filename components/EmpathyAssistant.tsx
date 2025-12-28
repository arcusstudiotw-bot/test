
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon, SparklesIcon } from './icons/SidebarIcons';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const EmpathyAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: '你好，我是家和助理。有什麼煩惱或想不通的事，都可以跟我聊聊。' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const prompt = `你是一位名為「家和」的 AI 共感助理。你的目標是以同理、溫和、非批判的語氣回應使用者，並透過引導式問句，協助使用者探索與理解自身和他人的情緒。請不要直接給予建議或評判對錯。
      
      對話歷史:
      ${messages.map(m => `${m.sender === 'user' ? '使用者' : '家和'}: ${m.text}`).join('\n')}
      
      最新使用者訊息:
      使用者: ${input}
      
      你的回應 (家和):`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ parts: [{ text: prompt }] }],
      });

      const aiMessage: Message = { sender: 'ai', text: response.text };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error with AI assistant:", error);
      const errorMessage: Message = { sender: 'ai', text: '抱歉，我好像有點短路了，請稍後再試。' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">AI 共感建議</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col h-[70vh]">
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'ai' && <SparklesIcon className="w-8 h-8 text-teal-500 flex-shrink-0 mt-1" />}
              <div className={`max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-teal-500 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
              {msg.sender === 'user' && <UserCircleIcon className="w-8 h-8 text-gray-400 flex-shrink-0 mt-1" />}
            </div>
          ))}
          {loading && (
            <div className="flex items-start gap-3">
              <SparklesIcon className="w-8 h-8 text-teal-500 flex-shrink-0 mt-1" />
              <div className="max-w-md p-3 rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
              placeholder="在這裡輸入你的想法..."
              disabled={loading}
              className="w-full py-3 pl-4 pr-12 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpathyAssistant;
