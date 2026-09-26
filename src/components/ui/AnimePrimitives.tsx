import React from 'react';
import { motion } from 'framer-motion';

// 1. Manga Speed Lines Overlay
export const MangaSpeedLines: React.FC<{ density?: 'low' | 'high'; className?: string }> = ({
  density = 'low',
  className = '',
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}>
      <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="speedLinesGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD447" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#F47B20" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#10182F" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g stroke="#FFD447" strokeWidth={density === 'high' ? '1.5' : '1'} opacity="0.35">
          {Array.from({ length: density === 'high' ? 36 : 20 }).map((_, i) => {
            const angle = (i * 360) / (density === 'high' ? 36 : 20);
            const rad = (angle * Math.PI) / 180;
            const x1 = 500 + Math.cos(rad) * 120;
            const y1 = 500 + Math.sin(rad) * 120;
            const x2 = 500 + Math.cos(rad) * 900;
            const y2 = 500 + Math.sin(rad) * 900;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray="8 6" />;
          })}
        </g>
      </svg>
    </div>
  );
};

// 2. Ki Aura Energy Glow Backdrop
export const KiAuraGlow: React.FC<{
  variant?: 'gold' | 'blue' | 'orange' | 'red';
  size?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}> = ({ variant = 'gold', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-48 h-48 blur-2xl',
    md: 'w-80 h-80 blur-3xl',
    lg: 'w-[500px] h-[500px] blur-[120px]',
    full: 'w-full h-full blur-[140px]',
  };

  const variantColors = {
    gold: 'bg-[#FFD447]/25 shadow-[0_0_100px_#FFD447]',
    blue: 'bg-[#35B8FF]/25 shadow-[0_0_100px_#35B8FF]',
    orange: 'bg-[#F47B20]/30 shadow-[0_0_100px_#F47B20]',
    red: 'bg-[#E34835]/25 shadow-[0_0_100px_#E34835]',
  };

  return (
    <div
      className={`absolute rounded-full pointer-events-none mix-blend-screen animate-pulse ${sizeClasses[size]} ${variantColors[variant]} ${className}`}
    />
  );
};

// 3. Comic Book Starburst / Badge
export const ComicBadge: React.FC<{
  text: string;
  variant?: 'orange' | 'gold' | 'blue' | 'cream';
  className?: string;
}> = ({ text, variant = 'gold', className = '' }) => {
  const bgVariants = {
    gold: 'bg-[#FFD447] text-[#11172C]',
    orange: 'bg-[#F47B20] text-[#FFF1CF]',
    blue: 'bg-[#35B8FF] text-[#11172C]',
    cream: 'bg-[#FFF1CF] text-[#11172C]',
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-2 px-4 py-1.5 font-manga text-lg tracking-wider border-[3px] border-[#11172C] shadow-[4px_4px_0px_#11172C] rounded-xl uppercase select-none ${bgVariants[variant]} ${className}`}
    >
      <span className="text-xs">⚡</span>
      {text}
    </motion.span>
  );
};

// 4. Martial Arts Kanji Emblem Medallion
export const KanjiEmblem: React.FC<{
  symbol?: '亀' | '悟' | '術' | '力' | '界' | '戦' | '印';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ symbol = '悟', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xl border-2',
    md: 'w-16 h-16 text-3xl border-3',
    lg: 'w-24 h-24 text-5xl border-4',
  };

  return (
    <div
      className={`rounded-full bg-[#FFF1CF] text-[#11172C] font-bold border-[#11172C] flex items-center justify-center shadow-[4px_4px_0px_#11172C] shrink-0 font-serif ${sizeClasses[size]} ${className}`}
    >
      <span>{symbol}</span>
    </div>
  );
};

// 5. Anime Mountain & Cloud Scenery SVG Silhouette
export const AnimeMountainScenery: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 1200 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-[var(--t-mountain)]"
        preserveAspectRatio="none"
      >
        <path
          d="M0 140 L0 90 L180 30 L320 85 L480 20 L650 100 L820 15 L980 75 L1200 25 L1200 140 Z"
          fill="var(--t-mountain-back)"
          opacity="0.85"
        />
        <path
          d="M0 140 L0 105 L120 60 L280 110 L420 40 L580 115 L740 45 L910 100 L1080 50 L1200 95 L1200 140 Z"
          fill="currentColor"
        />
        <ellipse cx="200" cy="45" rx="70" ry="16" fill="#FFF1CF" opacity="0.12" />
        <ellipse cx="750" cy="35" rx="90" ry="20" fill="#FFF1CF" opacity="0.12" />
      </svg>
    </div>
  );
};
