import { useState } from 'react';
import { Mail, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

/* ────────────────────────────────────────────
   SpiderAssistant — floating comic chat widget.
   Opens a panel with quick links to sections,
   contact, and socials. Styled like a comic
   speech bubble with a spider mascot head.
   ──────────────────────────────────────────── */

interface QuickLink {
  label: string;
  href: string;
  icon: React.ElementType;
}

const LINKS: QuickLink[] = [
  { label: 'Origin', href: '#about', icon: Menu },
  { label: 'Powers', href: '#skills', icon: X },
  { label: 'Missions', href: '#work', icon: Mail },
  { label: 'Experience', href: '#journey', icon: LinkedinIcon },
  { label: 'Contact', href: '#contact', icon: ArrowUpRight },
];

export function SpiderAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-6 bottom-6 z-[100]">
      {/* Toggle bubble */}
      <button
        onClick={() => {
          setOpen(!open);
          if (!open) new AudioContext().resume();
        }}
        className="relative flex items-center justify-center w-20 h-20 rounded-full border-4 border-black bg-[#EF3B2D] text-white shadow-[0_6px_0_#000000] hover:shadow-[0_8px_0_#000000] transition-all active:scale-95"
        aria-label={open ? 'Close assistant' : 'Open assistant'}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
        >
          <span className="font-display font-bold text-[10px]">🕷</span>
        </motion.div>
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-4 border-[#EF3B2D] flex items-center justify-center text-[10px] font-bold hidden md:flex">
          NEW
        </span>
      </button>

      {/* Chat panel */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 320, damping: 25 }}
        className="absolute right-0 bottom-[90px] w-80 comic-panel comic-panel-hover flex flex-col"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(239,59,45,0.15) 0%, transparent 70%)',
        }}
      >
        {/* Header */}
        <div className="p-4 border-b-4 border-black bg-[#EF3B2D] text-white flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
            <span className="font-display font-bold text-[11px]">🕷</span>
          </div>
          <div>
            <div className="font-display font-bold text-sm tracking-tighter">SPIDER<br/>ASSISTANT</div>
            <div className="font-code text-[10px] opacity-90">HELP DESK ACTIVE</div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto pr-2">
          <div className="font-display font-bold text-xs text-[#EF3B2D] tracking-widest uppercase">
            QUICK LINKS
          </div>
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 p-2.5 rounded-4 border-2 border-black bg-white hover:bg-[#F5EFE4] transition-colors group"
            >
              <link.icon className="w-4 h-4 text-[#EF3B2D] group-hover:text-[#B71C1C]" />
              <span className="font-code text-xs font-bold tracking-widest">{link.label}</span>
            </a>
          ))}
          <div className="pt-2 border-t-2 border-black">
            <div className="font-display font-bold text-xs text-[#EF3B2D] tracking-widest uppercase mb-2">
              CONTACT
            </div>
            <a
              href="mailto:kapil31jangid@gmail.com"
              className="flex items-center gap-2 p-2.5 rounded-4 border-2 border-black bg-white hover:bg-[#F5EFE4] transition-colors group"
            >
              <Mail className="w-4 h-4 text-[#EF3B2D] group-hover:text-[#B71C1C]" />
              <span className="font-code text-xs font-bold tracking-widest">THWIP ME A MAIL</span>
            </a>
          </div>
          <div className="flex gap-2 pt-2 border-t-2 border-black">
            <a
              href="https://github.com/kapil31jangid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-4 border-2 border-black bg-white hover:bg-[#F5EFE4] transition-colors group"
            >
              <GithubIcon className="w-5 h-5 text-[#EF3B2D] group-hover:text-[#B71C1C]" />
            </a>
            <a
              href="https://linkedin.com/in/kapil31jangid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-4 border-2 border-black bg-white hover:bg-[#F5EFE4] transition-colors group"
            >
              <LinkedinIcon className="w-5 h-5 text-[#EF3B2D] group-hover:text-[#B71C1C]" />
            </a>
          </div>
        </div>

        {/* Tail */}
        <div className="absolute bottom-0 right-6 w-0 h-0 border-l-8 border-t-8 border-transparent border-[#EF3B2D] mb-[-8px]" />
      </motion.div>
    </div>
  );
}
