# AI Assessment Extraction & Answer Mapping

A web application designed to help teachers automate the grading and mapping of exam papers. By uploading a question paper and a student's handwritten answer sheet, the application extracts the questions, reads the student's answers, evaluates them, and displays a side-by-side mapped view with visual highlights.

## Features

- **Side-by-Side Mapping:** View extracted questions alongside the original student answer sheet.
- **Answer Highlighting:** Click on any question to instantly highlight the exact region on the uploaded answer sheet where the student wrote their answer.
- **Automated Grading:** Utilizes vision models to evaluate answers against the questions, providing a score and brief feedback.
- **Client-Side PDF Processing:** Uploaded PDFs are rendered to images securely in the browser, removing the need for heavy backend file processing.

## Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **PDF Rendering:** pdf.js (pdfjs-dist)
- **AI Processing:** Google Gemini 2.0 Flash Vision API

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- A Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sumitsingh010/AI-Assessment-Extraction-and-Answer-Mapping.git
   cd AI-Assessment-Extraction-and-Answer-Mapping
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory and add your API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Click on the **Question Paper** upload card and select a PDF or Image.
2. Click on the **Answer Sheet** upload card and select the student's submission (PDF or Image).
3. Click **Start Mapping**. The application will extract the text, evaluate the answers, and open the Mapping UI.
