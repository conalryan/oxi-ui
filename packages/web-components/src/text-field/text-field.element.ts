import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { TextFieldType, TextFieldSize } from './types';

/**
 * OxiUI Text Field Web Component
 *
 * @element oxi-ui-text-field
 * @fires oxi-ui-input - Fired when the input value changes
 * @fires oxi-ui-change - Fired when the input loses focus after value change
 * @fires oxi-ui-focus - Fired when the input gains focus
 * @fires oxi-ui-blur - Fired when the input loses focus
 *
 * @csspart container - The container element
 * @csspart label - The label element
 * @csspart input - The input element
 * @csspart helper - The helper text element
 * @csspart error - The error text element
 *
 * @example
 * ```html
 * <oxi-text-field
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   required
 * ></oxi-ui-text-field>
 * ```
 */
@customElement('oxi-ui-text-field')
export class OxiUITextField extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .label--required::after {
      content: ' *';
      color: #dc2626;
    }

    .input-wrapper {
      position: relative;
    }

    .input {
      display: block;
      width: 100%;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-family: inherit;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    /* Sizes */
    .input--small {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    .input--medium {
      padding: 0.5rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5rem;
    }

    .input--large {
      padding: 0.75rem 1rem;
      font-size: 1.125rem;
      line-height: 1.75rem;
    }

    /* States */
    .input:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .input:disabled {
      background-color: #f3f4f6;
      color: #9ca3af;
      cursor: not-allowed;
    }

    .input:read-only {
      background-color: #f9fafb;
    }

    .input--error {
      border-color: #dc2626;
    }

    .input--error:focus {
      border-color: #dc2626;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    }

    .helper-text {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .error-text {
      font-size: 0.75rem;
      color: #dc2626;
    }

    .input::placeholder {
      color: #9ca3af;
    }
  `;

  /** Input type */
  @property({ type: String })
  type: TextFieldType = 'text';

  /** Input name */
  @property({ type: String })
  name = '';

  /** Input value */
  @property({ type: String })
  value = '';

  /** Placeholder text */
  @property({ type: String })
  placeholder = '';

  /** Label text */
  @property({ type: String })
  label = '';

  /** Helper text below input */
  @property({ type: String, attribute: 'helper-text' })
  helperText = '';

  /** Error message */
  @property({ type: String, attribute: 'error-text' })
  errorText = '';

  /** Field size */
  @property({ type: String, reflect: true })
  size: TextFieldSize = 'medium';

  /** Whether the field is disabled */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Whether the field is readonly */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /** Whether the field is required */
  @property({ type: Boolean, reflect: true })
  required = false;

  /** Maximum length */
  @property({ type: Number, attribute: 'max-length' })
  maxLength?: number;

  /** Minimum length */
  @property({ type: Number, attribute: 'min-length' })
  minLength?: number;

  /** Pattern for validation */
  @property({ type: String })
  pattern?: string;

  /** Full width field */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  /** Internal focused state */
  @state()
  private _focused = false;

  private _handleInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;

    this.dispatchEvent(
      new CustomEvent('oxi-ui-input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value, originalEvent: e },
      })
    );
  }

  private _handleChange(e: Event) {
    this.dispatchEvent(
      new CustomEvent('oxi-ui-change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value, originalEvent: e },
      })
    );
  }

  private _handleFocus(e: FocusEvent) {
    this._focused = true;
    this.dispatchEvent(
      new CustomEvent('oxi-ui-focus', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e },
      })
    );
  }

  private _handleBlur(e: FocusEvent) {
    this._focused = false;
    this.dispatchEvent(
      new CustomEvent('oxi-ui-blur', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e },
      })
    );
  }

  override render() {
    const inputClasses = [
      'input',
      `input--${this.size}`,
      this.errorText ? 'input--error' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const labelClasses = ['label', this.required ? 'label--required' : '']
      .filter(Boolean)
      .join(' ');

    return html`
      <div class="container" part="container">
        ${this.label
          ? html`<label class=${labelClasses} part="label">${this.label}</label>`
          : ''}
        <div class="input-wrapper">
          <input
            part="input"
            class=${inputClasses}
            type=${this.type}
            name=${this.name}
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            maxlength=${this.maxLength ?? ''}
            minlength=${this.minLength ?? ''}
            pattern=${this.pattern ?? ''}
            aria-invalid=${this.errorText ? 'true' : 'false'}
            aria-describedby=${this.errorText ? 'error' : this.helperText ? 'helper' : ''}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
          />
        </div>
        ${this.errorText
          ? html`<span id="error" class="error-text" part="error">${this.errorText}</span>`
          : this.helperText
            ? html`<span id="helper" class="helper-text" part="helper">${this.helperText}</span>`
            : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'oxi-ui-text-field': OxiUITextField;
  }
}
