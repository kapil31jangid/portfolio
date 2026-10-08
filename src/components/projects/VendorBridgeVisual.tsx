import { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { step: 1, title: 'Vendor', code: '01', detail: 'Vendor onboarding, compliance checks, tax registration verification & KYC documentation.' },
  { step: 2, title: 'RFQ', code: '02', detail: 'Automated Request For Quotation generated with specifications & dispatched to verified vendors.' },
  { step: 3, title: 'Quotation', code: '03', detail: 'Sealed vendor bids submitted with line-item pricing breakdowns and delivery lead times.' },
  { step: 4, title: 'Comparison', code: '04', detail: 'Automated side-by-side price, SLA, warranty, and lead-time evaluation matrix.' },
  { step: 5, title: 'Approval', code: '05', detail: 'Role-based multi-tier sign-off workflow backed by JWT security & audit trails.' },
  { step: 6, title: 'Purchase Order', code: '06', detail: 'PO document auto-generated and dispatched directly to winning vendor endpoint.' },
  { step: 7, title: 'Invoice', code: '07', detail: 'Three-way invoice matching (PO, Receipt, Invoice) with immutable audit logging.' },
];

/** Inset panel used for the step-4 matrix, the step-5 stack and the audit line. */
const PANEL = {
  backgroundColor: 'var(--t-bg-secondary)',
  borderColor: 'var(--t-hairline)',
  color: 'var(--t-text-secondary)',
} as const;

export const VendorBridgeVisual = () => {
  const [activeStep, setActiveStep] = useState(1);
  const current = STEPS.find((s) => s.step === activeStep) || STEPS[0];

  return (
    <div className="project-visual relative w-full max-w-6xl mx-auto my-6">
      <div
        className="relative rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: 'var(--t-card-bg)',
          color: 'var(--t-text-primary)',
          borderColor: 'var(--t-hairline)',
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
              VENDORBRIDGE // AUTOMATED PROCUREMENT PIPELINE
            </span>
          </div>
          <span
            className="font-code text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ backgroundColor: 'var(--t-accent-main)', color: '#FFFFFF' }}
          >
            STEP {current.step} OF 7
          </span>
        </div>

        {/* ──── PIPELINE TRACKER ──── */}
        <div
          className="p-4 md:p-6 border-b overflow-x-auto"
          style={{ backgroundColor: 'var(--t-bg-secondary)', borderColor: 'var(--t-hairline)' }}
        >
          <div className="flex items-center gap-2 min-w-max">
            {STEPS.map((s, idx) => {
              const isActive = activeStep === s.step;
              const isPast = s.step < activeStep;

              return (
                <div key={s.step} className="flex items-center gap-2">
                  <button
                    aria-pressed={isActive}
                    onClick={() => setActiveStep(s.step)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border font-body text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'border-transparent font-semibold'
                        : 'border-[var(--t-hairline)] hover:border-[var(--t-accent-main)]'
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: 'var(--t-accent-main)', color: '#FFFFFF' }
                        : isPast
                          ? { backgroundColor: 'var(--t-surface)', color: 'var(--t-bg-primary)' }
                          : { color: 'var(--t-text-secondary)' }
                    }
                  >
                    {isPast ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="font-code text-[11px] font-bold">{s.code}</span>
                    )}
                    <span>{s.title}</span>
                  </button>

                  {idx < STEPS.length - 1 && (
                    <ArrowRight
                      className="w-4 h-4 shrink-0"
                      style={{ color: isPast ? 'var(--t-accent-main)' : 'var(--t-hairline)' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ──── ACTIVE STEP PANEL ──── */}
        <div className="p-6 md:p-10 min-h-[340px] flex flex-col justify-between relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div
                className="flex flex-wrap items-center justify-between gap-4 border-b pb-4"
                style={{ borderColor: 'var(--t-hairline)' }}
              >
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-code text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--t-text-muted)' }}>
                    STAGE {current.code}
                  </span>
                  <h3
                    className="font-display text-3xl md:text-4xl uppercase leading-none"
                    style={{ color: 'var(--t-heading)' }}
                  >
                    {current.title}
                  </h3>
                </div>

                <span
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border font-code text-[11px] font-bold uppercase tracking-widest"
                  style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-accent-ink)' }}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>PHASE {current.step} / 7 VERIFIED</span>
                </span>
              </div>

              <p className="font-body text-lg md:text-xl font-medium leading-relaxed max-w-2xl" style={{ color: 'var(--t-text-secondary)' }}>
                {current.detail}
              </p>

              {/* Step 4: quotation comparison matrix */}
              {activeStep === 4 && (
                <div className="p-5 rounded-xl border space-y-3 font-code text-xs" style={PANEL}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold uppercase tracking-widest" style={{ color: 'var(--t-accent-ink)' }}>
                      AUTOMATED VENDOR COMPARISON MATRIX
                    </span>
                    <span style={{ color: 'var(--t-text-muted)' }}>RFQ #2048</span>
                  </div>
                  <div className="space-y-2">
                    <div
                      className="flex justify-between font-bold pb-2 border-b"
                      style={{ color: 'var(--t-text-primary)', borderColor: 'var(--t-hairline)' }}
                    >
                      <span>VENDOR NAME</span>
                      <span>UNIT QUOTE</span>
                      <span>EVALUATION</span>
                    </div>
                    <div
                      className="flex justify-between p-2 rounded-lg font-bold"
                      style={{ backgroundColor: 'var(--t-bg-panel)', color: 'var(--t-accent-ink)' }}
                    >
                      <span>TechCore Solutions</span>
                      <span>₹48,500</span>
                      <span style={{ color: 'var(--t-cool-ink)' }}>RECOMMENDED (WINNER)</span>
                    </div>
                    <div className="flex justify-between p-2">
                      <span>InfraPro Systems</span>
                      <span>₹52,100</span>
                      <span>HIGHER SLA COST</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: approval sign-off stack */}
              {activeStep === 5 && (
                <div className="p-5 rounded-xl border space-y-3 font-code text-xs" style={PANEL}>
                  <div className="font-bold uppercase tracking-widest" style={{ color: 'var(--t-accent-ink)' }}>
                    ROLE-BASED MULTI-TIER APPROVAL STACK
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="px-2.5 py-1 rounded-full font-bold"
                      style={{ backgroundColor: 'var(--t-accent-cool)', color: '#FFFFFF' }}
                    >
                      APPROVED
                    </span>
                    <span>Procurement Manager (JWT Token Verified)</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="px-2.5 py-1 rounded-full font-bold"
                      style={{ backgroundColor: 'var(--t-accent-cool)', color: '#FFFFFF' }}
                    >
                      APPROVED
                    </span>
                    <span>Finance Controller (Sign-off Logged)</span>
                  </div>
                </div>
              )}

              {/* Audit log for the remaining steps */}
              {activeStep !== 4 && activeStep !== 5 && (
                <div className="p-4 rounded-xl border font-code text-xs flex flex-wrap items-center justify-between gap-3" style={PANEL}>
                  <span className="font-bold" style={{ color: 'var(--t-accent-ink)' }}>
                    [AUDIT LOG] Stage {current.step} execution completed via Node.js + Express + PostgreSQL
                  </span>
                  <ChevronRight className="w-4 h-4" style={{ color: 'var(--t-text-muted)' }} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
