
import React from 'react';
import { BrainCircuitIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center gap-4">
        <BrainCircuitIcon className="w-12 h-12 text-cyan-400" />
        <h1 className="font-orbitron text-4xl md:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          FusionCast
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-300">
        Transform Text & PDFs into Summaries and Podcasts with AI
      </p>
    </header>
  );
};
