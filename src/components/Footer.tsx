
import React from 'react';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t py-8 mt-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shield className="h-5 w-5 text-detector-blue" />
            <span className="font-semibold">AI Image Forge Detector</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Image Forge Detector. All rights reserved.
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>
            This tool uses advanced AI techniques to detect potential AI-generated or manipulated images.
            Results are provided as guidance and may not be 100% accurate as technology evolves.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
