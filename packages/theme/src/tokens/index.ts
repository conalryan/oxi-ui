/**
 * OXI-UI Design Tokens
 * 
 * TypeScript exports of the design tokens for programmatic access.
 * These values correspond to the CSS custom properties in theme.css.
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

/** Light theme color palette */
export const lightColors = {
  // Backgrounds
  bg: {
    primary: '#FFFFFF',
    secondary: '#FBF0DF',
    tertiary: '#F5F5F7',
    elevated: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.4)',
    inverse: '#14151A',
  },
  
  // Surfaces
  surface: {
    primary: '#FFFFFF',
    secondary: '#F5F5F7',
    tertiary: '#E5E7EB',
    hover: '#F0F0F2',
    active: '#E8E8EA',
    disabled: '#F5F5F7',
  },
  
  // Text
  text: {
    primary: '#14151A',
    secondary: '#6B7280',
    tertiary: '#867E8E',
    disabled: '#9CA3AF',
    inverse: '#FFFFFF',
    placeholder: '#9CA3AF',
    link: '#0073D8',
    linkHover: '#005BB5',
  },
  
  // Borders
  border: {
    primary: '#E5E7EB',
    secondary: '#D1D5DB',
    focus: '#8558FF',
    error: '#DC2626',
    success: '#16A34A',
    warning: '#D97706',
    disabled: '#E5E7EB',
  },
  
  // Brand Primary (Vite Purple)
  primary: {
    base: '#8558FF',
    hover: '#7347E6',
    active: '#6136CC',
    pressed: '#5028B3',
    disabled: '#C5B4FF',
    subtle: '#F3EFFF',
    subtleHover: '#E8E0FF',
    on: '#FFFFFF',
  },
  
  // Brand Secondary (OXC Cyan)
  secondary: {
    base: '#178390',
    hover: '#136E7A',
    active: '#0F5A64',
    pressed: '#0B464E',
    disabled: '#A3D4DA',
    subtle: '#E6F7F9',
    subtleHover: '#D0F0F4',
    on: '#FFFFFF',
  },
  
  // Brand Accent (Bun Orange)
  accent: {
    base: '#EB8A1C',
    hover: '#D47818',
    active: '#BD6614',
    pressed: '#A65410',
    disabled: '#F5C98E',
    subtle: '#FEF7E6',
    subtleHover: '#FDF0D0',
    on: '#14151A',
  },
  
  // Semantic - Success
  success: {
    base: '#16A34A',
    hover: '#15803D',
    active: '#166534',
    pressed: '#14532D',
    disabled: '#A3D9B8',
    subtle: '#ECFDF5',
    subtleHover: '#D1FAE5',
    on: '#FFFFFF',
  },
  
  // Semantic - Error
  error: {
    base: '#DC2626',
    hover: '#B91C1C',
    active: '#991B1B',
    pressed: '#7F1D1D',
    disabled: '#FECACA',
    subtle: '#FEF2F2',
    subtleHover: '#FEE2E2',
    on: '#FFFFFF',
  },
  
  // Semantic - Warning
  warning: {
    base: '#D97706',
    hover: '#B45309',
    active: '#92400E',
    pressed: '#78350F',
    disabled: '#FDE68A',
    subtle: '#FFFBEB',
    subtleHover: '#FEF3C7',
    on: '#14151A',
  },
  
  // Semantic - Info
  info: {
    base: '#0073D8',
    hover: '#0062B8',
    active: '#005198',
    pressed: '#004078',
    disabled: '#93C5FD',
    subtle: '#EFF6FF',
    subtleHover: '#DBEAFE',
    on: '#FFFFFF',
  },
  
  // Feature - Magenta
  magenta: {
    base: '#EF56EF',
    hover: '#D946D9',
    active: '#C336C3',
    pressed: '#AD26AD',
    disabled: '#FBCFE8',
    subtle: '#FDF2F8',
    subtleHover: '#FCE7F3',
    on: '#FFFFFF',
  },
  
  // Feature - Purple
  purple: {
    base: '#9153D0',
    hover: '#7C3AED',
    active: '#6D28D9',
    pressed: '#5B21B6',
    disabled: '#DDD6FE',
    subtle: '#FAF5FF',
    subtleHover: '#F3E8FF',
    on: '#FFFFFF',
  },
  
  // Feature - Teal
  teal: {
    base: '#0D9488',
    hover: '#0F766E',
    active: '#115E59',
    pressed: '#134E4A',
    disabled: '#99F6E4',
    subtle: '#F0FDFA',
    subtleHover: '#CCFBF1',
    on: '#FFFFFF',
  },
  
  // Neutral
  neutral: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
  },
  
  // States
  state: {
    hover: 'rgba(0, 0, 0, 0.04)',
    pressed: 'rgba(0, 0, 0, 0.08)',
    selected: 'rgba(133, 88, 255, 0.12)',
    disabled: 'rgba(0, 0, 0, 0.04)',
  },
  
  // Focus
  focus: {
    ring: '#8558FF',
  },
} as const;

