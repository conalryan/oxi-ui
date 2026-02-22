/**
 * @oxi-ui/theme
 * 
 * A modern, accessible theme system for the OXI-UI component library.
 * Inspired by OXC, Bun, and Vite color palettes.
 * 
 * @example
 * // Import CSS for automatic theme support
 * import '@oxi-ui/theme/css';
 * 
 * // Import tokens for programmatic access
 * import { theme, lightColors, darkColors } from '@oxi-ui/theme/tokens';
 */

// Re-export all tokens
export * from './tokens/index.js';

// CSS variable name helpers for use in JavaScript
export const cssVars = {
  // Backgrounds
  bgPrimary: 'var(--oxi-bg-primary)',
  bgSecondary: 'var(--oxi-bg-secondary)',
  bgTertiary: 'var(--oxi-bg-tertiary)',
  bgElevated: 'var(--oxi-bg-elevated)',
  bgOverlay: 'var(--oxi-bg-overlay)',
  bgInverse: 'var(--oxi-bg-inverse)',

  // Surfaces
  surfacePrimary: 'var(--oxi-surface-primary)',
  surfaceSecondary: 'var(--oxi-surface-secondary)',
  surfaceTertiary: 'var(--oxi-surface-tertiary)',
  surfaceHover: 'var(--oxi-surface-hover)',
  surfaceActive: 'var(--oxi-surface-active)',
  surfaceDisabled: 'var(--oxi-surface-disabled)',

  // Text
  textPrimary: 'var(--oxi-text-primary)',
  textSecondary: 'var(--oxi-text-secondary)',
  textTertiary: 'var(--oxi-text-tertiary)',
  textDisabled: 'var(--oxi-text-disabled)',
  textInverse: 'var(--oxi-text-inverse)',
  textPlaceholder: 'var(--oxi-text-placeholder)',
  textLink: 'var(--oxi-text-link)',
  textLinkHover: 'var(--oxi-text-link-hover)',

  // Borders
  borderPrimary: 'var(--oxi-border-primary)',
  borderSecondary: 'var(--oxi-border-secondary)',
  borderFocus: 'var(--oxi-border-focus)',
  borderError: 'var(--oxi-border-error)',
  borderSuccess: 'var(--oxi-border-success)',
  borderWarning: 'var(--oxi-border-warning)',
  borderDisabled: 'var(--oxi-border-disabled)',

  // Primary (Vite Purple)
  primary: 'var(--oxi-primary)',
  primaryHover: 'var(--oxi-primary-hover)',
  primaryActive: 'var(--oxi-primary-active)',
  primaryPressed: 'var(--oxi-primary-pressed)',
  primaryDisabled: 'var(--oxi-primary-disabled)',
  primarySubtle: 'var(--oxi-primary-subtle)',
  primarySubtleHover: 'var(--oxi-primary-subtle-hover)',
  primaryOn: 'var(--oxi-primary-on)',

  // Secondary (OXC Cyan)
  secondary: 'var(--oxi-secondary)',
  secondaryHover: 'var(--oxi-secondary-hover)',
  secondaryActive: 'var(--oxi-secondary-active)',
  secondaryPressed: 'var(--oxi-secondary-pressed)',
  secondaryDisabled: 'var(--oxi-secondary-disabled)',
  secondarySubtle: 'var(--oxi-secondary-subtle)',
  secondarySubtleHover: 'var(--oxi-secondary-subtle-hover)',
  secondaryOn: 'var(--oxi-secondary-on)',

  // Accent (Bun Orange)
  accent: 'var(--oxi-accent)',
  accentHover: 'var(--oxi-accent-hover)',
  accentActive: 'var(--oxi-accent-active)',
  accentPressed: 'var(--oxi-accent-pressed)',
  accentDisabled: 'var(--oxi-accent-disabled)',
  accentSubtle: 'var(--oxi-accent-subtle)',
  accentSubtleHover: 'var(--oxi-accent-subtle-hover)',
  accentOn: 'var(--oxi-accent-on)',

  // Success
  success: 'var(--oxi-success)',
  successHover: 'var(--oxi-success-hover)',
  successActive: 'var(--oxi-success-active)',
  successPressed: 'var(--oxi-success-pressed)',
  successDisabled: 'var(--oxi-success-disabled)',
  successSubtle: 'var(--oxi-success-subtle)',
  successSubtleHover: 'var(--oxi-success-subtle-hover)',
  successOn: 'var(--oxi-success-on)',

  // Error
  error: 'var(--oxi-error)',
  errorHover: 'var(--oxi-error-hover)',
  errorActive: 'var(--oxi-error-active)',
  errorPressed: 'var(--oxi-error-pressed)',
  errorDisabled: 'var(--oxi-error-disabled)',
  errorSubtle: 'var(--oxi-error-subtle)',
  errorSubtleHover: 'var(--oxi-error-subtle-hover)',
  errorOn: 'var(--oxi-error-on)',

  // Warning
  warning: 'var(--oxi-warning)',
  warningHover: 'var(--oxi-warning-hover)',
  warningActive: 'var(--oxi-warning-active)',
  warningPressed: 'var(--oxi-warning-pressed)',
  warningDisabled: 'var(--oxi-warning-disabled)',
  warningSubtle: 'var(--oxi-warning-subtle)',
  warningSubtleHover: 'var(--oxi-warning-subtle-hover)',
  warningOn: 'var(--oxi-warning-on)',

  // Info
  info: 'var(--oxi-info)',
  infoHover: 'var(--oxi-info-hover)',
  infoActive: 'var(--oxi-info-active)',
  infoPressed: 'var(--oxi-info-pressed)',
  infoDisabled: 'var(--oxi-info-disabled)',
  infoSubtle: 'var(--oxi-info-subtle)',
  infoSubtleHover: 'var(--oxi-info-subtle-hover)',
  infoOn: 'var(--oxi-info-on)',

  // Feature Colors
  magenta: 'var(--oxi-magenta)',
  purple: 'var(--oxi-purple)',
  teal: 'var(--oxi-teal)',

  // Neutrals
  neutral50: 'var(--oxi-neutral-50)',
  neutral100: 'var(--oxi-neutral-100)',
  neutral200: 'var(--oxi-neutral-200)',
  neutral300: 'var(--oxi-neutral-300)',
  neutral400: 'var(--oxi-neutral-400)',
  neutral500: 'var(--oxi-neutral-500)',
  neutral600: 'var(--oxi-neutral-600)',
  neutral700: 'var(--oxi-neutral-700)',
  neutral800: 'var(--oxi-neutral-800)',
  neutral900: 'var(--oxi-neutral-900)',

  // Shadows
  shadowXs: 'var(--oxi-shadow-xs)',
  shadowSm: 'var(--oxi-shadow-sm)',
  shadowMd: 'var(--oxi-shadow-md)',
  shadowLg: 'var(--oxi-shadow-lg)',
  shadowXl: 'var(--oxi-shadow-xl)',

  // Focus
  focusRing: 'var(--oxi-focus-ring)',
  focusRingOffset: 'var(--oxi-focus-ring-offset)',
  focusRingWidth: 'var(--oxi-focus-ring-width)',

  // States
  stateHover: 'var(--oxi-state-hover)',
  statePressed: 'var(--oxi-state-pressed)',
  stateSelected: 'var(--oxi-state-selected)',
  stateDisabled: 'var(--oxi-state-disabled)',

  // Typography
  fontFamilySans: 'var(--oxi-font-family-sans)',
  fontFamilyMono: 'var(--oxi-font-family-mono)',

  // Animation
  durationFast: 'var(--oxi-duration-fast)',
  durationNormal: 'var(--oxi-duration-normal)',
  durationSlow: 'var(--oxi-duration-slow)',
  durationSlower: 'var(--oxi-duration-slower)',
  easeIn: 'var(--oxi-ease-in)',
  easeOut: 'var(--oxi-ease-out)',
  easeInOut: 'var(--oxi-ease-in-out)',
  easeBounce: 'var(--oxi-ease-bounce)',
} as const;

export type CssVars = typeof cssVars;

/**
 * Utility to set the theme on a target element
 */
export function setTheme(theme: 'light' | 'dark' | 'system', target: HTMLElement = document.documentElement): void {
  if (theme === 'system') {
    target.style.removeProperty('color-scheme');
    delete target.dataset.theme;
  } else {
    target.style.colorScheme = theme;
    target.dataset.theme = theme;
  }
}

/**
 * Gets the current active theme based on computed styles
 */
export function getActiveTheme(target: HTMLElement = document.documentElement): 'light' | 'dark' {
  const colorScheme = getComputedStyle(target).colorScheme;
  if (colorScheme.includes('dark')) {
    return 'dark';
  }
  if (colorScheme.includes('light')) {
    return 'light';
  }
  // Fall back to system preference
  return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Subscribe to theme changes (system preference)
 */
export function onThemeChange(callback: (theme: 'light' | 'dark') => void): () => void {
  const mediaQuery = globalThis.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e: MediaQueryListEvent) => callback(e.matches ? 'dark' : 'light');
  mediaQuery.addEventListener('change', handler);
  return () => mediaQuery.removeEventListener('change', handler);
}
