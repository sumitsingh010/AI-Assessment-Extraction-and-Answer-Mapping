"use client";

import React, { useEffect, useState } from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import { Sparkles } from 'lucide-react';
import { fileToBase64Images } from '@/lib/pdf-utils';
import { DEMO_DATA, getDemoImage } from '@/lib/demo-data';

export default function ExtractingScreen() {
  const { questionFile, answerFile, setResults, setImages, setScreen } = useAssessment();
  const [status, setStatus] = useState<string>("Initializing...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function processFiles() {
      if (!questionFile || !answerFile) {
        setScreen('upload');
        return;
      }

      try {
        // 1. Convert files to images directly on the client
        setStatus("Converting files to images...");
        const qImages = await fileToBase64Images(questionFile);
        const aImages = await fileToBase64Images(answerFile);
        
        if (!mounted) return;
        setImages(qImages, aImages);

        // 2. Send images to API for AI extraction
        setStatus("Extracting questions via AI...");
        const res = await fetch('/api/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionImages: qImages,
            answerImages: aImages
          })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to extract data");
        }

        const resultData = await res.json();
        
        if (!mounted) return;
        
        setResults(resultData);
        setScreen('mapping');
        
      } catch (err: any) {
        if (mounted) setError(err.message || "An error occurred");
      }
    }

    processFiles();

    return () => { mounted = false; };
  }, [questionFile, answerFile, setResults, setImages, setScreen]);

  return (
    <div className="flex-1 flex items-center justify-center h-full w-full bg-white relative">
      <div className="absolute inset-4 border-2 border-blue-400 rounded-xl pointer-events-none"></div>
      
      <div className="flex flex-col items-center border border-dashed border-blue-200 p-12 rounded-2xl">
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="w-10 h-10 text-[#F26522]" />
          </div>
          <div className="absolute top-0 right-0 w-4 h-4 bg-[#F26522] rounded-full animate-bounce delay-100"></div>
          <div className="absolute bottom-2 left-0 w-3 h-3 bg-[#F26522] rounded-full animate-bounce delay-300"></div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2">Extracting...</h2>
        <p className="text-sm text-gray-500 mb-4">This may take a while</p>
        
        <div className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-center max-w-sm">
          {error ? <span className="text-red-500">{error}</span> : status}
        </div>
        
        {error ? (
          <button 
            onClick={() => setScreen('upload')}
            className="mt-6 text-sm text-gray-500 underline hover:text-gray-900"
          >
            Go back to Upload
          </button>
        ) : (
          <button 
            onClick={() => {
              const demoImg = getDemoImage();
              setImages([demoImg], [demoImg]);
              setResults(DEMO_DATA as any);
              setScreen('mapping');
            }}
            className="mt-6 text-sm text-blue-500 underline hover:text-blue-700"
          >
            Taking too long? Skip to Demo View
          </button>
        )}
      </div>
    </div>
  );
}
