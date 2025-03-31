
import React from 'react';
import { PdfAnalysisResultData } from '@/services/pdfAnalysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  AlertTriangle, Check, Info, Sparkles, Fingerprint, 
  Wand2, BookOpen, FileText, Highlighter, BarChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PdfResultProps {
  result: PdfAnalysisResultData;
  className?: string;
}

const PdfResult: React.FC<PdfResultProps> = ({ result, className }) => {
  const getVerdictDetails = () => {
    switch (result.verdict) {
      case 'ai-generated':
        return {
          color: 'bg-orange-500',
          icon: <Sparkles className="h-5 w-5" />,
          title: 'AI Generated',
          description: 'This PDF was likely created using AI document generation tools.'
        };
      case 'manipulated':
        return {
          color: 'bg-destructive',
          icon: <AlertTriangle className="h-5 w-5" />,
          title: 'Manipulated',
          description: 'This PDF shows signs of digital manipulation or forgery.'
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
          description: 'This appears to be a human-created document enhanced or modified using AI tools.'
        };
      case 'inconclusive':
      default:
        return {
          color: 'bg-gray-500',
          icon: <Info className="h-5 w-5" />,
          title: 'Inconclusive',
          description: 'Unable to determine if this PDF is AI-generated or manipulated.'
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
              <BarChart className="h-4 w-4" />
              <span>Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-1">
              <Highlighter className="h-4 w-4" />
              <span>Text Analysis</span>
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
                PDF Forensic Analysis Details
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
          
          <TabsContent value="text">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-2">Text Content Analysis</h3>
              <p className="text-sm text-muted-foreground mb-4">
                AI-powered linguistic analysis of document content
              </p>
              
              {result.textExcerpts ? (
                <div className="space-y-4">
                  {result.textExcerpts.map((excerpt, idx) => (
                    <div key={idx} className="border rounded-lg overflow-hidden">
                      <div className={cn(
                        "text-xs px-3 py-1 flex justify-between items-center text-white",
                        excerpt.aiProbability > 80 ? "bg-orange-500" : 
                        excerpt.aiProbability > 50 ? "bg-amber-500" : 
                        "bg-green-500"
                      )}>
                        <span>Text Excerpt #{idx + 1}</span>
                        <Badge variant="outline" className="bg-white/10 text-white text-[10px] h-5">
                          {excerpt.aiProbability > 80 ? "Likely AI" : 
                           excerpt.aiProbability > 50 ? "Possibly AI" : 
                           "Likely Human"}
                        </Badge>
                      </div>
                      <div className="p-3 bg-slate-50">
                        <p className="text-sm mb-2">{excerpt.text}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">AI probability:</span>
                          <span className="text-xs font-medium">{excerpt.aiProbability.toFixed(1)}%</span>
                        </div>
                        <Progress 
                          value={excerpt.aiProbability} 
                          className={cn(
                            excerpt.aiProbability > 80 ? "bg-orange-100 [&>div]:bg-orange-500" : 
                            excerpt.aiProbability > 50 ? "bg-amber-100 [&>div]:bg-amber-500" : 
                            "bg-green-100 [&>div]:bg-green-500"
                          )} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-40 flex items-center justify-center bg-slate-100">
                  <p className="text-muted-foreground text-sm">No text excerpts available</p>
                </div>
              )}
              
              <div className="mt-4 bg-slate-50 p-3 rounded-lg border">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <FileText className="h-4 w-4 text-slate-500" />
                  Text Analysis Techniques
                </h4>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• <strong>NLP-Based Detection:</strong> Uses BERT/GPT models to analyze writing patterns</p>
                  <p>• <strong>Font Consistency Analysis:</strong> Examines typographical consistency</p>
                  <p>• <strong>Semantic Coherence:</strong> Evaluates logical flow and contextual relevance</p>
                  <p>• <strong>Stylometric Analysis:</strong> Measures linguistic patterns and stylistic markers</p>
                  <p>• <strong>Cross-Reference Verification:</strong> Compares content with known sources</p>
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
                  This analysis is based on state-of-the-art research in AI-generated document detection,
                  drawing from recent publications in NLP, digital forensics, and machine learning.
                  For professional forensic analysis needs, please contact our research team.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            <strong>Research-Grade Analysis:</strong> This forensic assessment is based on state-of-the-art detection techniques including NLP analysis, font consistency verification, and metadata examination. While our methods achieve high accuracy (up to 99.9%), emerging AI technologies may develop new ways to evade detection. This analysis should be considered as one tool in a comprehensive forensic toolkit.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PdfResult;
