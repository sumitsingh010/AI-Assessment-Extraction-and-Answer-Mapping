export interface Question {
  id: string;              // e.g., "1", "11a", "11b"
  number: string;          // Display number like "1", "11 (a)"
  text: string;            // Full question text
  maxMarks: number;        // Maximum marks for this question
}

export interface AnswerRegion {
  pageIndex: number;       // Which page of the answer sheet
  x: number;               // Top-left corner (% of page)
  y: number;               // Top-left corner (% of page)
  width: number;           // Width (% of page) 
  height: number;          // Height (% of page)
}

export interface Answer {
  questionId: string;      // Maps to Question.id
  text: string;            // Extracted answer text
  regions: AnswerRegion[]; // Can span multiple regions/pages
}

export interface GradingResult {
  questionId: string;
  score: number;
  maxScore: number;
  feedback: string;        // AI-generated feedback
  isCorrect: boolean;
}

export interface AssessmentResult {
  questions: Question[];
  answers: Answer[];
  grades: GradingResult[];
  unmatchedAnswers: Answer[];    // Answers with no matching question
  unansweredQuestions: string[]; // Question IDs with no answer
}
