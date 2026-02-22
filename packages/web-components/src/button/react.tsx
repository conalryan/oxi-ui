import React, { useRef, useEffect, forwardRef } from 'react';
import type { ButtonVariant, ButtonSize, OxiUIButtonProps } from './types';

// Ensure the web component is imported for side effects
import './button.element';

export interface ReactOxiUIButtonProps extends OxiUIButtonProps {
  /** Button content */
  children?: React.ReactNode;
  /** Click handler */
  onClick?: (event: CustomEvent) => void;
  /** Additional class name */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
}

/**
 * React wrapper for the OxiUI Button web component
 *
 * @example
 * ```tsx
 * import { OxiUIButton } from '@oxi-ui/web-components/button/react';
 *
 * function App() {
 *   return (
 *     <OxiUIButton variant="primary" onClick={() => console.log('clicked')}>
 *       Click me
 *     </OxiUIButton>
 *   );
 * }
 * ```
 */
export const OxiUIButton = forwardRef<HTMLElement, ReactOxiUIButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      disabled = false,
      loading = false,
      type = 'button',
      fullWidth = false,
      children,
      onClick,
      className,
      style,
    },
    ref
  ) => {
    const innerRef = useRef<HTMLElement>(null);
    const buttonRef = (ref as React.RefObject<HTMLElement>) || innerRef;

    useEffect(() => {
      const element = buttonRef.current;
      if (!element || !onClick) return;

      const handleClick = (e: Event) => {
        onClick(e as CustomEvent);
      };

      element.addEventListener('oxi-ui-click', handleClick);
      return () => {
        element.removeEventListener('oxi-ui-click', handleClick);
      };
    }, [onClick, buttonRef]);

    // Using createElement to avoid JSX issues with custom elements
    return React.createElement(
      'oxi-ui-button',
      {
        ref: buttonRef,
        variant,
        size,
        disabled: disabled || undefined,
        loading: loading || undefined,
        type,
        'full-width': fullWidth || undefined,
        class: className,
        style,
      },
      children
    );
  }
);

OxiUIButton.displayName = 'OxiUIButton';

export type { ButtonVariant, ButtonSize };
