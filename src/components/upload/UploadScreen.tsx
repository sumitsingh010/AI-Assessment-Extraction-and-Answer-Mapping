"use client";

import React, { useState } from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import FileUploadCard from './FileUploadCard';
import { DEMO_DATA, getDemoImage } from '@/lib/demo-data';

export default function UploadScreen() {
  const { setFiles, setScreen, setImages, setResults } = useAssessment();
  const [qFile, setQFile] = useState<File | null>(null);
  const [aFile, setAFile] = useState<File | null>(null);

  const handleStartMapping = () => {
    if (qFile && aFile) {
      setFiles(qFile, aFile);
      setScreen('extracting');
    }
  };

  const isReady = qFile !== null && aFile !== null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 w-full max-w-4xl mx-auto h-full overflow-y-auto">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Upload <span className="text-[#F26522]">Question Paper & Answer Sheets</span>
        </h1>
        <p className="text-gray-500">Upload both files to get started</p>
      </div>

      <div className="relative mb-12 flex justify-center">
        {/* Placeholder for the Avatar illustration */}
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center relative shadow-sm border-4 border-white">
          <div className="w-20 h-20 bg-[#F26522] rounded-full opacity-20 absolute animate-ping" />
          <span className="text-3xl">👩‍🏫</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-6 mb-10">
        <FileUploadCard 
          title={<>Upload <span className="text-[#F26522]">Question Paper</span></>}
          file={qFile}
          onFileSelect={setQFile}
        />
        <FileUploadCard 
          title={<>Upload <span className="text-[#F26522]">Answer Sheet</span></>}
          file={aFile}
          onFileSelect={setAFile}
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            onClick={handleStartMapping}
            disabled={!isReady}
            className={`px-8 py-3 rounded-full font-medium text-sm transition-all flex items-center space-x-2 ${
              isReady 
                ? 'bg-[#333333] hover:bg-black text-white shadow-md' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>Start Mapping</span>
            <span>→</span>
          </button>
          
          <button
            onClick={() => {
              try {
                const demoImg = getDemoImage();
                setImages([demoImg], [demoImg]);
                setResults(DEMO_DATA as any);
                setScreen('mapping');
              } catch (e) {
                console.error("Demo failed:", e);
                alert("Failed to load demo.");
              }
            }}
            className="px-8 py-3 rounded-full font-medium text-sm transition-all flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-700 shadow-sm"
          >
            <span>✨ Try Instant Demo</span>
          </button>
        </div>
        
        <p className="text-xs text-gray-400 mt-2 max-w-xs text-center">
          Once both files are uploaded, you'll be able to map answers with questions
        </p>
      </div>

    </div>
  );
}
