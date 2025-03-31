
import { AnalysisResultData } from "@/components/AnalysisResult";

// This is a mock implementation for demonstration
// In a real app, you'd integrate with a real AI service API
export async function analyzeImage(file: File): Promise<AnalysisResultData> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  const imageUrl = URL.createObjectURL(file);

  // Generate mock heatmap (in a real app, this would come from the API)
  const heatmap = await generateMockHeatmap(imageUrl);

  // Generate a deterministic but semi-random result based on the file name
  // This is just for demonstration purposes
  const hash = Array.from(file.name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // For demonstration, we'll create different results based on file name
  const scenarios = [
    {
      verdict: 'ai-generated',
      score: 87,
      features: [
        {
          name: 'Unnatural Textures',
          description: 'Detected unusual texture patterns common in AI-generated images',
          confidence: 92,
          type: 'artifact'
        },
        {
          name: 'Symmetry Issues',
          description: 'Found unusually perfect symmetry in facial features',
          confidence: 78,
          type: 'artifact'
        },
        {
          name: 'Unusual Artifacts',
          description: 'Detected small inconsistencies typical of AI generation',
          confidence: 85,
          type: 'artifact'
        },
        {
          name: 'Natural Elements',
          description: 'Some aspects of the image appear natural',
          confidence: 32,
          type: 'authentic'
        }
      ]
    },
    {
      verdict: 'manipulated',
      score: 76,
      features: [
        {
          name: 'Clone Stamping',
          description: 'Detected repeated patterns suggesting clone tool usage',
          confidence: 82,
          type: 'manipulation'
        },
        {
          name: 'Inconsistent Lighting',
          description: 'Shadow and lighting inconsistencies detected',
          confidence: 74,
          type: 'manipulation'
        },
        {
          name: 'Noise Patterns',
          description: 'Inconsistent noise patterns across image regions',
          confidence: 68,
          type: 'manipulation'
        },
        {
          name: 'Original Elements',
          description: 'Parts of the image appear to be original',
          confidence: 55,
          type: 'authentic'
        }
      ]
    },
    {
      verdict: 'authentic',
      score: 92,
      features: [
        {
          name: 'Natural Textures',
          description: 'Texture patterns appear natural and consistent',
          confidence: 94,
          type: 'authentic'
        },
        {
          name: 'Consistent Metadata',
          description: 'Image metadata is consistent with genuine photographs',
          confidence: 89,
          type: 'authentic'
        },
        {
          name: 'Natural Imperfections',
          description: 'Contains natural imperfections typical of real photos',
          confidence: 91,
          type: 'authentic'
        },
        {
          name: 'Potential Artifacts',
          description: 'Minor artifacts detected, but likely due to compression',
          confidence: 15,
          type: 'artifact'
        }
      ]
    },
    {
      verdict: 'inconclusive',
      score: 54,
      features: [
        {
          name: 'Mixed Signals',
          description: 'Analysis shows both natural and artificial elements',
          confidence: 58,
          type: 'artifact'
        },
        {
          name: 'Limited Reference Data',
          description: 'Insufficient reference data for conclusive analysis',
          confidence: 40,
          type: 'authentic'
        },
        {
          name: 'Possible Modifications',
          description: 'Some areas suggest minor modifications',
          confidence: 45,
          type: 'manipulation'
        },
        {
          name: 'Natural Elements',
          description: 'Several elements appear natural and consistent',
          confidence: 62,
          type: 'authentic'
        }
      ]
    }
  ];

  const scenarioIndex = hash % scenarios.length;
  const scenario = scenarios[scenarioIndex];

  return {
    originalImage: imageUrl,
    score: scenario.score,
    verdict: scenario.verdict as any,
    detectedFeatures: scenario.features,
    heatmap
  };
}

// Generate a fake heatmap for visualization purposes
async function generateMockHeatmap(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      
      // Draw transparent base
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Generate some random "hotspots" in red/yellow
      const spotCount = 3 + Math.floor(Math.random() * 5);
      
      for (let i = 0; i < spotCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 30 + Math.random() * 70;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        
        if (Math.random() > 0.5) {
          // Red spot (AI generation artifact)
          gradient.addColorStop(0, 'rgba(255,0,0,0.8)');
          gradient.addColorStop(1, 'rgba(255,0,0,0)');
        } else {
          // Yellow spot (manipulation)
          gradient.addColorStop(0, 'rgba(255,255,0,0.7)');
          gradient.addColorStop(1, 'rgba(255,255,0,0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.onerror = () => {
      // Fallback if loading image fails
      resolve('');
    };
    
    img.src = imageUrl;
  });
}
