export const DEMO_DATA = {
  questions: [
    { id: "q1", number: "1", text: "Which blood vessel carries blood away from the heart?", maxMarks: 2 },
    { id: "q2", number: "2", text: "Which of the following organelles is primarily involved in photosynthesis?", maxMarks: 2 },
    { id: "q3", number: "3", text: "Explain the role of chloroplasts in photosynthesis, naming the main pigments involved.", maxMarks: 2 },
    { id: "q4", number: "4", text: "Describe the flow of blood through the human heart.", maxMarks: 2 }
  ],
  answers: [
    {
      questionId: "q1",
      text: "Arteries carry blood away from the heart.",
      regions: [{ pageIndex: 0, x: 10, y: 15, width: 80, height: 10 }]
    },
    {
      questionId: "q2",
      text: "Chloroplast is primarily involved in photosynthesis.",
      regions: [{ pageIndex: 0, x: 10, y: 35, width: 80, height: 15 }]
    },
    {
      questionId: "q3",
      text: "Chloroplasts capture light energy. The main pigment is chlorophyll.",
      regions: [{ pageIndex: 0, x: 10, y: 60, width: 80, height: 20 }]
    }
  ],
  grades: [
    { questionId: "q1", score: 2, maxScore: 2, feedback: "Correct! Arteries carry oxygenated blood away.", isCorrect: true },
    { questionId: "q2", score: 2, maxScore: 2, feedback: "Excellent work! You correctly identified the chloroplast.", isCorrect: true },
    { questionId: "q3", score: 2, maxScore: 2, feedback: "Good answer, chlorophyll is the primary pigment.", isCorrect: true },
    { questionId: "q4", score: 0, maxScore: 2, feedback: "No answer provided.", isCorrect: false }
  ],
  unansweredQuestions: ["q4"],
  unmatchedAnswers: []
};

// Generate a dummy base64 image (a simple blank/grid canvas) to serve as a demo image
export function getDemoImage() {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d')!;
  
  // Background
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 800, 1000);
  
  // Lines (like notebook paper)
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1;
  for (let i = 50; i < 1000; i += 40) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(800, i);
    ctx.stroke();
  }

  // Draw some fake answers
  ctx.fillStyle = '#1e293b';
  ctx.font = '20px cursive';
  ctx.fillText("Q1. Arteries carry blood away from the heart.", 100, 180);
  
  ctx.fillText("Q2. Chloroplast is primarily involved in", 100, 380);
  ctx.fillText("photosynthesis.", 100, 410);
  
  ctx.fillText("Q3. Chloroplasts capture light energy.", 100, 630);
  ctx.fillText("The main pigment is chlorophyll.", 100, 660);
  
  return canvas.toDataURL('image/png');
}
