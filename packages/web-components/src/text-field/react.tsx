import React, { useRef, useEffect, forwardRef, useCallback } from 'react';
import type { TextFieldType, TextFieldSize, PilotingTextFieldProps } from './types';

// Ensure the web component is imported for side effects
import './text-field.element';

export interface ReactPilotingTextFieldProps extends PilotingTextFieldProps {
  /** Input handler */
  onInput?: (event: CustomEvent<{ value: string }>) => void;
  /** Change handler */
  onChange?: (event: CustomEvent<{ value: string }>) => void;
  /** Focus handler */
  onFocus?: (event: CustomEvent) => void;
  /** Blur handler */
  onBlur?: (event: CustomEvent) => void;
  /** Additional class name */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
}

/**
 * React wrapper for the Piloting Text Field web component
 *
 * @example
 * ```tsx
 * import { PilotingTextField } from '@piloting/web-components/text-field/react';
 *
 * function App() {
 *   const [value, setValue] = useState('');
 *
 *   return (
 *     <PilotingTextField
 *       label="Email"
 *       type="email"
 *       value={value}
 *       onInput={(e) => setValue(e.detail.value)}
 *     />
 *   );
 * }
 * ```
 */
export const PilotingTextField = forwardRef<HTMLElement, ReactPilotingTextFieldProps>(
  (
    {
      type = 'text',
      name,
      value,
      placeholder,
      label,
      helperText,
      errorText,
      size = 'medium',
      disabled = false,
      readonly = false,
      required = false,
      maxLength,
      minLength,
      pattern,
      fullWidth = false,
      onInput,
      onChange,
      onFocus,
      onBlur,
      className,
      style,
    },
    ref
  ) => {
    const innerRef = useRef<HTMLElement>(null);
    const textFieldRef = (ref as React.RefObject<HTMLElement>) || innerRef;

    const handleInput = useCallback(
      (e: Event) => {
        onInput?.(e as CustomEvent<{ value: string }>);
      },
      [onInput]
    );

    const handleChange = useCallback(
      (e: Event) => {
        onChange?.(e as CustomEvent<{ value: string }>);
      },
      [onChange]
    );

    const handleFocus = useCallback(
      (e: Event) => {
        onFocus?.(e as CustomEvent);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: Event) => {
        onBlur?.(e as CustomEvent);
      },
      [onBlur]
    );

    useEffect(() => {
      const element = textFieldRef.current;
      if (!element) return;

      if (onInput) element.addEventListener('piloting-input', handleInput);
      if (onChange) element.addEventListener('piloting-change', handleChange);
      if (onFocus) element.addEventListener('piloting-focus', handleFocus);
      if (onBlur) element.addEventListener('piloting-blur', handleBlur);

      return () => {
        if (onInput) element.removeEventListener('piloting-input', handleInput);
        if (onChange) element.removeEventListener('piloting-change', handleChange);
        if (onFocus) element.removeEventListener('piloting-focus', handleFocus);
        if (onBlur) element.removeEventListener('piloting-blur', handleBlur);
      };
    }, [handleInput, handleChange, handleFocus, handleBlur, onInput, onChange, onFocus, onBlur, textFieldRef]);

    return React.createElement('piloting-text-field', {
      ref: textFieldRef,
      type,
      name,
      value,
      placeholder,
      label,
      'helper-text': helperText,
      'error-text': errorText,
      size,
      disabled: disabled || undefined,
      readonly: readonly || undefined,
      required: required || undefined,
      'max-length': maxLength,
      'min-length': minLength,
      pattern,
      'full-width': fullWidth || undefined,
      class: className,
      style,
    });
  }
);

PilotingTextField.displayName = 'PilotingTextField';

export type { TextFieldType, TextFieldSize };
