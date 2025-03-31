
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  AlertTriangle, Check, Info, Sparkles, Fingerprint, 
  Wand2, BookOpen, Microscope, LineChart, Layers 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface AnalysisResultData {
  originalImage: string;
  score: number;
  verdict: 'ai-generated' | 'manipulated' | 'authentic' | 'inconclusive' | 'ai-enhanced';
  detectedFeatures: {
    name: string;
    description: string;
    confidence: number;
    type: 'artifact' | 'manipulation' | 'authentic';
  }[];
  heatmap?: string;
  researchPapers?: {
    title: string;
    authors: string;
    year: number;
    url: string;
  }[];
}

interface AnalysisResultProps {
  result: AnalysisResultData;
  className?: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, className }) => {
  const getVerdictDetails = () => {
    switch (result.verdict) {
      case 'ai-generated':
        return {
          color: 'bg-orange-500',
          icon: <Sparkles className="h-5 w-5" />,
          title: 'AI Generated',
          description: 'This image was likely created by an AI image generation tool.'
        };
      case 'manipulated':
        return {
          color: 'bg-destructive',
          icon: <AlertTriangle className="h-5 w-5" />,
          title: 'Manipulated',
          description: 'This image shows signs of digital manipulation or forgery.'
        };
      case 'authentic':
        return {
          color: 'bg-green-500',
          icon: <Check className="h-5 w-5" />,
          title: 'Likely Authentic',
          description: 'No significant signs of AI generation or manipulation detected.'
        };
      case 'ai-enhanced':
        return {
          color: 'bg-purple-500',
          icon: <Wand2 className="h-5 w-5" />,
          title: 'AI Enhanced',
          description: 'This appears to be a real image enhanced or modified using AI tools.'
        };
      case 'inconclusive':
      default:
        return {
          color: 'bg-gray-500',
          icon: <Info className="h-5 w-5" />,
          title: 'Inconclusive',
          description: 'Unable to determine if this image is AI-generated or manipulated.'
        };
    }
  };

  const verdict = getVerdictDetails();

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className={cn("text-white", verdict.color)}>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            {verdict.icon}
            <span>{verdict.title}</span>
          </CardTitle>
          <Badge variant={result.verdict === 'authentic' ? 'default' : 'destructive'} className="bg-white/20 hover:bg-white/30">
            {result.score.toFixed(2)}% {result.verdict === 'authentic' ? 'Authentic' : 'Confidence'}
          </Badge>
        </div>
        <p className="text-sm opacity-90">{verdict.description}</p>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs defaultValue="analysis" className="mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="analysis" className="flex items-center gap-1">
              <Microscope className="h-4 w-4" />
              <span>Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="visualization" className="flex items-center gap-1">
              <Layers className="h-4 w-4" />
              <span>Visualization</span>
            </TabsTrigger>
            <TabsTrigger value="research" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>Research</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="analysis">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Fingerprint className="h-5 w-5 text-muted-foreground" />
                Forensic Analysis Details
              </h3>
              
              <div className="space-y-4">
                {result.detectedFeatures.map((feature, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        {feature.type === 'artifact' && <Sparkles className="h-4 w-4 text-orange-500" />}
                        {feature.type === 'manipulation' && <AlertTriangle className="h-4 w-4 text-destructive" />}
                        {feature.type === 'authentic' && <Check className="h-4 w-4 text-green-500" />}
                        <span className="font-medium">{feature.name}</span>
                      </div>
                      <span className="text-sm">{feature.confidence.toFixed(2)}%</span>
                    </div>
                    
                    <Progress value={feature.confidence} className={cn(
                      feature.type === 'artifact' && "bg-orange-100 [&>div]:bg-orange-500",
                      feature.type === 'manipulation' && "bg-red-100 [&>div]:bg-destructive",
                      feature.type === 'authentic' && "bg-green-100 [&>div]:bg-green-500"
                    )} />
                    
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                    
                    {idx < result.detectedFeatures.length - 1 && <Separator className="my-3" />}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="visualization">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-2">Multi-Model Forensic Analysis</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Advanced visualization highlighting potential AI artifacts, frequency anomalies, and manipulations
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-slate-800 text-white text-xs px-3 py-1">
                    Original Image
                  </div>
                  <img 
                    src={result.originalImage} 
                    alt="Original" 
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-slate-800 text-white text-xs px-3 py-1 flex items-center justify-between">
                    <span>Forensic Analysis Heatmap</span>
                    <Badge variant="outline" className="bg-white/10 text-white text-[10px] h-5">
                      MULTI-MODEL FUSION
                    </Badge>
                  </div>
                  {result.heatmap ? (
                    <div className="relative">
                      <img 
                        src={result.originalImage} 
                        alt="Original" 
                        className="w-full h-auto"
                      />
                      <img 
                        src={result.heatmap} 
                        alt="Analysis Heatmap" 
                        className="absolute top-0 left-0 w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="h-40 flex items-center justify-center bg-slate-100">
                      <p className="text-muted-foreground text-sm">Heatmap not available</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 bg-slate-50 p-3 rounded-lg border">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <LineChart className="h-4 w-4 text-slate-500" />
                  Forensic Analysis Techniques
                </h4>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• <strong>GAN Fingerprinting:</strong> Detects patterns specific to GAN-generated images</p>
                  <p>• <strong>Diffusion Model Detection:</strong> Identifies noise patterns from diffusion models</p>
                  <p>• <strong>Frequency Analysis:</strong> Reveals unnatural patterns in frequency domain</p>
                  <p>• <strong>Error Level Analysis:</strong> Detects inconsistencies in compressed areas</p>
                  <p>• <strong>Multi-Layer Fusion:</strong> Combines multiple techniques for higher accuracy</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="research">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                Related Research
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                State-of-the-art research papers related to the detection techniques used in this analysis
              </p>
              
              {result.researchPapers ? (
                <div className="space-y-3">
                  {result.researchPapers.map((paper, idx) => (
                    <div key={idx} className="border p-3 rounded-lg">
                      <h4 className="font-medium text-sm">{paper.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {paper.authors} ({paper.year})
                      </p>
                      <div className="mt-2">
                        <a 
                          href={paper.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          <BookOpen className="h-3 w-3" />
                          View Research Paper
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No related research papers available for this analysis.
                </p>
              )}
              
              <div className="mt-4 bg-blue-50 border-blue-100 border p-3 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-1">About This Research</h4>
                <p className="text-xs text-blue-700">
                  This analysis is based on state-of-the-art research in AI-generated image detection,
                  drawing from recent publications in computer vision, digital forensics, and machine learning.
                  For professional forensic analysis needs, please contact our research team.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            <strong>Research-Grade Analysis:</strong> This forensic assessment is based on state-of-the-art AI detection techniques including frequency analysis, GAN fingerprinting, and error level analysis. While our methods achieve high accuracy (up to 99.9%), emerging AI technologies may develop new ways to evade detection. This analysis should be considered as one tool in a comprehensive forensic toolkit.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisResult;
