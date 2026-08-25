"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AnswerSheetViewer() {
  const { answerImages, results, selectedQuestionId } = useAssessment();
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!answerImages || answerImages.length === 0 || !results) return null;

  const currentImage = answerImages[currentPage];
  
  // Find answers for the current page
  const pageAnswers = results.answers.filter(a => 
    a.regions.some(r => r.pageIndex === currentPage)
  );

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-2xl overflow-hidden relative text-white">
      {/* Header toolbar */}
      <div className="flex items-center justify-between p-3 bg-[#2a2a2a] shrink-0 border-b border-[#333]">
        <span className="text-sm font-medium">Answer Sheet</span>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-[#1a1a1a] rounded-lg p-1">
            <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-1 hover:bg-[#333] rounded">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs px-2 min-w-[3rem] text-center">{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="p-1 hover:bg-[#333] rounded">
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center bg-[#1a1a1a] rounded-lg p-1 text-sm">
            <button 
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="p-1 hover:bg-[#333] rounded disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs px-2 whitespace-nowrap">Page {currentPage + 1} of {answerImages.length}</span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(answerImages.length - 1, p + 1))}
              disabled={currentPage === answerImages.length - 1}
              className="p-1 hover:bg-[#333] rounded disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Viewer Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto flex items-start justify-center p-4 bg-[#1e1e1e]"
      >
        <div 
          className="relative origin-top-left transition-transform duration-200"
          style={{ 
            transform: `scale(${zoom / 100})`, 
            transformOrigin: 'top center' 
          }}
        >
          <img 
            src={currentImage} 
            alt={`Answer sheet page ${currentPage + 1}`} 
            className="max-w-none shadow-xl bg-white"
            style={{ width: '800px' }} // Fixed base width for percentage mapping
          />
          
          {/* Highlight Overlays */}
          {pageAnswers.map((ans, idx) => {
            const isSelected = selectedQuestionId === ans.questionId;
            const qObj = results.questions.find(q => q.id === ans.questionId);
            const qNum = qObj ? qObj.number : "?";
            
            return ans.regions
              .filter(r => r.pageIndex === currentPage)
              .map((r, rIdx) => (
                <div 
                  key={`${ans.questionId}-${idx}-${rIdx}`}
                  className={`absolute border-2 rounded-md transition-all duration-300 ${
                    isSelected 
                      ? 'border-green-400 bg-green-400/20 shadow-[0_0_15px_rgba(74,222,128,0.5)] z-10' 
                      : 'border-transparent hover:border-gray-300/50 hover:bg-gray-300/10 z-0'
                  }`}
                  style={{
                    left: `${r.x}%`,
                    top: `${r.y}%`,
                    width: `${r.width}%`,
                    height: `${r.height}%`
                  }}
                >
                  {/* Label badge */}
                  <div className={`absolute -top-3 -left-3 rounded-full text-[10px] font-bold px-2 py-0.5 shadow-sm transition-colors ${
                    isSelected ? 'bg-green-500 text-white' : 'bg-gray-800/80 text-white'
                  }`}>
                    Q{qNum}
                  </div>
                </div>
              ));
          })}
        </div>
      </div>
    </div>
  );
}
