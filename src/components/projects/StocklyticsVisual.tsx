import { useState } from 'react';
import { Bot, Package, CreditCard, BarChart3, BellRing, Users, Sparkles, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FEATURES = [
  { key: 'ai', label: 'AI Assistant', detail: 'Grounded RAG assistant answering operational Q&A on inventory metrics, supplier leads & sales velocity.', metric: 'Grounded LLM Engine', icon: Bot },
  { key: 'inventory', label: 'Inventory', detail: 'Real-time SKU tracking for 2,480+ items with automated low-stock reorder triggers.', metric: '2,480 Active SKUs', icon: Package },
  { key: 'billing', label: 'Smart Billing', detail: 'Instant POS barcode scanning, GST tax calculation & instant digital invoice generation.', metric: '₹142,500 Daily POS', icon: CreditCard },
  { key: 'analytics', label: 'Analytics', detail: 'Demand forecasting analytics & real-time profit margin breakdown across product categories.', metric: '+18.4% YoY Margin', icon: BarChart3 },
  { key: 'alerts', label: 'Real-time Alerts', detail: 'Instant push notifications for stock dips, margin anomalies & automated supplier reorders.', metric: '3 Active Triggers', icon: BellRing },
  { key: 'customers', label: 'Customer Mgmt', detail: 'Purchase history ledger, customer loyalty tier tracking & credit ledger.', metric: '1,240 Profiles', icon: Users },
] as const;

export const StocklyticsVisual = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = FEATURES[activeIdx];
  const Icon = current.icon;

  return (
    <div className="project-visual relative w-full max-w-6xl mx-auto my-6">
      {/* ──── FLOATING MANGA ABILITY CALLOUT BADGES ──── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="hidden xl:flex absolute -top-8 -left-8 z-30 items-center gap-2 px-4 py-2 bg-[var(--t-accent-main)] text-[var(--dbz-ink)] font-manga text-sm tracking-wider rounded-lg border-[3px] border-[var(--t-chapter-border)] shadow-[4px_4px_0px_#11172C]"
      >
        <Sparkles className="w-4 h-4 text-[var(--t-accent-ink)]" />
        <span>[ GROUNDED RAG AI COPILOT ]</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="hidden xl:flex absolute -bottom-6 -right-6 z-30 items-center gap-2 px-4 py-2 bg-[var(--dbz-blue)] text-[var(--dbz-ink)] font-manga text-sm tracking-wider rounded-lg border-[3px] border-[var(--t-chapter-border)] shadow-[4px_4px_0px_#11172C]"
      >
        <AlertTriangle className="w-4 h-4 text-[var(--t-text-primary)]" />
        <span>[ REAL-TIME POS & INVENTORY ]</span>
      </motion.div>

      {/* ──── MAIN CONCEPTUAL RETAIL DASHBOARD CONTAINER ──── */}
      <div className="relative rounded-lg md:rounded-lg bg-[var(--t-bg-panel)] border-[4px] border-[var(--t-chapter-border)] shadow-[8px_8px_0px_#11172C] overflow-hidden text-[var(--t-text-primary)]">
        {/* Window Chrome Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[var(--t-bg-secondary)] border-b-4 border-[var(--t-chapter-border)]">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#F47B20] border border-[var(--t-chapter-border)]" />
            <span className="w-3 h-3 rounded-full bg-[#FFD447] border border-[var(--t-chapter-border)]" />
            <span className="w-3 h-3 rounded-full bg-[#35B8FF] border border-[var(--t-chapter-border)]" />
            <span className="ml-3 font-code text-xs font-bold text-[var(--t-cool-ink)] uppercase tracking-wider">
              STOCKLYTICS-AI // RETAIL INTELLIGENCE PLATFORM
            </span>
          </div>
          <div className="font-manga text-sm text-[var(--t-accent-ink)] uppercase px-3 py-1 bg-[var(--t-bg-panel)] rounded-lg border-2 border-[var(--t-chapter-border)]">
            ACTIVE MODULE
          </div>
        </div>

        {/* Dashboard Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
          {/* Left Sidebar Feature Selector (6 Features) */}
          <div className="lg:col-span-4 p-4 md:p-6 bg-[var(--t-bg-secondary)]/80 border-r-4 border-[var(--t-chapter-border)] space-y-2">
            <div className="font-manga text-sm font-bold text-[var(--t-cool-ink)] uppercase tracking-widest px-3 py-1 mb-2 border-b-2 border-[#35B8FF]/20">
              FEATURE MODULES
            </div>

            {FEATURES.map((feat, idx) => {
              const FeatIcon = feat.icon;
              const isActive = idx === activeIdx;

              return (
                <button
                  key={feat.key}
                  aria-label={feat.label}
                  aria-pressed={isActive}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--t-accent-main)] text-[var(--dbz-ink)] border-[var(--t-chapter-border)] shadow-[3px_3px_0px_#FFD447] font-bold'
                      : 'bg-[var(--t-bg-panel)] text-[var(--t-text-secondary)] border-[var(--t-chapter-border)] hover:bg-[var(--t-bg-secondary)] hover:text-[var(--t-text-primary)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FeatIcon className={`w-4 h-4 ${isActive ? 'text-[var(--t-accent-ink)]' : 'text-[var(--t-cool-ink)]'}`} />
                    <span className="font-manga text-lg tracking-wider uppercase">{feat.label}</span>
                  </div>
                  {isActive && (
                    <span className="font-code text-[10px] font-bold bg-[var(--t-tag-bg)] text-[var(--t-tag-text)] px-2 py-0.5 rounded">
                      SELECT
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Main Interactive Panel */}
          <div className="lg:col-span-8 p-6 md:p-8 flex flex-col justify-between bg-halftone relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Feature Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#35B8FF]/30 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-[var(--t-accent-main)] text-[var(--dbz-ink)] border-2 border-[var(--t-chapter-border)] shadow-[2px_2px_0px_#11172C]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-manga text-3xl text-[var(--t-accent-ink)] tracking-wider uppercase">
                        {current.label}
                      </h3>
                      <span className="font-code text-xs text-[var(--t-cool-ink)] font-bold">
                        METRIC: {current.metric}
                      </span>
                    </div>
                  </div>

                  <span className="font-manga text-sm text-[var(--t-accent-ink)] px-3 py-1 bg-[var(--t-bg-secondary)] border-2 border-[var(--t-chapter-border)] rounded-lg">
                    LIVE DATA
                  </span>
                </div>

                {/* Description */}
                <p className="font-body text-base text-[var(--t-text-primary)]/90 leading-relaxed max-w-xl">
                  {current.detail}
                </p>

                {/* Interactive Simulated View Components */}
                {activeIdx === 0 && (
                  /* AI Copilot Prompt & Grounded RAG Response Box */
                  <div className="p-5 rounded-lg bg-[var(--t-bg-secondary)] border-[3px] border-[#35B8FF] shadow-[4px_4px_0px_#11172C] space-y-3">
                    <div className="font-code text-xs font-bold text-[var(--t-accent-ink)] flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-[var(--t-cool-ink)]" />
                        GROUNDED RAG COPILOT SIMULATOR
                      </span>
                      <span className="text-[var(--t-cool-ink)]">FASTAPI + LANGCHAIN</span>
                    </div>
                    <div className="font-code text-xs text-[var(--t-text-primary)] bg-[var(--t-bg-panel)] p-3 rounded-lg border border-[var(--t-divider)]/20">
                      <span className="text-[var(--t-accent-ink)] font-bold">PROMPT:</span> "Which inventory items are at risk of stockout this week?"
                    </div>
                    <div className="font-body text-sm text-[var(--t-accent-ink)] bg-[var(--t-bg-panel)] p-3 rounded-lg border-l-4 border-[#FFD447]">
                      <span className="font-bold text-[var(--t-cool-ink)]">Stocklytics AI:</span> Basmati Rice (10kg) and Sunflower Cooking Oil (5L) will reach reorder thresholds within 36 hours based on current velocity (+14.2% demand spike).
                    </div>
                  </div>
                )}

                {activeIdx === 1 && (
                  /* Inventory Metrics Grid */
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-[var(--t-bg-secondary)] border-2 border-[var(--t-divider)]/20">
                      <div className="font-code text-xs text-[var(--t-cool-ink)]">TOTAL SKUS MONITORED</div>
                      <div className="font-manga text-3xl text-[var(--t-accent-ink)] mt-1">2,480 SKUS</div>
                    </div>
                    <div className="p-4 rounded-lg bg-[var(--t-bg-secondary)] border-2 border-[var(--t-divider)]/20">
                      <div className="font-code text-xs text-[var(--t-accent-ink)]">AUTO-REORDER TRIGGERS</div>
                      <div className="font-manga text-3xl text-[var(--t-text-primary)] mt-1">14 PENDING</div>
                    </div>
                  </div>
                )}

                {activeIdx === 2 && (
                  /* POS Billing Simulation */
                  <div className="p-5 rounded-lg bg-[var(--t-bg-secondary)] border-2 border-[#F47B20] space-y-2 font-code text-xs">
                    <div className="flex justify-between text-[var(--t-accent-ink)] font-bold border-b border-[var(--t-divider)]/20 pb-2">
                      <span>POS INVOICE #9401</span>
                      <span>TOTAL: ₹4,850.00</span>
                    </div>
                    <div className="text-[var(--t-text-primary)]/80 flex justify-between">
                      <span>ITEM: Organic Wheat Flour (5kg) x 2</span>
                      <span>₹850.00</span>
                    </div>
                    <div className="text-[var(--t-text-primary)]/80 flex justify-between">
                      <span>ITEM: Cold Pressed Mustard Oil (1L) x 4</span>
                      <span>₹1,200.00</span>
                    </div>
                    <div className="text-[var(--t-cool-ink)] font-bold pt-1">
                      ✓ GST Tax Calculated & Invoice Dispatched to WhatsApp/SMS
                    </div>
                  </div>
                )}

                {activeIdx > 2 && (
                  /* Metric Overview */
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-[var(--t-bg-secondary)] border-2 border-[var(--t-divider)]/20">
                      <div className="font-code text-xs text-[var(--t-cool-ink)]">MODULE STATUS</div>
                      <div className="font-manga text-2xl text-[var(--t-accent-ink)] mt-1">OPERATIONAL</div>
                    </div>
                    <div className="p-4 rounded-lg bg-[var(--t-bg-secondary)] border-2 border-[var(--t-divider)]/20">
                      <div className="font-code text-xs text-[var(--t-accent-ink)]">LATENCY</div>
                      <div className="font-manga text-2xl text-[var(--t-text-primary)] mt-1">&lt; 45ms</div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
