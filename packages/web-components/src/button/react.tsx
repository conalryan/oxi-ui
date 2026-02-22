import React, { useRef, useEffect, forwardRef } from 'react';
import type { ButtonVariant, ButtonSize, CanonButtonProps } from './types';

// Ensure the web component is imported for side effects
import './button.element';

export interface ReactCanonButtonProps extends CanonButtonProps {
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
 * React wrapper for the Canon Button web component
 *
 * @example
 * ```tsx
 * import { CanonButton } from '@canon/web-components/button/react';
 *
 * function App() {
 *   return (
 *     <CanonButton variant="primary" onClick={() => console.log('clicked')}>
 *       Click me
 *     </CanonButton>
 *   );
 * }
 * ```
 */
export const CanonButton = forwardRef<HTMLElement, ReactCanonButtonProps>(
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

      element.addEventListener('canon-click', handleClick);
      return () => {
        element.removeEventListener('canon-click', handleClick);
      };
    }, [onClick, buttonRef]);

    // Using createElement to avoid JSX issues with custom elements
    return React.createElement(
      'canon-button',
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

CanonButton.displayName = 'CanonButton';

export type { ButtonVariant, ButtonSize };
