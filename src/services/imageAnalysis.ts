
import { AnalysisResultData } from "@/components/AnalysisResult";

// Enhanced mock implementation simulating advanced AI detection techniques
// In a production environment, these would connect to real ML models
export async function analyzeImage(file: File): Promise<AnalysisResultData> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  const imageUrl = URL.createObjectURL(file);

  // Generate enhanced heatmap with multi-layer analysis
  const heatmap = await generateEnhancedHeatmap(imageUrl);

  // Generate a deterministic but semi-random result based on the file name
  // This is for demonstration purposes
  const hash = Array.from(file.name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Enhanced scenarios with more detailed analysis
  const scenarios = [
    {
      verdict: 'ai-generated',
      score: 97.8,
      features: [
        {
          name: 'GAN Fingerprint Detection',
          description: 'Identified characteristic patterns produced by GAN architectures',
          confidence: 98.3,
          type: 'artifact' as const
        },
        {
          name: 'Diffusion Model Artifacts',
          description: 'Detected noise patterns typical of diffusion-based image generation',
          confidence: 96.5,
          type: 'artifact' as const
        },
        {
          name: 'Transformer Self-Attention Patterns',
          description: 'Identified self-attention patterns used in transformer-based image generation',
          confidence: 97.8,
          type: 'artifact' as const
        },
        {
          name: 'Frequency Analysis Anomalies',
          description: 'Fourier transform analysis reveals unnatural frequency distributions',
          confidence: 95.2,
          type: 'artifact' as const
        },
        {
          name: 'Natural Elements',
          description: 'Some aspects of the image appear natural, likely used as reference',
          confidence: 22.7,
          type: 'authentic' as const
        }
      ]
    },
    {
      verdict: 'manipulated',
      score: 96.2,
      features: [
        {
          name: 'Error Level Analysis',
          description: 'Inconsistent error levels detected in compressed regions',
          confidence: 94.7,
          type: 'manipulation' as const
        },
        {
          name: 'JPEG Ghost Detection',
          description: 'Multiple compression signatures indicate manipulation',
          confidence: 92.9,
          type: 'manipulation' as const
        },
        {
          name: 'Copy-Move Forgery',
          description: 'Detected duplicated regions with slight modifications',
          confidence: 98.1,
          type: 'manipulation' as const
        },
        {
          name: 'Adversarial Perturbations',
          description: 'Subtle pixel-level changes detected in key areas',
          confidence: 89.5,
          type: 'manipulation' as const
        },
        {
          name: 'Original Elements',
          description: 'Parts of the image appear to be from the original source',
          confidence: 65.3,
          type: 'authentic' as const
        }
      ]
    },
    {
      verdict: 'authentic',
      score: 99.1,
      features: [
        {
          name: 'Natural Noise Pattern',
          description: 'Sensor noise patterns consistent with authentic camera images',
          confidence: 98.7,
          type: 'authentic' as const
        },
        {
          name: 'Consistent Metadata',
          description: 'Image metadata aligns with claimed source and parameters',
          confidence: 99.3,
          type: 'authentic' as const
        },
        {
          name: 'Natural Light Physics',
          description: 'Light interactions follow expected physical properties',
          confidence: 97.9,
          type: 'authentic' as const
        },
        {
          name: 'Optical Aberration Analysis',
          description: 'Lens distortions match expected camera characteristics',
          confidence: 99.5,
          type: 'authentic' as const
        },
        {
          name: 'Potential Compression Artifacts',
          description: 'Minor artifacts detected, but consistent with normal compression',
          confidence: 12.8,
          type: 'artifact' as const
        }
      ]
    },
    {
      verdict: 'inconclusive',
      score: 67.2,
      features: [
        {
          name: 'Mixed Analysis Signals',
          description: 'Conflicting indicators between authentic and artificial elements',
          confidence: 68.5,
          type: 'artifact' as const
        },
        {
          name: 'Insufficient Reference Data',
          description: 'Limited comparative data for this specific image type',
          confidence: 53.7,
          type: 'authentic' as const
        },
        {
          name: 'Potential Modifications',
          description: 'Some areas suggest modifications but confidence is low',
          confidence: 61.9,
          type: 'manipulation' as const
        },
        {
          name: 'Advanced Adversarial Techniques',
          description: 'Possible use of anti-forensic methods detected',
          confidence: 58.6,
          type: 'artifact' as const
        },
        {
          name: 'Natural Elements',
          description: 'Several elements appear natural and consistent',
          confidence: 73.4,
          type: 'authentic' as const
        }
      ]
    },
    {
      verdict: 'ai-enhanced',
      score: 92.6,
      features: [
        {
          name: 'Real Image Foundation',
          description: 'Base image appears to be an authentic photograph',
          confidence: 89.4,
          type: 'authentic' as const
        },
        {
          name: 'AI-Based Enhancements',
          description: 'Detected significant AI-based edits and enhancements',
          confidence: 94.8,
          type: 'artifact' as const
        },
        {
          name: 'Style Transfer Artifacts',
          description: 'Neural style transfer patterns identified',
          confidence: 93.2,
          type: 'artifact' as const
        },
        {
          name: 'Super-Resolution Upscaling',
          description: 'Evidence of AI-based resolution enhancement',
          confidence: 91.7,
          type: 'manipulation' as const
        },
        {
          name: 'Semantic Manipulations',
          description: 'AI-guided semantic modifications to original content',
          confidence: 90.5,
          type: 'manipulation' as const
        }
      ]
    }
  ];

  // Select a scenario based on the hash
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

// Generate an enhanced heatmap for visualization purposes
async function generateEnhancedHeatmap(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      
      // Draw original image as base (faded)
      ctx.globalAlpha = 0.4;
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = 1.0;
      
      // Add semi-transparent overlay
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Generate more sophisticated "hotspots" representing different analysis techniques
      // In a real implementation, these would be based on actual model attention maps
      const techniques = [
        {
          name: 'gan-fingerprint',
          color: 'rgba(255,0,0,0.8)', // Red for GAN artifacts
          count: 2 + Math.floor(Math.random() * 3),
          size: 20 + Math.random() * 50
        },
        {
          name: 'frequency-analysis',
          color: 'rgba(0,200,255,0.7)', // Cyan for frequency anomalies
          count: 1 + Math.floor(Math.random() * 2),
          size: 30 + Math.random() * 70
        },
        {
          name: 'copy-move',
          color: 'rgba(255,255,0,0.7)', // Yellow for copy-move regions
          count: 0 + Math.floor(Math.random() * 3),
          size: 15 + Math.random() * 40
        },
        {
          name: 'metadata-inconsistency',
          color: 'rgba(255,0,255,0.6)', // Magenta for metadata issues
          count: 0 + Math.floor(Math.random() * 2),
          size: 40 + Math.random() * 60
        }
      ];
      
      // Add technique names for reference
      ctx.font = '10px Arial';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 0.5;
      
      let legendY = 20;
      
      techniques.forEach(technique => {
        // Draw legend
        ctx.fillStyle = technique.color;
        ctx.fillRect(10, legendY - 7, 10, 10);
        ctx.fillStyle = 'white';
        ctx.strokeText(technique.name, 25, legendY);
        ctx.fillText(technique.name, 25, legendY);
        legendY += 15;
        
        // Draw technique-specific hotspots
        for (let i = 0; i < technique.count; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const radius = technique.size;
          
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
          gradient.addColorStop(0, technique.color);
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
          
          // For copy-move, add a second connected region
          if (technique.name === 'copy-move' && Math.random() > 0.5) {
            const x2 = Math.max(20, Math.min(canvas.width - 20, x + (Math.random() * 100 - 50)));
            const y2 = Math.max(20, Math.min(canvas.height - 20, y + (Math.random() * 100 - 50)));
            
            ctx.beginPath();
            ctx.arc(x2, y2, radius * 0.8, 0, Math.PI * 2);
            ctx.fill();
            
            // Connect with a line
            ctx.strokeStyle = technique.color;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      });
      
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.onerror = () => {
      // Fallback if loading image fails
      resolve('');
    };
    
    img.src = imageUrl;
  });
}
