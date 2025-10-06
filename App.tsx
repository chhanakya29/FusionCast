
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { InputArea } from './components/InputArea';
import { Controls } from './components/Controls';
import { OutputDisplay } from './components/OutputDisplay';
import { extractTextFromPdf } from './services/pdfParser';
import { summarizeAndExtractPoints } from './services/geminiService';
import type { PodcastLanguage, GenerationResult, InputMode } from './types';
import { DEFAULT_LANGUAGE } from './constants';

const App: React.FC = () => {
  const [inputMode, setInputMode] = useState<InputMode>('text');
  const [inputText, setInputText] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [language, setLanguage] = useState<PodcastLanguage>(DEFAULT_LANGUAGE);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This effect pre-loads the voices available in the browser's speech synthesis engine.
    // It can help in reducing the delay when the user first clicks "play".
    if (window.speechSynthesis) {
        window.speechSynthesis.getVoices();
    }
  }, []);

  const handleFileChange = useCallback(async (file: File | null) => {
    if (!file) {
      setInputText('');
      setFileName('');
      return;
    }
    setIsLoading(true);
    setError(null);
    setFileName(file.name);
    try {
      const text = await extractTextFromPdf(file);
      setInputText(text);
    } catch (e) {
      setError('Failed to extract text from PDF. Please ensure it is a valid, text-based PDF.');
      console.error(e);
      setInputText('');
      setFileName('');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text or upload a PDF.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    window.speechSynthesis.cancel(); // Stop any ongoing speech

    try {
      const generationResult = await summarizeAndExtractPoints(inputText, language);
      setResult(generationResult);
    } catch (e) {
      setError('An error occurred while generating content. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, language]);

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white animated-gradient">
      <main className="container mx-auto px-4 py-8">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="flex flex-col gap-6">
            <InputArea
              inputMode={inputMode}
              setInputMode={setInputMode}
              onTextChange={setInputText}
              onFileChange={handleFileChange}
              fileName={fileName}
              isLoading={isLoading}
            />
            <Controls
              language={language}
              setLanguage={setLanguage}
              onGenerate={handleGenerate}
              isLoading={isLoading || !inputText}
            />
          </div>
          <div>
            <OutputDisplay
              result={result}
              isLoading={isLoading}
              error={error}
              language={language}
            />
          </div>
        </div>
        <footer className="text-center text-sm text-gray-400 mt-12 pb-4">
          <p> Podcast audio generated using browser's Web Speech API.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
