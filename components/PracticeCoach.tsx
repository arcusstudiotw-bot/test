import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
// Fix: Import SparklesIcon from the shared icons file to resolve the "used before declaration" error.
import { ArrowRightIcon, CheckCircleIcon, LightBulbIcon, PencilIcon, RefreshIcon, SparklesIcon, UserIcon } from './icons/SidebarIcons';

const steps = [
  { id: 1, name: '辨識情緒', icon: LightBulbIcon },
  { id: 2, name: '理解來源', icon: PencilIcon },
  { id: 3, name: 'AI 語句建議', icon: SparklesIcon },
  { id: 4, name: '回顧反思', icon: CheckCircleIcon },
];

const emotions = ['喜悅', '憤怒', '悲傷', '恐懼', '驚訝', '厭惡', '平靜', '焦慮'];

const PracticeCoach: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [situation, setSituation] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [reflection, setReflection] = useState('');

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getSuggestion = async () => {
    if (!situation || !selectedEmotion) return;
    setLoading(true);
    setSuggestion('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const prompt = `你是一位專業的溝通教練。請根據以下使用者描述的情境和感受，提供一個使用「非暴力溝通」原則的表達句型建議。句型應包含：1. 客觀觀察（發生了什麼事） 2. 我的感受是... 3. 因為我重視... 4. 我希望... \n\n情境：${situation}\n感受：${selectedEmotion}\n\n請提供建議的表達方式：`;
      
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [{ parts: [{ text: prompt }] }],
      });

      setSuggestion(response.text);
    } catch (error) {
      console.error("Error getting suggestion:", error);
      setSuggestion("抱歉，目前無法取得建議，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (currentStep === 3 && situation && selectedEmotion) {
      getSuggestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, situation, selectedEmotion]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">你現在的感受是什麼？</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {emotions.map(emotion => (
                <button
                  key={emotion}
                  onClick={() => setSelectedEmotion(emotion)}
                  className={`p-4 rounded-lg text-center font-medium transition-all duration-200 ${selectedEmotion === emotion ? 'bg-teal-500 text-white scale-105 shadow-lg' : 'bg-gray-200 dark:bg-gray-700 hover:bg-teal-200 dark:hover:bg-teal-700'}`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">是什麼事情引發了「{selectedEmotion}」的感受？</h3>
            <p className="text-sm text-gray-500 mb-4">請客觀地描述事件，例如：「當我看到...」、「當我聽到...」</p>
            <textarea
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              className="w-full h-40 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              placeholder="例如：當我看到客廳的燈沒有關..."
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">AI 溝通語句建議</h3>
            <div className="p-4 bg-teal-50 dark:bg-gray-700 rounded-lg min-h-[150px]">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <RefreshIcon className="w-8 h-8 animate-spin text-teal-500" />
                  <p className="ml-2">正在為您產生建議...</p>
                </div>
              ) : (
                <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">{suggestion}</p>
              )}
            </div>
             <button onClick={getSuggestion} disabled={loading} className="mt-4 flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50">
              <RefreshIcon className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
              重新產生
            </button>
          </div>
        );
      case 4:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">回顧與反思</h3>
            <p className="text-sm text-gray-500 mb-4">這次的練習對你有什麼幫助？看到建議的語句後，你有什麼新的想法嗎？</p>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="w-full h-40 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              placeholder="寫下你的想法..."
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">引導式情緒練習</h1>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="mb-8">
            <ol className="flex items-center w-full">
                {steps.map((step, index) => (
                    <li key={step.id} className={`flex w-full items-center ${index < steps.length - 1 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block" : ""} ${step.id <= currentStep ? 'text-teal-600 dark:text-teal-400 after:border-teal-500 dark:after:border-teal-400' : 'text-gray-400 dark:text-gray-500 after:border-gray-200 dark:after:border-gray-700'}`}>
                        <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${step.id <= currentStep ? 'bg-teal-100 dark:bg-teal-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                           <step.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                        </span>
                    </li>
                ))}
            </ol>
             <ol className="flex justify-between w-full mt-2">
                {steps.map(step => (
                    <li key={step.id} className={`text-sm font-medium text-center ${step.id <= currentStep ? 'text-teal-600 dark:text-teal-400' : 'text-gray-400 dark:text-gray-500'}`}>
                        {step.name}
                    </li>
                ))}
            </ol>
        </div>

        <div className="min-h-[300px]">
          {renderStepContent()}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            上一步
          </button>
          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              disabled={(currentStep === 1 && !selectedEmotion) || (currentStep === 2 && !situation)}
              className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center"
            >
              下一步 <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center">
              完成練習 <CheckCircleIcon className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Fix: Removed the local definition of SparklesIcon as it's now imported from the shared icons file.

export default PracticeCoach;