/** Dark theme color palette */
export const darkColors = {
  // Backgrounds
  bg: {
    primary: '#14151A',
    secondary: '#16171D',
    tertiary: '#1B2025',
    elevated: '#22252D',
    overlay: 'rgba(0, 0, 0, 0.6)',
    inverse: '#FFFFFF',
  },
  
  // Surfaces
  surface: {
    primary: '#1B2025',
    secondary: '#22252D',
    tertiary: '#2D3139',
    hover: '#2A2D35',
    active: '#32363E',
    disabled: '#1F2228',
  },
  
  // Text
  text: {
    primary: '#FFFFFF',
    secondary: '#B9B9BB',
    tertiary: '#867E8E',
    disabled: '#4B5563',
    inverse: '#14151A',
    placeholder: '#6B7280',
    link: '#60A5FA',
    linkHover: '#87B5E9',
  },
  
  // Borders
  border: {
    primary: '#3B3440',
    secondary: '#4B5563',
    focus: '#B39AFF',
    error: '#F87171',
    success: '#34D399',
    warning: '#FCD34D',
    disabled: '#2D3139',
  },
  
  // Brand Primary (Vite Purple)
  primary: {
    base: '#B39AFF',
    hover: '#9B7AFF',
    active: '#8558FF',
    pressed: '#7347E6',
    disabled: '#4A3B7A',
    subtle: '#2A2440',
    subtleHover: '#3A3050',
    on: '#14151A',
  },
  
  // Brand Secondary (OXC Cyan)
  secondary: {
    base: '#4CE5F1',
    hover: '#32F3EF',
    active: '#22D3EE',
    pressed: '#56C2C9',
    disabled: '#1B3C40',
    subtle: '#151D20',
    subtleHover: '#1B2830',
    on: '#14151A',
  },
  
  // Brand Accent (Bun Orange)
  accent: {
    base: '#FCD34D',
    hover: '#FACC15',
    active: '#FDB813',
    pressed: '#EB8A1C',
    disabled: '#4A3B20',
    subtle: '#2A2418',
    subtleHover: '#3A3020',
    on: '#14151A',
  },
  
  // Semantic - Success
  success: {
    base: '#34D399',
    hover: '#22C589',
    active: '#10B779',
    pressed: '#34D399',
    disabled: '#1B3C2E',
    subtle: '#0D2818',
    subtleHover: '#153820',
    on: '#14151A',
  },
  
  // Semantic - Error
  error: {
    base: '#F87171',
    hover: '#EF4444',
    active: '#DC2626',
    pressed: '#F87171',
    disabled: '#4A2020',
    subtle: '#2A1818',
    subtleHover: '#3A2020',
    on: '#14151A',
  },
  
  // Semantic - Warning
  warning: {
    base: '#FCD34D',
    hover: '#FBBF24',
    active: '#F59E0B',
    pressed: '#FCD34D',
    disabled: '#4A3B20',
    subtle: '#2A2418',
    subtleHover: '#3A3020',
    on: '#14151A',
  },
  
  // Semantic - Info
  info: {
    base: '#60A5FA',
    hover: '#3B82F6',
    active: '#2563EB',
    pressed: '#60A5FA',
    disabled: '#1E3A5F',
    subtle: '#172554',
    subtleHover: '#1E3A60',
    on: '#14151A',
  },
  
  // Feature - Magenta
  magenta: {
    base: '#F472B6',
    hover: '#EC4899',
    active: '#DB2777',
    pressed: '#F472B6',
    disabled: '#4A2040',
    subtle: '#2A1828',
    subtleHover: '#3A2030',
    on: '#14151A',
  },
  
  // Feature - Purple
  purple: {
    base: '#C084FC',
    hover: '#A855F7',
    active: '#9333EA',
    pressed: '#C084FC',
    disabled: '#3A2860',
    subtle: '#1F1830',
    subtleHover: '#2A2040',
    on: '#14151A',
  },
  
  // Feature - Teal
  teal: {
    base: '#22D3EE',
    hover: '#14B8A6',
    active: '#0D9488',
    pressed: '#22D3EE',
    disabled: '#134E4A',
    subtle: '#0D1F1E',
    subtleHover: '#153028',
    on: '#14151A',
  },
  
  // Neutral (inverted for dark mode)
  neutral: {
    50: '#18181B',
    100: '#27272A',
    200: '#3F3F46',
    300: '#52525B',
    400: '#71717A',
    500: '#A1A1AA',
    600: '#D4D4D8',
    700: '#E4E4E7',
    800: '#F4F4F5',
    900: '#FAFAFA',
  },
  
  // States
  state: {
    hover: 'rgba(255, 255, 255, 0.08)',
    pressed: 'rgba(255, 255, 255, 0.12)',
    selected: 'rgba(179, 154, 255, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.04)',
  },
  
  // Focus
  focus: {
    ring: '#B39AFF',
  },
} as const;

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const typography = {
  fontFamily: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
} as const;

// ============================================================================
// BORDER RADIUS TOKENS
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '0.25rem',    // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

// ============================================================================
// SHADOW TOKENS
// ============================================================================

export const shadows = {
  light: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  dark: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.4)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
  },
} as const;

// ============================================================================
// ANIMATION TOKENS
// ============================================================================

export const animation = {
  duration: {
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  
  easing: {
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// ============================================================================
// Z-INDEX TOKENS
// ============================================================================

export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  popover: 500,
  toast: 600,
  tooltip: 700,
} as const;

// ============================================================================
// FOCUS TOKENS
// ============================================================================

export const focus = {
  ringOffset: '2px',
  ringWidth: '2px',
} as const;

// ============================================================================
// COMBINED THEME EXPORT
// ============================================================================

export const theme = {
  light: {
    colors: lightColors,
    typography,
    spacing,
    borderRadius,
    shadows: shadows.light,
    animation,
    zIndex,
    focus,
  },
  dark: {
    colors: darkColors,
    typography,
    spacing,
    borderRadius,
    shadows: shadows.dark,
    animation,
    zIndex,
    focus,
  },
} as const;

export type Theme = typeof theme;
export type LightTheme = typeof theme.light;
export type DarkTheme = typeof theme.dark;
export type Colors = typeof lightColors | typeof darkColors;
