/**
 * Text field input types
 */
export type TextFieldType = "text" | "password" | "email" | "number" | "tel" | "url" | "search";

/**
 * Text field sizes
 */
export type TextFieldSize = "small" | "medium" | "large";

/**
 * Text field component props
 */
export interface TextFieldProps {
  /** Input type */
  type?: TextFieldType;
  /** Input name */
  name?: string;
  /** Input value */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message */
  errorText?: string;
  /** Field size */
  size?: TextFieldSize;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is readonly */
  readonly?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Maximum length */
  maxLength?: number;
  /** Minimum length */
  minLength?: number;
  /** Pattern for validation */
  pattern?: string;
  /** Full width field */
  fullWidth?: boolean;
}
