import React, { createContext, useContext, useMemo, type ReactNode } from 'react';

/* ────────────────────────────────────────────
   Skipper UI — layout system (local implementation)
   Provides constraint-based Container / Grid / Stack / Box.
   ──────────────────────────────────────────── */

interface SkipperTheme {
  breakpoints: Record<string, number>;
  spacing: number;
  container: { maxWidth: number; padding: number | string };
}

const defaultTheme: SkipperTheme = {
  breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280 },
  spacing: 4,
  container: { maxWidth: 1200, padding: 1.5 },
};

const SkipperContext = createContext<SkipperTheme>(defaultTheme);

export function SkipperProvider({
  children,
  theme,
}: { children: ReactNode; theme?: Partial<SkipperTheme> }) {
  const merged = useMemo(
    () => ({
      ...defaultTheme,
      ...theme,
      breakpoints: { ...defaultTheme.breakpoints, ...theme?.breakpoints },
      container: { ...defaultTheme.container, ...theme?.container },
    }),
    [theme],
  );
  return <SkipperContext.Provider value={merged}>{children}</SkipperContext.Provider>;
}

export function useSkipper() {
  return useContext(SkipperContext);
}

/* spacing helper: 1 unit = theme.spacing rem */
function sp(units: number | string, theme: SkipperTheme) {
  const n = typeof units === 'number' ? units * theme.spacing : parseFloat(units);
  return `${n}rem`;
}

interface BoxProps extends React.ComponentProps<'div'> {
  p?: number | string;
  px?: number | string;
  py?: number | string;
  pt?: number | string;
  pb?: number | string;
  pl?: number | string;
  pr?: number | string;
  m?: number | string;
  mx?: number | string;
  my?: number | string;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  bg?: string;
  borderRadius?: string | number;
  border?: string;
  shadow?: string;
}

export function Box({
  children,
  className,
  p, px, py, pt, pb, pl, pr,
  m, mx, my, mt, mb, ml, mr,
  bg, borderRadius, border, shadow,
  ...props
}: BoxProps) {
  const theme = useSkipper();
  const style: React.CSSProperties = {};
  if (p !== undefined) style.padding = sp(p, theme);
  if (px !== undefined) { style.paddingLeft = sp(px, theme); style.paddingRight = sp(px, theme); }
  if (py !== undefined) { style.paddingTop = sp(py, theme); style.paddingBottom = sp(py, theme); }
  if (pt !== undefined) style.paddingTop = sp(pt, theme);
  if (pb !== undefined) style.paddingBottom = sp(pb, theme);
  if (pl !== undefined) style.paddingLeft = sp(pl, theme);
  if (pr !== undefined) style.paddingRight = sp(pr, theme);
  if (m !== undefined) style.margin = sp(m, theme);
  if (mx !== undefined) { style.marginLeft = sp(mx, theme); style.marginRight = sp(mx, theme); }
  if (my !== undefined) { style.marginTop = sp(my, theme); style.marginBottom = sp(my, theme); }
  if (mt !== undefined) style.marginTop = sp(mt, theme);
  if (mb !== undefined) style.marginBottom = sp(mb, theme);
  if (ml !== undefined) style.marginLeft = sp(ml, theme);
  if (mr !== undefined) style.marginRight = sp(mr, theme);
  if (bg) style.backgroundColor = bg;
  if (borderRadius !== undefined) style.borderRadius = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;
  if (border) style.border = border;
  if (shadow) style.boxShadow = shadow;

  return (
    <div className={className} style={style} {...props}>
      {children}
    </div>
  );
}

interface ContainerProps extends React.ComponentProps<'div'> {
  maxWidth?: keyof SkipperTheme['breakpoints'] | number | string;
  padding?: number | string;
  children: ReactNode;
}

export function Container({
  children,
  className,
  maxWidth = 'xl',
  padding,
  ...props
}: ContainerProps) {
  const theme = useSkipper();
  let mw: string | number = maxWidth;
  if (typeof maxWidth === 'string' && theme.breakpoints[maxWidth] !== undefined) {
    mw = theme.breakpoints[maxWidth];
  }
  const style: React.CSSProperties = {
    maxWidth: typeof mw === 'number' ? `${mw}px` : mw,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  };
  if (padding !== undefined) {
    style.paddingLeft = sp(padding, theme);
    style.paddingRight = sp(padding, theme);
  } else {
    style.paddingLeft = sp(theme.container.padding, theme);
    style.paddingRight = sp(theme.container.padding, theme);
  }
  return (
    <div className={className} style={style} {...props}>
      {children}
    </div>
  );
}

interface GridProps extends React.ComponentProps<'div'> {
  columns?: Record<string, number> | number;
  gap?: number | string;
  children: ReactNode;
}

export function Grid({
  children,
  className,
  columns,
  gap,
  ...props
}: GridProps) {
  const theme = useSkipper();
  const style: React.CSSProperties = {
    display: 'grid',
    gap: gap !== undefined ? sp(gap, theme) : sp(theme.spacing * 2, theme),
  };

  // Build responsive grid-template-columns using media queries via inline style is limited;
  // fallback to a sensible default plus data attribute for CSS handling.
  if (typeof columns === 'number') {
    style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
  } else if (columns) {
    const base = columns.base ?? 1;
    style.gridTemplateColumns = `repeat(${base}, minmax(0, 1fr))`;
    // generate media rules is complex inline; expose breakpoints via data attr
    (style as any).gridTemplateColumnsBase = base;
  } else {
    style.gridTemplateColumns = `repeat(1, minmax(0, 1fr))`;
  }

  return (
    <div className={className} style={style} {...props}>
      {children}
    </div>
  );
}

interface StackProps extends React.ComponentProps<'div'> {
  direction?: 'column' | 'row';
  gap?: number | string;
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  children: ReactNode;
}

export function Stack({
  children,
  className,
  direction = 'column',
  gap,
  align,
  ...props
}: StackProps) {
  const theme = useSkipper();
  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    gap: gap !== undefined ? sp(gap, theme) : sp(theme.spacing * 2, theme),
  };
  if (align) style.alignItems = align;
  return (
    <div className={className} style={style} {...props}>
      {children}
    </div>
  );
}

export { defaultTheme };
export type { SkipperTheme };
