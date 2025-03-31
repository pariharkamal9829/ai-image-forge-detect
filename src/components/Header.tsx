
import React from 'react';
import { Shield, Search, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("w-full py-4 bg-gradient-to-r from-detector-blue to-detector-teal", className)}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-white" />
          <h1 className="text-2xl font-bold text-white">AI Image Forge Detector</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-white/90">
            <Search className="h-4 w-4" />
            <span className="text-sm">Detect AI Manipulation & Forgery</span>
          </div>
          <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
            <AlertTriangle className="h-4 w-4 text-yellow-200" />
            <span className="text-sm font-medium text-white">Verify Before You Trust</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
