import React from 'react';

interface ScoreBadgeProps {
  score: number;
  maxScore: number;
}

export default function ScoreBadge({ score, maxScore }: ScoreBadgeProps) {
  const isFullMarks = score === maxScore;
  const isZero = score === 0;
  
  let colorClass = 'text-orange-500'; // Partial
  if (isFullMarks) colorClass = 'text-green-500';
  if (isZero) colorClass = 'text-red-500';

  return (
    <div className={`font-bold text-sm ${colorClass}`}>
      {score}/{maxScore}
    </div>
  );
}
