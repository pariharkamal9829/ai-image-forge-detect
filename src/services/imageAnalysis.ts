
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
          type: 'artifact' as const
        },
        {
          name: 'Facial Symmetry Anomalies',
          description: 'Found unusually perfect symmetry in facial features',
          confidence: 78,
          type: 'artifact' as const
        },
        {
          name: 'GAN Fingerprinting',
          description: 'Detected characteristic patterns of GAN-based generators',
          confidence: 85,
          type: 'artifact' as const
        },
        {
          name: 'Frequency Domain Patterns',
          description: 'Identified unusual frequency domain signatures typical of AI generation',
          confidence: 88,
          type: 'artifact' as const
        },
        {
          name: 'Natural Elements',
          description: 'Some aspects of the image appear natural',
          confidence: 32,
          type: 'authentic' as const
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
          type: 'manipulation' as const
        },
        {
          name: 'Inconsistent Lighting',
          description: 'Shadow and lighting inconsistencies detected',
          confidence: 74,
          type: 'manipulation' as const
        },
        {
          name: 'Pixel Inconsistency',
          description: 'Pixel-level analysis reveals tampering in specific regions',
          confidence: 68,
          type: 'manipulation' as const
        },
        {
          name: 'Error Level Analysis',
          description: 'Compression artifacts show inconsistent error levels',
          confidence: 79,
          type: 'manipulation' as const
        },
        {
          name: 'Original Elements',
          description: 'Parts of the image appear to be original',
          confidence: 55,
          type: 'authentic' as const
        }
      ]
    },
    {
      verdict: 'authentic',
      score: 92,
      features: [
        {
          name: 'Natural Textures',
          description: 'Texture patterns appear natural and consistent with optical cameras',
          confidence: 94,
          type: 'authentic' as const
        },
        {
          name: 'Consistent Metadata',
          description: 'Image metadata is consistent with genuine photographs',
          confidence: 89,
          type: 'authentic' as const
        },
        {
          name: 'Natural Imperfections',
          description: 'Contains natural imperfections typical of real photos',
          confidence: 91,
          type: 'authentic' as const
        },
        {
          name: 'Noise Distribution',
          description: 'Camera sensor noise pattern analysis indicates authentic source',
          confidence: 93,
          type: 'authentic' as const
        },
        {
          name: 'Potential Artifacts',
          description: 'Minor artifacts detected, but likely due to compression',
          confidence: 15,
          type: 'artifact' as const
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
          type: 'artifact' as const
        },
        {
          name: 'Limited Reference Data',
          description: 'Insufficient reference data for conclusive analysis',
          confidence: 40,
          type: 'authentic' as const
        },
        {
          name: 'Partial Diffusion Model Patterns',
          description: 'Some areas match patterns from diffusion models, but inconclusive',
          confidence: 45,
          type: 'manipulation' as const
        },
        {
          name: 'JPEG Ghost Analysis',
          description: 'Some ghost artifacts detected, but results are inconclusive',
          confidence: 52,
          type: 'manipulation' as const
        },
        {
          name: 'Natural Elements',
          description: 'Several elements appear natural and consistent',
          confidence: 62,
          type: 'authentic' as const
        }
      ]
    }
  ];

  // Adding a new category for AI-enhanced images (mixed authentic and AI)
  scenarios.push({
    verdict: 'ai-generated',
    score: 79,
    features: [
      {
        name: 'Style Transfer Analysis',
        description: 'Detected patterns consistent with neural style transfer algorithms',
        confidence: 86,
        type: 'artifact' as const
      },
      {
        name: 'Diffusion Model Fingerprints',
        description: 'Found characteristic signatures of diffusion-based generation',
        confidence: 91,
        type: 'artifact' as const
      },
      {
        name: 'Transformer Patterns',
        description: 'Detected self-attention patterns typical in transformer-based image generation',
        confidence: 82,
        type: 'artifact' as const
      },
      {
        name: 'Base Image Elements',
        description: 'Some elements appear to originate from a real photograph',
        confidence: 54,
        type: 'authentic' as const
      },
      {
        name: 'Edge Consistency',
        description: 'Edge analysis shows some unnatural transitions between elements',
        confidence: 76,
        type: 'manipulation' as const
      }
    ]
  });

  const scenarioIndex = hash % scenarios.length;
  const scenario = scenarios[scenarioIndex];

  return {
    originalImage: imageUrl,
    score: scenario.score,
    verdict: scenario.verdict as "ai-generated" | "manipulated" | "authentic" | "inconclusive",
    detectedFeatures: scenario.features,
    heatmap
  };
}

// Generate a more advanced heatmap for visualization purposes
async function generateMockHeatmap(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      
      // Draw original image with reduced opacity
      ctx.globalAlpha = 0.2;
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = 1.0;
      
      // Generate more detailed "hotspots" based on pseudo-analysis
      const spotCount = 4 + Math.floor(Math.random() * 6);
      
      // Colors for different types of detections
      const colorMap = {
        aiGenerated: { color: 'rgba(255,0,0,0.7)', edgeColor: 'rgba(255,0,0,0.9)' },
        manipulation: { color: 'rgba(255,255,0,0.6)', edgeColor: 'rgba(255,200,0,0.8)' },
        natural: { color: 'rgba(0,255,0,0.5)', edgeColor: 'rgba(0,200,0,0.7)' },
        uncertain: { color: 'rgba(0,0,255,0.5)', edgeColor: 'rgba(0,0,200,0.7)' }
      };
      
      for (let i = 0; i < spotCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 30 + Math.random() * 80;
        
        const types = ['aiGenerated', 'manipulation', 'natural', 'uncertain'];
        const selectedType = types[Math.floor(Math.random() * types.length)];
        const colorInfo = colorMap[selectedType as keyof typeof colorMap];
        
        // Create radial gradient for highlighting
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, colorInfo.color);
        gradient.addColorStop(0.8, colorInfo.color.replace(')', ', 0.4)'));
        gradient.addColorStop(1, colorInfo.color.replace(')', ', 0)'));
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add borders to highlight important areas
        ctx.strokeStyle = colorInfo.edgeColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.8, 0, Math.PI * 2);
        ctx.stroke();
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
