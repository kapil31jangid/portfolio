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

/** Shared chrome for the two mockup callouts. */
const CALLOUT =
  'hidden xl:flex absolute z-30 items-center gap-2 px-4 py-2 rounded-full font-code text-[11px] font-bold uppercase tracking-widest';

export const StocklyticsVisual = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = FEATURES[activeIdx];
  const Icon = current.icon;

  return (
    <div className="project-visual relative w-full max-w-6xl mx-auto my-6">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={`${CALLOUT} -top-6 -left-6`}
        style={{ backgroundColor: 'var(--t-surface)', color: 'var(--t-bg-primary)' }}
      >
        <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--t-accent-main)' }} />
        <span>[ GROUNDED RAG AI COPILOT ]</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={`${CALLOUT} -bottom-6 -right-6`}
        style={{ backgroundColor: 'var(--t-accent-cool)', color: '#FFFFFF' }}
      >
        <AlertTriangle className="w-3.5 h-3.5" />
        <span>[ REAL-TIME POS & INVENTORY ]</span>
      </motion.div>

      {/* ──── RETAIL DASHBOARD CONTAINER ──── */}
      <div
        className="relative rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: 'var(--t-bg-panel)',
          borderColor: 'var(--t-hairline)',
          color: 'var(--t-text-primary)',
        }}
      >
        {/* Window chrome */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b"
          style={{ backgroundColor: 'var(--t-bg-secondary)', borderColor: 'var(--t-hairline)' }}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--t-accent-main)' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--t-accent-cool)' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--t-hairline)' }} />
            <span
              className="ml-3 font-code text-[11px] font-bold uppercase tracking-widest"
              style={{ color: 'var(--t-text-muted)' }}
            >
              STOCKLYTICS-AI // RETAIL INTELLIGENCE PLATFORM
            </span>
          </div>
          <div
            className="font-code text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
            style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-accent-ink)' }}
          >
            ACTIVE MODULE
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
          {/* Feature selector */}
          <div
            className="lg:col-span-4 p-4 md:p-6 border-b lg:border-b-0 lg:border-r space-y-1.5"
            style={{ backgroundColor: 'var(--t-bg-secondary)', borderColor: 'var(--t-hairline)' }}
          >
            <div
              className="font-code text-[11px] font-bold uppercase tracking-widest px-3 pb-2 mb-2 border-b"
              style={{ color: 'var(--t-text-muted)', borderColor: 'var(--t-hairline)' }}
            >
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
                  className={`w-full text-left flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
                    isActive
                      ? 'border-transparent font-semibold'
                      : 'border-[var(--t-hairline)] hover:border-[var(--t-accent-main)]'
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: 'var(--t-accent-main)', color: '#FFFFFF' }
                      : { color: 'var(--t-text-secondary)' }
                  }
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <FeatIcon className="w-4 h-4 shrink-0" />
                    <span className="font-body text-sm">{feat.label}</span>
                  </span>
                  {isActive && (
                    <span
                      className="font-code text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'rgba(255,255,255,0.22)' }}
                    >
                      SELECT
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main panel */}
          <div className="lg:col-span-8 p-6 md:p-8 flex flex-col justify-between relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div
                  className="flex flex-wrap items-center justify-between gap-4 border-b pb-4"
                  style={{ borderColor: 'var(--t-hairline)' }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="p-3 rounded-xl shrink-0"
                      style={{ backgroundColor: 'var(--t-accent-main)', color: '#FFFFFF' }}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="min-w-0">
                      <h3
                        className="font-display text-2xl uppercase leading-none"
                        style={{ color: 'var(--t-heading)' }}
                      >
                        {current.label}
                      </h3>
                      <span
                        className="font-code text-[11px] font-bold uppercase tracking-widest"
                        style={{ color: 'var(--t-text-muted)' }}
                      >
                        METRIC: {current.metric}
                      </span>
                    </span>
                  </div>

                  <span
                    className="font-code text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                    style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-accent-ink)' }}
                  >
                    LIVE DATA
                  </span>
                </div>

                <p className="font-body text-base leading-relaxed max-w-xl" style={{ color: 'var(--t-text-secondary)' }}>
                  {current.detail}
                </p>

                {activeIdx === 0 && (
                  <div
                    className="p-5 rounded-xl border space-y-3"
                    style={{ backgroundColor: 'var(--t-bg-secondary)', borderColor: 'var(--t-hairline)' }}
                  >
                    <div className="font-code text-[11px] font-bold uppercase tracking-widest flex flex-wrap items-center justify-between gap-2">
                      <span className="flex items-center gap-2" style={{ color: 'var(--t-accent-ink)' }}>
                        <Bot className="w-3.5 h-3.5" />
                        GROUNDED RAG COPILOT SIMULATOR
                      </span>
                      <span style={{ color: 'var(--t-text-muted)' }}>FASTAPI + LANGCHAIN</span>
                    </div>
                    <div
                      className="font-code text-xs p-3 rounded-lg border"
                      style={{
                        backgroundColor: 'var(--t-bg-panel)',
                        borderColor: 'var(--t-hairline)',
                        color: 'var(--t-text-secondary)',
                      }}
                    >
                      <span className="font-bold" style={{ color: 'var(--t-accent-ink)' }}>
                        PROMPT:
                      </span>{' '}
                      "Which inventory items are at risk of stockout this week?"
                    </div>
                    <div
                      className="font-body text-sm p-3 rounded-lg border-l-2"
                      style={{
                        backgroundColor: 'var(--t-bg-panel)',
                        borderColor: 'var(--t-accent-main)',
                        color: 'var(--t-text-secondary)',
                      }}
                    >
                      <span className="font-bold" style={{ color: 'var(--t-cool-ink)' }}>
                        Stocklytics AI:
                      </span>{' '}
                      Basmati Rice (10kg) and Sunflower Cooking Oil (5L) will reach reorder thresholds within 36
                      hours based on current velocity (+14.2% demand spike).
                    </div>
                  </div>
                )}

                {activeIdx === 1 && (
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="p-4 rounded-xl border"
                      style={{ backgroundColor: 'var(--t-bg-secondary)', borderColor: 'var(--t-hairline)' }}
                    >
                      <div className="font-code text-[10px] uppercase tracking-widest" style={{ color: 'var(--t-text-muted)' }}>
                        TOTAL SKUS MONITORED
                      </div>
                      <div className="font-display text-2xl mt-1" style={{ color: 'var(--t-accent-main)' }}>
                        2,480 SKUS
                      </div>
                    </div>
                    <div
                      className="p-4 rounded-xl border"
                      style={{ backgroundColor: 'var(--t-bg-secondary)', borderColor: 'var(--t-hairline)' }}
                    >
                      <div className="font-code text-[10px] uppercase tracking-widest" style={{ color: 'var(--t-text-muted)' }}>
                        AUTO-REORDER TRIGGERS
                      </div>
                      <div className="font-display text-2xl mt-1" style={{ color: 'var(--t-heading)' }}>
                        14 PENDING
                      </div>
                    </div>
                  </div>
                )}

                {activeIdx === 2 && (
                  <div
                    className="p-5 rounded-xl border space-y-2 font-code text-xs"
                    style={{ backgroundColor: 'var(--t-bg-secondary)', borderColor: 'var(--t-hairline)' }}
                  >
                    <div
                      className="flex justify-between font-bold border-b pb-2"
                      style={{ color: 'var(--t-accent-ink)', borderColor: 'var(--t-hairline)' }}
                    >
                      <span>POS INVOICE #9401</span>
                      <span>TOTAL: ₹4,850.00</span>
                    </div>
                    <div className="flex justify-between" style={{ color: 'var(--t-text-secondary)' }}>
                      <span>ITEM: Organic Wheat Flour (5kg) x 2</span>
                      <span>₹850.00</span>
                    </div>
                    <div className="flex justify-between" style={{ color: 'var(--t-text-secondary)' }}>
                      <span>ITEM: Cold Pressed Mustard Oil (1L) x 4</span>
                      <span>₹1,200.00</span>
                    </div>
                    <div className="font-bold pt-1" style={{ color: 'var(--t-cool-ink)' }}>
                      ✓ GST Tax Calculated & Invoice Dispatched to WhatsApp/SMS
                    </div>
                  </div>
                )}

                {activeIdx > 2 && (
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="p-4 rounded-xl border"
                      style={{ backgroundColor: 'var(--t-bg-secondary)', borderColor: 'var(--t-hairline)' }}
                    >
                      <div className="font-code text-[10px] uppercase tracking-widest" style={{ color: 'var(--t-text-muted)' }}>
                        MODULE STATUS
                      </div>
                      <div className="font-display text-2xl mt-1" style={{ color: 'var(--t-accent-main)' }}>
                        OPERATIONAL
                      </div>
                    </div>
                    <div
                      className="p-4 rounded-xl border"
                      style={{ backgroundColor: 'var(--t-bg-secondary)', borderColor: 'var(--t-hairline)' }}
                    >
                      <div className="font-code text-[10px] uppercase tracking-widest" style={{ color: 'var(--t-text-muted)' }}>
                        LATENCY
                      </div>
                      <div className="font-display text-2xl mt-1" style={{ color: 'var(--t-heading)' }}>
                        &lt; 45ms
                      </div>
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
