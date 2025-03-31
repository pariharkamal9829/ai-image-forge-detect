
import React, { useCallback, useState } from 'react';
import { FileText, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageUploaded: (file: File, preview: string) => void;
  onPdfUploaded: (file: File, preview: string) => void;
  isAnalyzing: boolean;
  activeTab: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageUploaded, 
  onPdfUploaded,
  isAnalyzing,
  activeTab
}) => {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragging) {
      setDragging(true);
    }
  }, [dragging]);

  const processFile = useCallback((file: File) => {
    setFileName(file.name);
    
    if (file.type.startsWith('image/')) {
      // Handle image file
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result as string;
        setPreview(previewUrl);
        onImageUploaded(file, previewUrl);
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
      // Handle PDF file
      setPreview('/placeholder.svg');
      onPdfUploaded(file, '/placeholder.svg');
    } else {
      // Handle unsupported file type
      alert('Unsupported file type. Please upload an image or PDF file.');
      clearSelection();
    }
  }, [onImageUploaded, onPdfUploaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, [processFile]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  }, [processFile]);

  const clearSelection = useCallback(() => {
    setPreview(null);
    setFileName(null);
  }, []);

  const isPdfActive = activeTab === 'document';
  const acceptValue = isPdfActive ? ".pdf" : "image/*";

  return (
    <div className="w-full">
      {!preview ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 transition-colors",
            dragging ? "border-primary bg-primary/5" : "border-muted-foreground/20",
            "flex flex-col items-center justify-center text-center"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept={acceptValue}
            onChange={handleFileInputChange}
            disabled={isAnalyzing}
          />
          
          <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
            {isPdfActive ? (
              <FileText className="h-6 w-6 text-primary" />
            ) : (
              <Upload className="h-6 w-6 text-primary" />
            )}
          </div>
          
          <label
            htmlFor="file-upload"
            className="font-medium text-sm cursor-pointer text-primary hover:text-primary/80"
          >
            Click to upload
          </label>
          
          <p className="mt-1 text-xs text-muted-foreground">
            or drag and drop
          </p>
          
          <p className="mt-3 text-xs text-muted-foreground">
            {isPdfActive ? 
              "PDF (max 10MB)" : 
              "PNG, JPG, WEBP (max 5MB)"}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden bg-white">
          <div className="flex items-center justify-between px-3 py-2 bg-muted/30 border-b">
            <span className="text-xs truncate max-w-[180px]">{fileName}</span>
            {!isAnalyzing && (
              <button
                type="button"
                onClick={clearSelection}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="relative aspect-video bg-black/5 flex items-center justify-center">
            {isPdfActive ? (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <FileText className="h-12 w-12 mb-2" />
                <span className="text-xs">PDF Document</span>
              </div>
            ) : (
              <img
                src={preview}
                alt="Upload preview"
                className="object-contain w-full h-full"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
