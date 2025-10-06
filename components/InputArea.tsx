
import React from 'react';
import type { InputMode } from '../types';
import { UploadIcon } from './icons';

interface InputAreaProps {
  inputMode: InputMode;
  setInputMode: (mode: InputMode) => void;
  onTextChange: (text: string) => void;
  onFileChange: (file: File | null) => void;
  fileName: string;
  isLoading: boolean;
}

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg ${className}`}>
        {children}
    </div>
);


export const InputArea: React.FC<InputAreaProps> = ({
  inputMode,
  setInputMode,
  onTextChange,
  onFileChange,
  fileName,
  isLoading,
}) => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onFileChange(file || null);
  };

  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex border-b border-white/20 mb-4">
        <TabButton
          label="Text Input"
          isActive={inputMode === 'text'}
          onClick={() => setInputMode('text')}
        />
        <TabButton
          label="Upload PDF"
          isActive={inputMode === 'pdf'}
          onClick={() => setInputMode('pdf')}
        />
      </div>
      <div className="flex-grow">
        {inputMode === 'text' ? (
          <textarea
            className="w-full h-full min-h-[200px] bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-0 resize-none"
            placeholder="Paste your text here..."
            onChange={(e) => onTextChange(e.target.value)}
            disabled={isLoading}
          ></textarea>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] border-2 border-dashed border-white/30 rounded-lg p-6 text-center">
            <UploadIcon className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-300 mb-2">Drag & drop a PDF file or</p>
            <label
              htmlFor="file-upload"
              className={`cursor-pointer font-semibold text-cyan-400 hover:text-cyan-300 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span>Choose a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept=".pdf"
                onChange={handleFileSelect}
                disabled={isLoading}
              />
            </label>
            {fileName && <p className="mt-4 text-sm text-gray-400">Selected: {fileName}</p>}
          </div>
        )}
      </div>
    </GlassCard>
  );
};

interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors focus:outline-none ${
        isActive
          ? 'border-b-2 border-cyan-400 text-cyan-400'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {label}
    </button>
)
