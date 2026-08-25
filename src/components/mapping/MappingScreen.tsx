"use client";

import React, { useState } from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import QuestionPanel from './QuestionPanel';
import AnswerSheetViewer from './AnswerSheetViewer';

export default function MappingScreen() {
  const { results } = useAssessment();
  const [activeTab, setActiveTab] = useState<'questions' | 'answers'>('questions');

  if (!results) return null;

  return (
    <div className="flex h-full w-full overflow-hidden bg-gray-50 p-2 md:p-4 gap-4">
      {/* Mobile Tabs */}
      <div className="md:hidden flex w-full absolute top-0 left-0 bg-white z-10 p-2 border-b">
        <div className="flex w-full bg-gray-100 rounded-full p-1">
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-full transition-colors ${activeTab === 'questions' ? 'bg-gray-800 text-white' : 'text-gray-600'}`}
            onClick={() => setActiveTab('questions')}
          >
            Questions
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-full transition-colors ${activeTab === 'answers' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'}`}
            onClick={() => setActiveTab('answers')}
          >
            Answer Sheet
          </button>
        </div>
      </div>

      {/* Left Panel - Questions */}
      <div className={`w-full md:w-[45%] lg:w-[40%] flex flex-col h-full bg-gray-50 rounded-xl overflow-hidden ${activeTab !== 'questions' ? 'hidden md:flex' : 'flex mt-14 md:mt-0'}`}>
        <QuestionPanel />
      </div>

      {/* Right Panel - Answer Sheet */}
      <div className={`w-full md:w-[55%] lg:w-[60%] flex flex-col h-full bg-gray-900 rounded-2xl overflow-hidden ${activeTab !== 'answers' ? 'hidden md:flex' : 'flex mt-14 md:mt-0'}`}>
        <AnswerSheetViewer />
      </div>
    </div>
  );
}
