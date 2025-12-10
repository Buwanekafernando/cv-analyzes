import React from 'react';
import type { AnalysisResult } from '../types';

interface AnalysisResultProps {
  result: AnalysisResult;
}

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from 'recharts';

const ScoreCard: React.FC<{ score: number }> = ({ score }) => {
  const getScoreColor = (s: number) => {
    if (s >= 85) return 'text-green-500';
    if (s >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-ats-surface rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-200 shadow-sm h-full">
      <h3 className="text-lg font-bold text-ats-secondary uppercase tracking-wider">Overall Match Score</h3>
      <p className={`text-8xl font-black mt-4 ${getScoreColor(score)}`}>
        {score}<span className="text-4xl text-gray-400 font-medium">%</span>
      </p>
    </div>
  );
};

const AnalysisResultComponent: React.FC<AnalysisResultProps> = ({ result }) => {
  const chartData = result.skillAnalysis.map(item => ({
    subject: item.skill,
    A: item.score,
    fullMark: 100,
  }));

  return (
    <div className="space-y-10 animate-fade-in">
      <h2 className="text-3xl font-extrabold text-center text-ats-text-main">Analysis Complete</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <ScoreCard score={result.matchScore} />
        </div>
        <div className="md:col-span-2 bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold mb-4 text-ats-secondary">Executive Summary</h3>
          <p className="text-ats-text-main leading-relaxed text-lg">{result.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
          <h3 className="text-xl font-bold mb-4 text-green-700 flex items-center">
            <span className="mr-2">✅</span> Strengths
          </h3>
          <ul className="space-y-3 list-disc list-inside text-ats-text-main">
            {result.strengths.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-8 border border-yellow-100">
          <h3 className="text-xl font-bold mb-4 text-yellow-700 flex items-center">
            <span className="mr-2">💡</span> Improvements
          </h3>
          <ul className="space-y-3 list-disc list-inside text-ats-text-main">
            {result.improvements.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-center mb-6 text-ats-secondary">Skill Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 h-96 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#5F6368', fontSize: 12, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'transparent' }} />
                <Radar name="Score" dataKey="A" stroke="#1A73E8" fill="#1A73E8" fillOpacity={0.5} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} itemStyle={{ color: '#1A73E8', fontWeight: 'bold' }} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {result.skillAnalysis.map((skill, index) => (
              <div key={index} className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:border-ats-primary transition-colors group">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-ats-secondary group-hover:text-ats-primary transition-colors">{skill.skill}</h4>
                  <span className="font-bold text-lg bg-white px-3 py-1 rounded-lg border border-gray-200 text-ats-primary">{skill.score}/100</span>
                </div>
                <p className="text-sm text-ats-text-muted">{skill.reasoning}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultComponent;
