import React, { useRef, useEffect, forwardRef } from 'react';
import type { ButtonVariant, ButtonSize, PilotingButtonProps } from './types';

// Ensure the web component is imported for side effects
import './button.element';

export interface ReactPilotingButtonProps extends PilotingButtonProps {
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
 * React wrapper for the Piloting Button web component
 *
 * @example
 * ```tsx
 * import { PilotingButton } from '@piloting/web-components/button/react';
 *
 * function App() {
 *   return (
 *     <PilotingButton variant="primary" onClick={() => console.log('clicked')}>
 *       Click me
 *     </PilotingButton>
 *   );
 * }
 * ```
 */
export const PilotingButton = forwardRef<HTMLElement, ReactPilotingButtonProps>(
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

      element.addEventListener('piloting-click', handleClick);
      return () => {
        element.removeEventListener('piloting-click', handleClick);
      };
    }, [onClick, buttonRef]);

    // Using createElement to avoid JSX issues with custom elements
    return React.createElement(
      'piloting-button',
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

PilotingButton.displayName = 'PilotingButton';

export type { ButtonVariant, ButtonSize };
