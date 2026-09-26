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

export const VendorBridgeVisual = () => {
  const [activeStep, setActiveStep] = useState(1);
  const current = STEPS.find((s) => s.step === activeStep) || STEPS[0];

  return (
    <div className="project-visual relative w-full max-w-6xl mx-auto my-6">
      <div className="relative rounded-lg md:rounded-lg bg-[var(--t-card-bg)] text-[var(--t-text-primary)] border-[4px] border-[var(--t-chapter-border)] shadow-[8px_8px_0px_#E34835] overflow-hidden">
        {/* Window Chrome Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[var(--t-bg-secondary)] text-[var(--t-text-primary)] border-b-4 border-[var(--t-chapter-border)]">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#E34835]" />
            <span className="w-3 h-3 rounded-full bg-[#FFD447]" />
            <span className="w-3 h-3 rounded-full bg-[var(--t-card-bg)]" />
            <span className="ml-3 font-code text-xs font-bold text-[var(--t-accent-ink)] uppercase tracking-wider">
              VENDORBRIDGE // AUTOMATED PROCUREMENT PIPELINE
            </span>
          </div>
          <span className="font-manga text-sm text-[var(--dbz-ink)] bg-[var(--t-accent-alt)] px-3 py-1 rounded-lg border-2 border-[var(--t-chapter-border)] uppercase">
            STEP {current.step} OF 7
          </span>
        </div>

        {/* ──── HORIZONTAL PIPELINE TRACKER ──── */}
        <div className="p-4 md:p-6 bg-[var(--t-bg-secondary)] text-[var(--t-text-primary)] border-b-4 border-[var(--t-chapter-border)] overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {STEPS.map((s, idx) => {
              const isActive = activeStep === s.step;
              const isPast = s.step < activeStep;

              return (
                <div key={s.step} className="flex items-center gap-2">
                  <button
                    aria-pressed={isActive}
                    onClick={() => setActiveStep(s.step)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-manga text-base tracking-wider border-2 transition-all duration-200 ${
                      isActive
                        ? 'bg-[var(--t-accent-alt)] text-[var(--dbz-ink)] border-[var(--t-divider)] shadow-[3px_3px_0px_#FFD447]'
                        : isPast
                        ? 'bg-[var(--t-accent-main)] text-[var(--dbz-ink)] border-[var(--t-chapter-border)]'
                        : 'bg-[var(--t-bg-panel)] text-[var(--t-text-secondary)] border-[var(--t-chapter-border)] hover:text-[var(--t-text-primary)]'
                    }`}
                  >
                    {isPast ? (
                      <CheckCircle2 className="w-4 h-4 text-current" />
                    ) : (
                      <span className="font-code text-xs font-bold">{s.code}</span>
                    )}
                    <span>{s.title}</span>
                  </button>

                  {idx < STEPS.length - 1 && (
                    <ArrowRight
                      className={`w-4 h-4 ${
                        isPast ? 'text-[var(--t-accent-ink)]' : 'text-[var(--t-text-primary)]/20'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ──── ACTIVE STEP WORKFLOW DISPLAY PANEL ──── */}
        <div className="p-6 md:p-10 min-h-[340px] flex flex-col justify-between bg-halftone-cream relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[var(--t-chapter-border)]/20 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-manga text-4xl text-[var(--t-alt-ink)]">
                    STAGE {current.code}
                  </span>
                  <h3 className="font-manga text-4xl text-[var(--t-text-primary)] tracking-wide uppercase">
                    {current.title}
                  </h3>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--t-bg-secondary)] text-[var(--t-accent-ink)] font-code text-xs font-bold border-2 border-[var(--t-chapter-border)]">
                  <ShieldCheck className="w-4 h-4 text-[var(--t-alt-ink)]" />
                  <span>PHASE {current.step} / 7 VERIFIED</span>
                </div>
              </div>

              <p className="font-body text-xl font-medium text-[var(--t-text-primary)] leading-relaxed max-w-2xl">
                {current.detail}
              </p>

              {/* Step 4 Special Matrix: Quotation Comparison Table */}
              {activeStep === 4 && (
                <div className="p-5 rounded-lg bg-[var(--t-bg-secondary)] text-[var(--t-text-primary)] border-[3px] border-[var(--t-chapter-border)] shadow-[4px_4px_0px_#E34835] space-y-3 font-code text-xs">
                  <div className="font-manga text-lg text-[var(--t-accent-ink)] flex items-center justify-between">
                    <span>AUTOMATED VENDOR COMPARISON MATRIX</span>
                    <span className="text-[var(--t-alt-ink)]">RFQ #2048</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between font-bold text-[var(--t-text-primary)] pb-2 border-b border-[var(--t-divider)]/20">
                      <span>VENDOR NAME</span>
                      <span>UNIT QUOTE</span>
                      <span>EVALUATION</span>
                    </div>
                    <div className="flex justify-between text-[var(--t-accent-ink)] font-bold bg-[var(--t-bg-panel)] p-2 rounded">
                      <span>TechCore Solutions</span>
                      <span>₹48,500</span>
                      <span className="text-emerald-400">RECOMMENDED (WINNER)</span>
                    </div>
                    <div className="flex justify-between text-[var(--t-text-secondary)] p-2">
                      <span>InfraPro Systems</span>
                      <span>₹52,100</span>
                      <span>HIGHER SLA COST</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5 Special: Approval Sign-Off Workflow */}
              {activeStep === 5 && (
                <div className="p-5 rounded-lg bg-[var(--t-bg-secondary)] text-[var(--t-text-primary)] border-[3px] border-[var(--t-chapter-border)] space-y-3 font-code text-xs">
                  <div className="font-manga text-lg text-[var(--t-alt-ink)]">
                    ROLE-BASED MULTI-TIER APPROVAL STACK
                  </div>
                  <div className="flex items-center gap-3 text-[var(--t-text-primary)]/90">
                    <span className="px-2.5 py-1 bg-emerald-800 text-white rounded font-bold">APPROVED</span>
                    <span>Procurement Manager (JWT Token Verified)</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--t-text-primary)]/90">
                    <span className="px-2.5 py-1 bg-emerald-800 text-white rounded font-bold">APPROVED</span>
                    <span>Finance Controller (Sign-off Logged)</span>
                  </div>
                </div>
              )}

              {/* Audit Log for Other Steps */}
              {activeStep !== 4 && activeStep !== 5 && (
                <div className="p-4 rounded-lg bg-[var(--t-bg-secondary)] text-[var(--t-text-primary)] font-code text-xs border-2 border-[var(--t-chapter-border)] flex items-center justify-between">
                  <span className="text-[var(--t-accent-ink)] font-bold">
                    [AUDIT LOG] Stage {current.step} execution completed via Node.js + Express + PostgreSQL
                  </span>
                  <ChevronRight className="w-4 h-4 text-[var(--t-alt-ink)]" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
