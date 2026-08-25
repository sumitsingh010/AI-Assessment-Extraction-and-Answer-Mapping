"use client";

import React, { useState } from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ScoreBadge from './ScoreBadge';

export default function QuestionPanel() {
  const { results, selectedQuestionId, setSelectedQuestionId } = useAssessment();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  if (!results) return null;

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(expandedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedIds(newSet);
  };

  const expandAll = () => {
    if (expandedIds.size === results.questions.length) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(results.questions.map(q => q.id)));
    }
  };

  const allExpanded = expandedIds.size > 0 && expandedIds.size === results.questions.length;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-gray-50 shrink-0">
        <h2 className="text-sm font-semibold text-gray-800">Extracted Questions <span className="font-normal text-gray-500">(from question paper)</span></h2>
        <button 
          onClick={expandAll}
          className="text-xs font-medium text-gray-600 bg-white border px-3 py-1.5 rounded-full hover:bg-gray-50"
        >
          {allExpanded ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-3">
        {results.questions.map((q) => {
          const isSelected = selectedQuestionId === q.id;
          const isExpanded = expandedIds.has(q.id);
          const grade = results.grades.find(g => g.questionId === q.id);
          const isUnanswered = results.unansweredQuestions.includes(q.id);

          return (
            <div 
              key={q.id}
              onClick={() => setSelectedQuestionId(q.id)}
              className={`bg-white rounded-2xl p-4 cursor-pointer transition-all border-2 ${
                isSelected ? 'border-[#F26522] shadow-sm' : 'border-transparent shadow-sm hover:border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#333333] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {q.number}
                </div>
                
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-sm text-gray-800 leading-relaxed pr-2">
                    {q.text}
                  </p>
                  
                  {isExpanded && grade && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-4 text-sm border">
                      <p className="font-medium text-gray-900 mb-1">AI Feedback</p>
                      <p className="text-gray-600">{grade.feedback}</p>
                    </div>
                  )}
                  
                  {isExpanded && isUnanswered && (
                    <div className="mt-4 bg-red-50 rounded-lg p-4 text-sm border border-red-100">
                      <p className="text-red-600 font-medium">Not Attempted</p>
                      <p className="text-red-500 text-xs">No matching answer found in the answer sheet.</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0 pt-1">
                  {grade && <ScoreBadge score={grade.score} maxScore={q.maxMarks} />}
                  {isUnanswered && <ScoreBadge score={0} maxScore={q.maxMarks} />}
                  
                  <button 
                    onClick={(e) => toggleExpand(q.id, e)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
