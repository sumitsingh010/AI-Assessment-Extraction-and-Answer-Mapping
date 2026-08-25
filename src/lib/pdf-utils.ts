export async function fileToBase64Images(file: File): Promise<string[]> {
  if (file.type.startsWith('image/')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          // Scale down if too large (max 1200px width/height) to fit Vercel 4.5MB payload limit
          const MAX = 1200;
          if (width > MAX || height > MAX) {
            if (width > height) {
              height *= MAX / width;
              width = MAX;
            } else {
              width *= MAX / height;
              height = MAX;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve([canvas.toDataURL('image/jpeg', 0.7)]); // 70% quality JPEG is much smaller
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  
  if (file.type === 'application/pdf') {
    try {
      const pdfjsLib = await import('pdfjs-dist');
      if (typeof window !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
      }

      const arrayBuffer = await file.arrayBuffer();
      
      // Add a timeout to getDocument so it doesn't hang forever
      const getDocTask = pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("PDF loading timed out after 10 seconds. Please try uploading images instead.")), 10000));
      
      const pdf: any = await Promise.race([getDocTask, timeout]);
      
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
        
        images.push(canvas.toDataURL('image/jpeg', 0.7));
      }
      return images;
    } catch (e: any) {
      console.error("PDF Parsing error:", e);
      throw new Error("Failed to parse PDF. " + (e.message || "Please upload image files (.png, .jpg) instead."));
    }
  }
  
  throw new Error("Unsupported file type. Please upload a PDF or Image.");
}
