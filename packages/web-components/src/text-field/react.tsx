import React, { useRef, useEffect, forwardRef, useCallback } from 'react';
import type { TextFieldType, TextFieldSize, CanonTextFieldProps } from './types';

// Ensure the web component is imported for side effects
import './text-field.element';

export interface ReactCanonTextFieldProps extends CanonTextFieldProps {
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
 * React wrapper for the Canon Text Field web component
 *
 * @example
 * ```tsx
 * import { CanonTextField } from '@canon/web-components/text-field/react';
 *
 * function App() {
 *   const [value, setValue] = useState('');
 *
 *   return (
 *     <CanonTextField
 *       label="Email"
 *       type="email"
 *       value={value}
 *       onInput={(e) => setValue(e.detail.value)}
 *     />
 *   );
 * }
 * ```
 */
export const CanonTextField = forwardRef<HTMLElement, ReactCanonTextFieldProps>(
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

      if (onInput) element.addEventListener('canon-input', handleInput);
      if (onChange) element.addEventListener('canon-change', handleChange);
      if (onFocus) element.addEventListener('canon-focus', handleFocus);
      if (onBlur) element.addEventListener('canon-blur', handleBlur);

      return () => {
        if (onInput) element.removeEventListener('canon-input', handleInput);
        if (onChange) element.removeEventListener('canon-change', handleChange);
        if (onFocus) element.removeEventListener('canon-focus', handleFocus);
        if (onBlur) element.removeEventListener('canon-blur', handleBlur);
      };
    }, [handleInput, handleChange, handleFocus, handleBlur, onInput, onChange, onFocus, onBlur, textFieldRef]);

    return React.createElement('canon-text-field', {
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

CanonTextField.displayName = 'CanonTextField';

export type { TextFieldType, TextFieldSize };
