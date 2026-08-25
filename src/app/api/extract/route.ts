import { NextResponse } from 'next/server';
import { extractQuestions, extractAnswers, gradeAnswers } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const { questionImages, answerImages } = await req.json();

    if (!questionImages || !answerImages) {
      return NextResponse.json({ error: "Missing images" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
       return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 });
    }

    // Step 1: Extract questions
    console.log("Extracting questions...");
    const questions = await extractQuestions(questionImages);
    
    // Step 2: Extract answers mapped to questions
    console.log("Extracting answers...");
    const answers = await extractAnswers(answerImages, questions);
    
    // Step 3: Grade them
    console.log("Grading answers...");
    const gradingData = await gradeAnswers(questions, answers);
    
    // Combine everything into AssessmentResult
    const result = {
      questions,
      answers,
      grades: gradingData.grades,
      unansweredQuestions: gradingData.unansweredQuestions,
      unmatchedAnswers: gradingData.unmatchedAnswers
    };

    return NextResponse.json(result);
    
  } catch (error: any) {
    console.error("Extraction error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process the assessment" }, 
      { status: 500 }
    );
  }
}
