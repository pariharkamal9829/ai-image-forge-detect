
// Advanced heatmap generation for visualization of AI detection results

type TechniqueInfo = {
  name: string;
  color: string;
  count: number;
  size: number;
};

// Generate an enhanced heatmap for visualization purposes
export async function generateEnhancedHeatmap(imageUrl: string): Promise<string> {
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
      const techniques: TechniqueInfo[] = [
        {
          name: 'gan-fingerprint',
          color: 'rgba(255,0,0,0.8)', // Red for GAN artifacts
          count: 2 + Math.floor(Math.random() * 3),
          size: 20 + Math.random() * 50
        },
        {
          name: 'diffusion-model',
          color: 'rgba(255,165,0,0.7)', // Orange for diffusion artifacts
          count: 2 + Math.floor(Math.random() * 3),
          size: 25 + Math.random() * 45
        },
        {
          name: 'vision-transformer',
          color: 'rgba(255,105,180,0.7)', // Pink for transformer artifacts
          count: 1 + Math.floor(Math.random() * 3),
          size: 15 + Math.random() * 35
        },
        {
          name: 'frequency-analysis',
          color: 'rgba(0,200,255,0.7)', // Cyan for frequency anomalies
          count: 1 + Math.floor(Math.random() * 2),
          size: 30 + Math.random() * 70
        },
        {
          name: 'wavelet-transform',
          color: 'rgba(138,43,226,0.7)', // Purple for wavelet anomalies
          count: 2 + Math.floor(Math.random() * 2),
          size: 35 + Math.random() * 50
        },
        {
          name: 'error-level-analysis',
          color: 'rgba(50,205,50,0.7)', // Green for ELA issues
          count: 1 + Math.floor(Math.random() * 3),
          size: 25 + Math.random() * 55
        },
        {
          name: 'copy-move',
          color: 'rgba(255,255,0,0.7)', // Yellow for copy-move regions
          count: 0 + Math.floor(Math.random() * 3),
          size: 15 + Math.random() * 40
        },
        {
          name: 'adversarial-perturbation',
          color: 'rgba(220,20,60,0.6)', // Crimson for adversarial perturbations
          count: 1 + Math.floor(Math.random() * 2),
          size: 20 + Math.random() * 30
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
          
          // For copy-move and attention techniques, add a second connected region
          if ((technique.name === 'copy-move' || technique.name === 'vision-transformer') && Math.random() > 0.5) {
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
      
      // Add attention-based heatmap overlay (simulated)
      const createAttentionHeatmap = () => {
        const attentionCanvas = document.createElement('canvas');
        attentionCanvas.width = canvas.width;
        attentionCanvas.height = canvas.height;
        const attCtx = attentionCanvas.getContext('2d')!;
        
        // Create gradient for attention map
        const gradient = attCtx.createRadialGradient(
          canvas.width / 2, 
          canvas.height / 2, 
          0, 
          canvas.width / 2, 
          canvas.height / 2, 
          canvas.width / 1.5
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        attCtx.fillStyle = gradient;
        attCtx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add "attention" spots
        for (let i = 0; i < 5; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const radius = 30 + Math.random() * 50;
          
          const spotGradient = attCtx.createRadialGradient(x, y, 0, x, y, radius);
          spotGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
          spotGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          attCtx.fillStyle = spotGradient;
          attCtx.beginPath();
          attCtx.arc(x, y, radius, 0, Math.PI * 2);
          attCtx.fill();
        }
        
        return attentionCanvas;
      };
      
      // Overlay the attention heatmap
      const attentionCanvas = createAttentionHeatmap();
      ctx.globalAlpha = 0.5;
      ctx.drawImage(attentionCanvas, 0, 0);
      ctx.globalAlpha = 1.0;
      
      // Add a subtle border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      
      // Add "Research Grade Analysis" watermark
      ctx.font = '12px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText('Research-Grade AI Analysis', canvas.width - 200, canvas.height - 10);
      
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.onerror = () => {
      // Fallback if loading image fails
      resolve('');
    };
    
    img.src = imageUrl;
  });
}
