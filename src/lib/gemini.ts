import { GoogleGenerativeAI } from "@google/generative-ai";
import { Question, Answer, GradingResult } from "../types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Helper to remove markdown json wrapper
const parseJSONResponse = (text: string) => {
  try {
    const clean = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(clean);
  } catch (e) {
    console.error("Failed to parse JSON:", text);
    throw new Error("Failed to parse Gemini output as JSON");
  }
};

export async function extractQuestions(imagesBase64: string[]): Promise<Question[]> {
  const parts = imagesBase64.map(base64 => ({
    inlineData: {
      data: base64.split(',')[1],
      mimeType: "image/png"
    }
  }));

  const prompt = `
    Analyze this question paper image. Extract ALL questions in order.
    For sub-parts (e.g., "11 (a)", "11 (b)"), treat each as a separate question.
    Ensure you capture the exact question number/label (e.g., "1", "11 (a)").
    Estimate maxMarks from the text if visible, otherwise use 0.
    
    Return ONLY a JSON object with this structure:
    {
      "questions": [
        {
          "id": "q1", // unique string ID
          "number": "1", // display number
          "text": "Full question text",
          "maxMarks": 2
        }
      ]
    }
  `;

  const result = await model.generateContent([prompt, ...parts]);
  const data = parseJSONResponse(result.response.text());
  return data.questions;
}

export async function extractAnswers(imagesBase64: string[], questions: Question[]): Promise<Answer[]> {
  // Since we pass all images, let's ask Gemini to find answers across them and map to questions.
  // In a real robust system, we would process page by page.
  const parts = imagesBase64.map(base64 => ({
    inlineData: {
      data: base64.split(',')[1],
      mimeType: "image/png"
    }
  }));

  const questionsContext = JSON.stringify(questions.map(q => ({ id: q.id, number: q.number })));

  const prompt = `
    Analyze these student handwritten answer sheet images.
    Here is the list of extracted questions: ${questionsContext}
    
    For each answer you identify in the images, map it to the correct questionId.
    Also, provide a rough bounding box region for the answer text relative to the page it was found on.
    
    Return ONLY a JSON object with this structure:
    {
      "answers": [
        {
          "questionId": "q1", // must match one of the provided question IDs
          "text": "The student's transcribed text",
          "regions": [
            {
              "pageIndex": 0, // 0 for first image, 1 for second, etc.
              "x": 10, // top-left X as percentage (0-100)
              "y": 20, // top-left Y as percentage (0-100)
              "width": 80, // width as percentage (0-100)
              "height": 15 // height as percentage (0-100)
            }
          ]
        }
      ]
    }
    
    Note: If an answer spans multiple pages or regions, add multiple region objects to the array.
  `;

  const result = await model.generateContent([prompt, ...parts]);
  const data = parseJSONResponse(result.response.text());
  return data.answers;
}

export async function gradeAnswers(questions: Question[], answers: Answer[]): Promise<{ grades: GradingResult[], unmatchedAnswers: Answer[], unansweredQuestions: string[] }> {
  
  const prompt = `
    You are an expert teacher grading an exam.
    
    Questions: ${JSON.stringify(questions)}
    Answers: ${JSON.stringify(answers)}
    
    For each answer, evaluate if it is correct based on the question.
    Assign a score out of the maxMarks.
    Provide constructive, encouraging feedback (1-2 sentences max per question).
    
    Identify which questions have no answers.
    Identify if any answers do not match a valid question.
    
    Return ONLY a JSON object with this structure:
    {
      "grades": [
        {
          "questionId": "q1",
          "score": 2,
          "maxScore": 2,
          "feedback": "Excellent work! You correctly identified...",
          "isCorrect": true
        }
      ],
      "unansweredQuestions": ["q2", "q3"], // IDs of questions not attempted
      "unmatchedAnswers": [] // answers that don't match any question ID
    }
  `;

  const result = await model.generateContent(prompt);
  const data = parseJSONResponse(result.response.text());
  return data;
}
