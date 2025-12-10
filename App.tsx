
import React, { useState, useCallback } from 'react';
import type { AnalysisResult } from './types';
import { analyzeCVWithGemini } from './services/geminiService';
import Header from './components/Header';
import AnalysisResultComponent from './components/AnalysisResult';
import Loader from './components/Loader';
import { RobotIcon } from './components/icons/RobotIcon';
import { UploadIcon } from './components/icons/UploadIcon';
import { parseFile } from './utils/fileParser';

const App: React.FC = () => {
  const [cvText, setCvText] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeClick = useCallback(async () => {
    if (!cvText || !jobDescription) {
      setError('Please provide both your CV content and the job description.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeCVWithGemini(cvText, jobDescription);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the CV. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [cvText, jobDescription]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    setError(null);

    try {
      const text = await parseFile(file);
      setCvText(text);
    } catch (err: any) {
      console.error('File parsing error:', err);
      setError(err.message || 'Failed to read the file.');
    } finally {
      setIsParsing(false);
    }
  };

  const isButtonDisabled = !cvText || !jobDescription || isLoading || isParsing;

  return (
    <div className="min-h-screen bg-ats-background text-ats-text-main font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto bg-ats-surface shadow-xl rounded-xl overflow-hidden border border-gray-100">
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <label htmlFor="cv-input" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Paste Your CV Content or Upload File
                </label>

                <div className="mb-4">
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <UploadIcon className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {isParsing ? 'Reading file...' : 'Upload PDF / DOCX'}
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx,.doc"
                      onChange={handleFileUpload}
                      disabled={isParsing}
                    />
                  </label>
                </div>

                <textarea
                  id="cv-input"
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  placeholder="Or paste the full text of your CV here..."
                  className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-150 bg-gray-50 dark:bg-gray-700"
                />
              </div>
              <div className="flex flex-col h-full">
                <label htmlFor="job-desc-input" className="block text-lg font-bold mb-3 text-ats-secondary">
                  Job Description
                </label>
                <div className="flex-grow">
                  <textarea
                    id="job-desc-input"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job requirements and description here..."
                    className="w-full h-[calc(24rem+4.5rem)] p-5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-ats-primary focus:border-ats-primary transition-all resize-none bg-gray-50 text-sm leading-relaxed custom-scrollbar"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={handleAnalyzeClick}
                disabled={isButtonDisabled}
                className="inline-flex items-center justify-center px-10 py-4 bg-ats-primary text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
              >
                <RobotIcon className="w-6 h-6 mr-3" />
                {isLoading ? 'Analyzing Profile...' : 'Analyze Match'}
              </button>
            </div>
          </div>

          <div className="bg-gray-50 border-t border-gray-100">
            {error && (
              <div className="p-6">
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm" role="alert">
                  <p className="font-bold">Analysis Failed</p>
                  <p>{error}</p>
                </div>
              </div>
            )}
            {isLoading && (
              <div className="p-12">
                <Loader />
              </div>
            )}
            {analysisResult && !isLoading && (
              <div className="p-8 md:p-12">
                <AnalysisResultComponent result={analysisResult} />
              </div>
            )}
          </div>
        </div>
        <footer className="text-center mt-12 text-ats-text-muted text-sm">
          <p className="opacity-70">Build by Buwaneka </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
