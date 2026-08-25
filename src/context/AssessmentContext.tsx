"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AssessmentResult, Question } from '../types';

export type ScreenState = 'upload' | 'extracting' | 'mapping';

interface AppState {
  screen: ScreenState;
  questionFile: File | null;
  answerFile: File | null;
  questionImages: string[];
  answerImages: string[];
  results: AssessmentResult | null;
  selectedQuestionId: string | null;
  
  setScreen: (screen: ScreenState) => void;
  setFiles: (qFile: File | null, aFile: File | null) => void;
  setImages: (qImages: string[], aImages: string[]) => void;
  setResults: (results: AssessmentResult) => void;
  setSelectedQuestionId: (id: string | null) => void;
  reset: () => void;
}

const AssessmentContext = createContext<AppState | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<ScreenState>('upload');
  const [questionFile, setQuestionFile] = useState<File | null>(null);
  const [answerFile, setAnswerFile] = useState<File | null>(null);
  const [questionImages, setQuestionImages] = useState<string[]>([]);
  const [answerImages, setAnswerImages] = useState<string[]>([]);
  const [results, setResults] = useState<AssessmentResult | null>(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  const setFiles = (qFile: File | null, aFile: File | null) => {
    setQuestionFile(qFile);
    setAnswerFile(aFile);
  };

  const setImages = (qImages: string[], aImages: string[]) => {
    setQuestionImages(qImages);
    setAnswerImages(aImages);
  };

  const reset = () => {
    setScreen('upload');
    setQuestionFile(null);
    setAnswerFile(null);
    setQuestionImages([]);
    setAnswerImages([]);
    setResults(null);
    setSelectedQuestionId(null);
  };

  return (
    <AssessmentContext.Provider
      value={{
        screen,
        questionFile,
        answerFile,
        questionImages,
        answerImages,
        results,
        selectedQuestionId,
        setScreen,
        setFiles,
        setImages,
        setResults,
        setSelectedQuestionId,
        reset,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
