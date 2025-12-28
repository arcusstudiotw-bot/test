
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const emotionData = [
  { name: '週一', '喜悅': 4, '平靜': 5, '焦慮': 2, '悲傷': 1 },
  { name: '週二', '喜悅': 3, '平靜': 6, '焦慮': 3, '悲傷': 2 },
  { name: '週三', '喜悅': 5, '平靜': 7, '焦慮': 1, '悲傷': 0 },
  { name: '週四', '喜悅': 6, '平靜': 4, '焦慮': 2, '悲傷': 1 },
  { name: '週五', '喜悅': 7, '平靜': 6, '焦慮': 1, '悲傷': 0 },
  { name: '週六', '喜悅': 8, '平靜': 8, '焦慮': 0, '悲傷': 0 },
  { name: '週日', '喜悅': 6, '平靜': 7, '焦慮': 1, '悲傷': 1 },
];

const conflictData = [
  { name: '家務分配', value: 12 },
  { name: '金錢觀念', value: 8 },
  { name: '子女教養', value: 15 },
  { name: '溝通方式', value: 20 },
  { name: '姻親關係', value: 5 },
];

const emotionColors = {
  '喜悅': '#4ade80',
  '平靜': '#38bdf8',
  '焦慮': '#facc15',
  '悲傷': '#a78bfa',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="label font-bold text-gray-800 dark:text-gray-200">{`${label}`}</p>
        {payload.map((pld: any) => (
          <p key={pld.dataKey} style={{ color: pld.color }}>{`${pld.dataKey}: ${pld.value}`}</p>
        ))}
      </div>
    );
  }
  return null;
};

const EmotionTracker: React.FC = () => {
    const [timeRange, setTimeRange] = useState('week');

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">情緒紀錄與分析</h1>
            <div className="grid grid-cols-1 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">每週情緒趨勢</h2>
                        <div className="flex space-x-2 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
                           {['week', 'month', 'year'].map(range => (
                               <button 
                                key={range}
                                onClick={() => setTimeRange(range)} 
                                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${timeRange === range ? 'bg-white dark:bg-gray-600 text-teal-600 dark:text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}>
                                   {range === 'week' ? '週' : range === 'month' ? '月' : '年'}
                                </button>
                           ))}
                        </div>
                    </div>
                    <div style={{ width: '100%', height: 400 }}>
                        <ResponsiveContainer>
                            <LineChart data={emotionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                                <XAxis dataKey="name" stroke="currentColor" />
                                <YAxis stroke="currentColor" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Line type="monotone" dataKey="喜悅" stroke={emotionColors['喜悅']} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="平靜" stroke={emotionColors['平靜']} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                                <Line type="monotone" dataKey="焦慮" stroke={emotionColors['焦慮']} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                                <Line type="monotone" dataKey="悲傷" stroke={emotionColors['悲傷']} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">常見衝突類型分析</h2>
                    <div style={{ width: '100%', height: 400 }}>
                        <ResponsiveContainer>
                            <BarChart data={conflictData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                                <XAxis type="number" stroke="currentColor" />
                                <YAxis type="category" dataKey="name" stroke="currentColor" width={80} />
                                <Tooltip cursor={{fill: 'rgba(200, 200, 200, 0.1)'}} content={<CustomTooltip />} />
                                <Legend />
                                <Bar dataKey="value" name="衝突次數" fill="#14b8a6" barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmotionTracker;
