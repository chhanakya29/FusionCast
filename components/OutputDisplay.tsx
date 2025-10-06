import React, { useState, useEffect } from 'react';
import type { GenerationResult, PodcastLanguage } from '../types';
import { Loader } from './Loader';
// Fix: Import SparklesIcon to resolve reference error.
import { DocumentTextIcon, LightBulbIcon, PlayIcon, PauseIcon, StopIcon, SparklesIcon } from './icons';

interface OutputDisplayProps {
  result: GenerationResult | null;
  isLoading: boolean;
  error: string | null;
  language: PodcastLanguage;
}

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`bg-black/20 backdrop-blur-md border border-white/20 rounded-xl shadow-lg h-full ${className}`}>
        {children}
    </div>
);

const langToCode: Record<PodcastLanguage, string> = {
  English: 'en-US',
  Hindi: 'hi-IN',
  Telugu: 'te-IN',
};

export const OutputDisplay: React.FC<OutputDisplayProps> = ({
  result,
  isLoading,
  error,
  language,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (result) {
      const newSpeech = new SpeechSynthesisUtterance(result.summary);
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang === langToCode[language]);
      if (voice) {
        newSpeech.voice = voice;
      }
      newSpeech.lang = langToCode[language];
      newSpeech.onstart = () => setIsPlaying(true);
      newSpeech.onend = () => setIsPlaying(false);
      newSpeech.onpause = () => setIsPlaying(false);
      newSpeech.onresume = () => setIsPlaying(true);
      setSpeech(newSpeech);
    }

    // Cleanup function to stop speech when component unmounts or result changes
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [result, language]);

  const handlePlay = () => {
    if (speech) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.speak(speech);
      }
    }
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Loader />
          <p className="mt-4 text-lg text-gray-300 font-orbitron">AI is processing...</p>
        </div>
      );
    }

    if (error) {
      return <div className="p-6 text-red-400">{error}</div>;
    }

    if (result) {
      return (
        <div className="p-6 space-y-6 overflow-y-auto h-full">
          <div>
            <h3 className="text-xl font-orbitron text-cyan-400 flex items-center gap-2 mb-3">
              <DocumentTextIcon className="w-6 h-6" />
              Summary
            </h3>
            <p className="text-gray-200 leading-relaxed">{result.summary}</p>
          </div>
          
          <div className="border-t border-white/20 pt-6">
            <h3 className="text-xl font-orbitron text-cyan-400 flex items-center gap-2 mb-3">
              <LightBulbIcon className="w-6 h-6" />
              Key Points
            </h3>
            <ul className="space-y-2 list-disc list-inside text-gray-300">
              {result.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/20 pt-6">
            <h3 className="text-xl font-orbitron text-cyan-400 mb-3">
              Podcast
            </h3>
            <div className="flex items-center gap-4">
              <button onClick={isPlaying ? handlePause : handlePlay} className="p-3 bg-white/10 rounded-full text-cyan-400 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400">
                {isPlaying ? <PauseIcon className="w-8 h-8"/> : <PlayIcon className="w-8 h-8"/>}
              </button>
              <button onClick={handleStop} className="p-3 bg-white/10 rounded-full text-gray-300 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400">
                <StopIcon className="w-8 h-8"/>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 border-2 border-dashed border-white/30">
            <SparklesIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-orbitron text-gray-300">Your AI-generated content will appear here.</h3>
        <p className="text-gray-400 mt-2">Enter some text or upload a PDF to get started.</p>
      </div>
    );
  };
  
  return <GlassCard>{renderContent()}</GlassCard>;
};