import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Check, X, Info, Sparkles, Fingerprint, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
            {result.score}% {result.verdict === 'authentic' ? 'Authentic' : 'Confidence'}
          </Badge>
        </div>
        <p className="text-sm opacity-90">{verdict.description}</p>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Fingerprint className="h-5 w-5 text-muted-foreground" />
              Analysis Details
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
                    <span className="text-sm">{feature.confidence}%</span>
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
          
          <div>
            <h3 className="text-lg font-medium mb-4">Advanced Visual Analysis</h3>
            
            <div className="space-y-4">
              {result.heatmap && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Multi-layer forensic analysis highlighting potential AI artifacts and manipulations
                  </p>
                  <div className="relative rounded-lg overflow-hidden border">
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
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            <strong>Research-Grade Analysis:</strong> This forensic assessment is based on state-of-the-art AI detection techniques including frequency analysis, GAN fingerprinting, and error level analysis. While our methods achieve high accuracy, emerging AI technologies may evade detection. This analysis should be considered as one forensic tool among many.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisResult;
