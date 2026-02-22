import React, { useRef, useEffect, forwardRef } from "react";
import type { ButtonVariant, ButtonSize, ButtonProps } from "./types";

// Ensure the web component is imported for side effects
import "./button.element";

export interface ReactOxiButtonProps extends ButtonProps {
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
 * import { OxiButton } from '@oxi-ui/web-components/button/react';
 *
 * function App() {
 *   return (
 *     <OxiButton variant="primary" onClick={() => console.log('clicked')}>
 *       Click me
 *     </OxiButton>
 *   );
 * }
 * ```
 */
export const OxiButton = forwardRef<HTMLElement, ReactOxiButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      disabled = false,
      loading = false,
      type = "button",
      fullWidth = false,
      children,
      onClick,
      className,
      style,
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLElement>(null);
    const buttonRef = (ref as React.RefObject<HTMLElement>) || innerRef;

    useEffect(() => {
      const element = buttonRef.current;
      if (!element || !onClick) return;

      const handleClick = (e: Event) => {
        onClick(e as CustomEvent);
      };

      element.addEventListener("click", handleClick);
      return () => {
        element.removeEventListener("click", handleClick);
      };
    }, [onClick, buttonRef]);

    // Using createElement to avoid JSX issues with custom elements
    return React.createElement(
      "oxi-button",
      {
        ref: buttonRef,
        variant,
        size,
        disabled: disabled || undefined,
        loading: loading || undefined,
        type,
        "full-width": fullWidth || undefined,
        class: className,
        style,
      },
      children,
    );
  },
);

OxiButton.displayName = "OxiButton";

export type { ButtonVariant, ButtonSize };
