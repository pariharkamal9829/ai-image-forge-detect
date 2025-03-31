
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';
import AnalysisResult, { AnalysisResultData } from '@/components/AnalysisResult';
import { analyzeImage } from '@/services/imageAnalysis';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, FileText, Image, Shield, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResultData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('image');

  const handleImageUploaded = (file: File, preview: string) => {
    setSelectedFile(file);
    setPreviewUrl(preview);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please upload an image before analyzing');
      return;
    }

    try {
      setIsAnalyzing(true);
      const analysisResult = await analyzeImage(selectedFile);
      setResult(analysisResult);
      
      // Show a notification based on the verdict
      switch (analysisResult.verdict) {
        case 'ai-generated':
          toast.warning('Analysis indicates this image was AI-generated', {
            description: `Confidence: ${analysisResult.score.toFixed(1)}%`
          });
          break;
        case 'manipulated':
          toast.error('Image manipulation detected', {
            description: `Confidence: ${analysisResult.score.toFixed(1)}%`
          });
          break;
        case 'authentic':
          toast.success('No signs of manipulation detected', {
            description: `Confidence: ${analysisResult.score.toFixed(1)}%`
          });
          break;
        case 'ai-enhanced':
          toast.info('This appears to be an AI-enhanced image', {
            description: `Confidence: ${analysisResult.score.toFixed(1)}%`
          });
          break;
        case 'inconclusive':
          toast.info('Analysis results are inconclusive', {
            description: `Confidence: ${analysisResult.score.toFixed(1)}%`
          });
          break;
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error('Analysis failed', {
        description: 'There was an error analyzing your image'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 container py-6 md:py-12">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-detector-gradient">
            Research-Grade AI & Manipulation Detection
          </h2>
          <p className="text-lg text-muted-foreground">
            Upload an image and our state-of-the-art AI will analyze it using multiple forensic techniques.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="sticky top-6 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="image">
                    <Image className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Image</span>
                  </TabsTrigger>
                  <TabsTrigger value="document" disabled>
                    <FileText className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">PDF</span>
                    <span className="ml-2 text-xs bg-muted text-muted-foreground px-1 py-0.5 rounded text-[10px]">
                      Soon
                    </span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <ImageUploader 
                onImageUploaded={handleImageUploaded} 
                isAnalyzing={isAnalyzing}
              />
              
              <div className="flex flex-col gap-4">
                <Button 
                  onClick={handleAnalyze}
                  disabled={!selectedFile || isAnalyzing}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Running Analysis...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Analyze with AI
                    </>
                  )}
                </Button>
                
                <div className="text-xs text-center text-muted-foreground">
                  By using this tool, you agree to our Terms & Privacy Policy
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            {result ? (
              <AnalysisResult result={result} />
            ) : (
              <div className="h-full flex items-center justify-center border border-dashed rounded-lg py-20 px-6 text-center bg-white">
                <div className="max-w-md">
                  <div className="mx-auto w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">AI Forensic Analysis</h3>
                  <p className="text-muted-foreground">
                    Upload an image and click "Analyze" to detect if it's been AI-generated, enhanced, or manipulated.
                  </p>
                  
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <Image className="h-4 w-4 text-orange-500" />
                        </div>
                      </div>
                      <h4 className="text-sm font-medium">AI Generation</h4>
                      <p className="text-xs text-muted-foreground">Detects images created by AI</p>
                    </div>
                    
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <Wand2 className="h-4 w-4 text-purple-500" />
                        </div>
                      </div>
                      <h4 className="text-sm font-medium">AI Enhanced</h4>
                      <p className="text-xs text-muted-foreground">Identifies AI-modified real images</p>
                    </div>
                    
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-red-500" />
                        </div>
                      </div>
                      <h4 className="text-sm font-medium">Manipulations</h4>
                      <p className="text-xs text-muted-foreground">Finds edited areas and forgeries</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Advanced Detection Technologies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Image className="h-5 w-5 text-blue-500" />
                </div>
                <h4 className="text-lg font-medium mb-2">Deep Learning Analysis</h4>
                <p className="text-muted-foreground">
                  Uses neural networks trained on millions of images to identify GAN artifacts and AI generation patterns.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Shield className="h-5 w-5 text-purple-500" />
                </div>
                <h4 className="text-lg font-medium mb-2">Frequency Analysis</h4>
                <p className="text-muted-foreground">
                  Analyzes image frequency domains to detect inconsistencies invisible to the human eye.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <FileText className="h-5 w-5 text-green-500" />
                </div>
                <h4 className="text-lg font-medium mb-2">Multi-Model Approach</h4>
                <p className="text-muted-foreground">
                  Combines multiple detection methods for maximum accuracy and detailed forensic reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
