import React, { useCallback } from 'react';
import { Upload, X } from 'lucide-react';

interface FileUploadCardProps {
  title: React.ReactNode;
  file: File | null;
  onFileSelect: (file: File | null) => void;
  accept?: string;
}

export default function FileUploadCard({ title, file, onFileSelect, accept = "application/pdf,image/png,image/jpeg" }: FileUploadCardProps) {
  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div 
      className="flex-1 min-h-[160px] border-2 border-dashed border-gray-200 rounded-2xl bg-white hover:bg-gray-50 hover:border-gray-300 transition-all flex flex-col items-center justify-center p-6 relative cursor-pointer group"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <input 
        type="file" 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
        onChange={onChange}
        accept={accept}
      />
      
      {file ? (
        <div className="flex flex-col items-center z-10 w-full relative">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFileSelect(null);
            }}
            className="absolute -top-2 -right-2 p-1 bg-white shadow-sm border rounded-full hover:bg-gray-100 z-20"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3">
            <Upload className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-gray-900 text-center truncate w-full px-4">{file.name}</p>
          <p className="text-xs text-gray-500 mt-1">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center z-10 pointer-events-none">
          <div className="w-10 h-10 bg-gray-50 text-gray-600 rounded-md flex items-center justify-center mb-4 border group-hover:bg-white transition-colors">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-base font-medium text-gray-700 mb-1">{title}</p>
          <p className="text-xs text-gray-400">Max 10MB</p>
        </div>
      )}
    </div>
  );
}
