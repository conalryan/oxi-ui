import React, { useRef, useEffect, forwardRef, useCallback } from 'react';
import type { TextFieldType, TextFieldSize, OxiUITextFieldProps } from './types';

// Ensure the web component is imported for side effects
import './text-field.element';

export interface ReactOxiUITextFieldProps extends OxiUITextFieldProps {
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
 * React wrapper for the OxiUI Text Field web component
 *
 * @example
 * ```tsx
 * import { OxiUITextField } from '@oxi-ui/web-components/text-field/react';
 *
 * function App() {
 *   const [value, setValue] = useState('');
 *
 *   return (
 *     <OxiUITextField
 *       label="Email"
 *       type="email"
 *       value={value}
 *       onInput={(e) => setValue(e.detail.value)}
 *     />
 *   );
 * }
 * ```
 */
export const OxiUITextField = forwardRef<HTMLElement, ReactOxiUITextFieldProps>(
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

      if (onInput) element.addEventListener('oxi-ui-input', handleInput);
      if (onChange) element.addEventListener('oxi-ui-change', handleChange);
      if (onFocus) element.addEventListener('oxi-ui-focus', handleFocus);
      if (onBlur) element.addEventListener('oxi-ui-blur', handleBlur);

      return () => {
        if (onInput) element.removeEventListener('oxi-ui-input', handleInput);
        if (onChange) element.removeEventListener('oxi-ui-change', handleChange);
        if (onFocus) element.removeEventListener('oxi-ui-focus', handleFocus);
        if (onBlur) element.removeEventListener('oxi-ui-blur', handleBlur);
      };
    }, [handleInput, handleChange, handleFocus, handleBlur, onInput, onChange, onFocus, onBlur, textFieldRef]);

    return React.createElement('oxi-ui-text-field', {
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

OxiUITextField.displayName = 'OxiUITextField';

export type { TextFieldType, TextFieldSize };
