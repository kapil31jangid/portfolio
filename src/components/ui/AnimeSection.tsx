import React from 'react';
import { MangaSpeedLines, KanjiEmblem } from './AnimePrimitives';

interface AnimeSectionProps {
  id: string;
  theme?: 'navy' | 'orange' | 'cream';
  kanjiSymbol?: '亀' | '悟' | '術' | '力' | '界';
  chapterNumber?: string;
  chapterTitle?: string;
  showSpeedLines?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const AnimeSection: React.FC<AnimeSectionProps> = ({
  id,
  theme = 'navy',
  kanjiSymbol = '悟',
  chapterNumber = '01',
  chapterTitle = 'CHAPTER',
  showSpeedLines = false,
  children,
  className = '',
}) => {
  const themeStyles = {
    navy: 'bg-[#10172A] text-[#FFF3D6] border-b-[4px] border-[#0B0F19]',
    orange: 'bg-[#F47C20] text-[#10172A] border-b-[4px] border-[#10172A]',
    cream: 'bg-[#FFF3D6] text-[#10172A] border-b-[4px] border-[#10172A]',
  };

  return (
    <section
      id={id}
      className={`relative py-24 md:py-36 overflow-hidden transition-colors duration-300 ${themeStyles[theme]} ${className}`}
    >
      {/* Optional speed lines */}
      {showSpeedLines && <MangaSpeedLines density="low" />}

      {/* Halftone texture overlay */}
      <div
        className={`absolute inset-0 pointer-events-none opacity-20 ${
          theme === 'cream' ? 'bg-halftone-cream' : 'bg-halftone'
        }`}
      />

      {/* Section Container */}
      <div className="section-anime relative z-10 space-y-12">
        {/* Chapter Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-[3px] border-current pb-6">
          <div className="flex items-center gap-4">
            <KanjiEmblem symbol={kanjiSymbol} size="md" />
            <div>
              <div className="font-code text-xs font-bold uppercase tracking-widest opacity-80">
                [ SOU / DBZ ARCS — VOL {chapterNumber} ]
              </div>
              <h2 className="font-manga text-4xl md:text-6xl tracking-wide uppercase leading-none mt-1">
                {chapterTitle}
              </h2>
            </div>
          </div>

          {/* Scouter Index Tag */}
          <div className="font-code font-bold text-xs px-3 py-1.5 rounded bg-[#10172A] text-[#FFD84D] border-2 border-current shadow-[3px_3px_0px_#10172A] uppercase">
            ARC_{chapterNumber} // ACT
          </div>
        </div>

        {/* Section Content Wrapper */}
        <div className="relative z-10">{children}</div>
      </div>
    </section>
  );
};
