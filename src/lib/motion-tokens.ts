/**
 * Centralized motion/animation tokens.
 * Single source of truth for timing, distances, easing curves.
 * Import anywhere instead of scattering magic numbers.
 */

export const motionTokens = {
  /** Hero wordmark split flourish */
  hero: {
    splitDelay: 1,
    splitDistance: 40,
    splitDuration: 0.85,
    splitEaseOut: 'easeOut',
    splitEaseBack: 'backOut',
    panelGrowDuration: 0.9,
    panelEase: [0.16, 1, 0.3, 1] as const,
    roleTypewriterDelay: 700,
    roleTypewriterSpeed: 38,
    ctaDelay: 1.65,
  },

  /** Journey timeline rail */
  journey: {
    railLeft: 19,
    scrollOffsetStart: 'start 85%',
    scrollOffsetEnd: 'end 45%',
    markerTopStart: '4%',
    markerTopEnd: '96%',
    lineGrowDuration: 1.8,
    lineEase: 'easeOut' as const,
    markerSpringStiffness: 400,
    markerSpringDamping: 22,
    milestoneDelay: 0.08,
    staggerDelay: 0.05,
  },

  /** Reveal entrance defaults */
  reveal: {
    defaultDuration: 0.6,
    defaultDelay: 0,
    defaultDistance: 1,
    defaultEase: [0.16, 1, 0.3, 1] as const,
    viewportMargin: '-60px',
    offsets: {
      up: { x: 0, y: 28 },
      down: { x: 0, y: -28 },
      left: { x: 32, y: 0 },
      right: { x: -32, y: 0 },
      none: { x: 0, y: 0 },
    } as const,
  },

  /** Stagger group/item defaults */
  stagger: {
    groupStagger: 0.05,
    groupDelay: 0.05,
    itemStagger: 0.045,
    itemSpring: { stiffness: 380, damping: 30, mass: 0.7 } as const,
    itemHidden: { opacity: 0, y: 18, scale: 0.94 },
    itemShow: { opacity: 1, y: 0, scale: 1 },
  },

  /** Orbit ring defaults */
  orbit: {
    heroDuration: 18,
    heroTilt: 74,
    journeyDuration: 22,
    journeyTilt: 70,
  },

  /** Navbar */
  navbar: {
    showThreshold: 60,
    animateDuration: 0.3,
    animateEase: 'easeOut' as const,
  },

  /** Magnetic hover */
  magnetic: {
    heroStrength: 0.15,
    ctaStrength: 0.18,
    projectStrength: 0.15,
  },

  /** ClickBurst */
  clickBurst: {
    heroMaxRadius: 220,
    heroRings: 5,
    heroParticles: 20,
    projectMaxRadius: 180,
    projectRings: 4,
    projectParticles: 16,
    defaultDuration: 0.9,
  },

  /** Page load sequence */
  pageLoad: {
    stepDelay: 0.08,
    springStiffness: 300,
    springDamping: 25,
  },

  /** Sound effect frequencies */
  sound: {
    clickBaseFreq: 900,
    clickEndFreq: 150,
    clickDuration: 0.06,
    clickGainStart: 0.1,
    clickGainEnd: 0.001,
  },
} as const;

/** Type helper for token paths */
export type MotionTokens = typeof motionTokens;