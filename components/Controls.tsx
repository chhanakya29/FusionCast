
import React from 'react';
import { LANGUAGES } from '../constants';
import type { PodcastLanguage } from '../types';
import { SparklesIcon } from './icons';

interface ControlsProps {
  language: PodcastLanguage;
  setLanguage: (language: PodcastLanguage) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg ${className}`}>
        {children}
    </div>
);

export const Controls: React.FC<ControlsProps> = ({
  language,
  setLanguage,
  onGenerate,
  isLoading,
}) => {
  return (
    <GlassCard>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Podcast Language
          </label>
          <div className="flex items-center gap-2 p-1 bg-black/20 rounded-lg">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-1.5 text-sm rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-400 ${
                  language === lang
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 font-orbitron font-bold text-lg bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-lg"
        >
          <SparklesIcon className="w-6 h-6" />
          GENERATE
        </button>
      </div>
    </GlassCard>
  );
};
