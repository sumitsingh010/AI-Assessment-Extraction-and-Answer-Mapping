import * as pdfjsLib from 'pdfjs-dist';

// Configure worker to use the local copy in the public folder
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

export async function fileToBase64Images(file: File): Promise<string[]> {
  if (file.type.startsWith('image/')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve([e.target?.result as string]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  
  if (file.type === 'application/pdf') {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    const images: string[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 });
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) throw new Error("Failed to get 2d context");
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      await page.render({
        canvasContext: context,
        viewport: viewport
      } as any).promise;
      
      images.push(canvas.toDataURL('image/png'));
    }
    return images;
  }
  
  throw new Error("Unsupported file type. Please upload a PDF or Image.");
}
