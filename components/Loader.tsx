
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 border-4 border-cyan-500 rounded-full opacity-50"></div>
      <div className="absolute inset-0 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
    </div>
  );
};
