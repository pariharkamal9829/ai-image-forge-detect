
import React, { useState, useCallback } from 'react';
import { Upload, FileImage, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onImageUploaded: (file: File, preview: string) => void;
  className?: string;
  isAnalyzing?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageUploaded,
  className,
  isAnalyzing = false 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  }, []);

  const handleFile = useCallback((file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast.error('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File is too large! Please upload an image smaller than 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const previewUrl = e.target?.result as string;
      setPreview(previewUrl);
      setSelectedFile(file);
      onImageUploaded(file, previewUrl);
    };
    reader.readAsDataURL(file);
  }, [onImageUploaded]);

  const clearSelection = useCallback(() => {
    setPreview(null);
    setSelectedFile(null);
  }, []);

  return (
    <Card className={cn("p-6", className)}>
      {!preview ? (
        <div 
          className={cn(
            "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition-all",
            dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/30",
            isAnalyzing ? "opacity-50 pointer-events-none" : ""
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Upload an image to analyze</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md">
            Drag and drop an image here, or click to browse. We'll analyze it for AI-generated content or manipulations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              disabled={isAnalyzing}
              className="relative overflow-hidden"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <FileImage className="mr-2 h-4 w-4" />
              Select Image File
            </Button>
            <input 
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
              disabled={isAnalyzing}
            />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Supports JPEG, PNG, WebP, GIF (non-animated) up to 10MB
          </p>
        </div>
      ) : (
        <div className="relative">
          {isAnalyzing && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-lg z-10">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <p className="text-sm font-medium">Analyzing image...</p>
              </div>
            </div>
          )}
          <div className="relative mb-4">
            <button 
              onClick={clearSelection}
              className="absolute top-2 right-2 p-1 bg-background/80 rounded-full hover:bg-background transition-colors"
              disabled={isAnalyzing}
            >
              <X className="h-5 w-5" />
            </button>
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-auto max-h-[50vh] object-contain rounded-lg" 
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{selectedFile?.name}</p>
              <p className="text-xs text-muted-foreground">
                {selectedFile && (selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              variant="outline"
              size="sm"
              disabled={isAnalyzing}
            >
              Change Image
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ImageUploader;
