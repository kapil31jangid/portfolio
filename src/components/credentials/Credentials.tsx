import { PORTFOLIO_DATA } from '../../data/portfolio';
import { ArrowUpRight } from 'lucide-react';
import { ChapterHeader } from '../ui/ChapterHeader';
import { CountUp, Reveal, Marquee } from '../ui/motion';
import { motion } from 'framer-motion';

/**
 * A short mark for the issuer, so each card carries a block of colour the way
 * the reference site's certificate thumbnails do. Multi-word issuers give their
 * initials; single-word ones give their first two letters.
 */
function monogram(issuer: string): string {
  const words = issuer.split(/\s+/).filter(Boolean);
  if (!words.length) return '—';
  return words.length > 1
    ? words.slice(0, 2).map((w) => w[0]).join('').toUpperCase()
    : words[0].slice(0, 2).toUpperCase();
}

export const Credentials = () => {
  const { certifications } = PORTFOLIO_DATA;
  const total = String(certifications.length).padStart(2, '0');

  return (
    <section
      id="credentials"
      className="relative py-16 md:py-24 border-b overflow-hidden select-none transition-colors duration-500"
      style={{
        backgroundColor: 'var(--t-bg-secondary)',
        color: 'var(--t-text-primary)',
        borderColor: 'var(--t-hairline)',
      }}
    >
      <div className="shell relative z-10 space-y-10">
        <ChapterHeader index="05" label="ACHIEVEMENTS" eyebrow="CERTIFICATIONS" badge="05 / 06" />

        {/* Cert marquee */}
        <Marquee
          items={PORTFOLIO_DATA.certifications.map(c => c.title)}
          speed={40}
          gap={120}
          theme="accent"
          className="py-2 border-y mb-6"
          style={{ borderColor: 'var(--t-hairline)', backgroundColor: 'var(--t-bg-secondary)' }}
        />

        <div className="space-y-6">
          {/* Sub-heading with the running count, mirroring the reference's
              "Certificates:" label above its grid. */}
          <div
            className="flex items-baseline justify-between gap-4 pb-3 border-b"
            style={{ borderColor: 'var(--t-hairline)' }}
          >
            <h3
              className="font-code text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--t-accent-ink)' }}
            >
              Certifications
            </h3>
            <span className="font-code text-xs font-bold" style={{ color: 'var(--t-text-muted)' }}>
              {total}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {certifications.map((cert, idx) => {
              const cardClass = `card shine group relative overflow-hidden flex flex-col h-full p-4${
                cert.url ? ' cursor-pointer hover:border-[var(--t-accent-main)] hover:-translate-y-0.5' : ''
              }`;

              const body = (
                <>
                  {/* Issuer mark, standing in for the certificate image */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <span
                      aria-hidden="true"
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl font-display text-lg leading-none shrink-0"
                      style={{ backgroundColor: 'var(--t-accent-main)', color: '#FFFFFF' }}
                    >
                      {monogram(cert.issuer)}
                    </span>
                    <CountUp
                      to={idx + 1}
                      pad={2}
                      className="font-code text-xs font-bold pt-1"
                      style={{ color: 'var(--t-text-muted)' }}
                    />
                  </div>

                  <h4
                    className="font-display text-lg uppercase leading-tight mb-2"
                    style={{ color: 'var(--t-text-primary)' }}
                  >
                    {cert.title}
                  </h4>

                  <p
                    className="font-body text-sm leading-snug mb-3"
                    style={{ color: 'var(--t-text-secondary)' }}
                  >
                    {cert.issuer}
                  </p>

                  {/* Meta pinned to the bottom so the rows line up across
                      cards with different title lengths. */}
                  <div
                    className="mt-auto pt-3 border-t flex items-center justify-between gap-3"
                    style={{ borderColor: 'var(--t-hairline)' }}
                  >
                    <span
                      className="font-code text-[11px] font-bold uppercase tracking-widest"
                      style={{ color: 'var(--t-text-muted)' }}
                    >
                      ISSUED {cert.date}
                    </span>
                    {cert.url && (
                      <span
                        className="inline-flex items-center gap-1 font-code text-[11px] font-bold uppercase tracking-widest transition-colors"
                        style={{ color: 'var(--t-accent-ink)' }}
                      >
                        VIEW
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </>
              );

              // Branched rather than picking the tag from a variable: a
              // `'a' | 'div'` union has to satisfy both prop sets, and `div`
              // takes no `href`.
              return (
                <Reveal
                  key={cert.id}
                  direction="up"
                  distance={0.55}
                  duration={0.45}
                  delay={0.04 * idx}
                  className="h-full"
                >
                  <motion.div
                    whileInView={{ y: [0, -12, 0] }}
                    viewport={{ once: true }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.05 * idx }}
                  >
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className={cardClass}>
                        {body}
                      </a>
                    ) : (
                      <div className={cardClass}>{body}</div>
                    )}
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
