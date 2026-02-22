import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ButtonVariant, ButtonSize } from './types';

/**
 * Canon Button Web Component
 *
 * @element canon-button
 * @slot - Default slot for button content
 * @fires click - Fired when the button is clicked
 *
 * @csspart button - The button element
 *
 * @example
 * ```html
 * <canon-button variant="primary" size="medium">Click me</canon-button>
 * ```
 */
@customElement('canon-button')
export class CanonButton extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
    }

    :host([full-width]) {
      display: block;
      width: 100%;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      border: none;
      border-radius: 0.375rem;
      font-family: inherit;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      width: 100%;
    }

    /* Sizes */
    .button--small {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    .button--medium {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      line-height: 1.5rem;
    }

    .button--large {
      padding: 0.75rem 1.5rem;
      font-size: 1.125rem;
      line-height: 1.75rem;
    }

    /* Variants */
    .button--primary {
      background-color: #2563eb;
      color: white;
    }

    .button--primary:hover:not(:disabled) {
      background-color: #1d4ed8;
    }

    .button--secondary {
      background-color: #6b7280;
      color: white;
    }

    .button--secondary:hover:not(:disabled) {
      background-color: #4b5563;
    }

    .button--outline {
      background-color: transparent;
      border: 1px solid #d1d5db;
      color: #374151;
    }

    .button--outline:hover:not(:disabled) {
      background-color: #f3f4f6;
    }

    .button--ghost {
      background-color: transparent;
      color: #374151;
    }

    .button--ghost:hover:not(:disabled) {
      background-color: #f3f4f6;
    }

    .button--danger {
      background-color: #dc2626;
      color: white;
    }

    .button--danger:hover:not(:disabled) {
      background-color: #b91c1c;
    }

    /* States */
    .button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .button--loading {
      position: relative;
      color: transparent;
    }

    .button--loading::after {
      content: '';
      position: absolute;
      width: 1rem;
      height: 1rem;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.75s linear infinite;
    }

    .button--primary.button--loading::after,
    .button--secondary.button--loading::after,
    .button--danger.button--loading::after {
      border-color: white;
      border-right-color: transparent;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .button:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }
  `;

  /** Button variant style */
  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'primary';

  /** Button size */
  @property({ type: String, reflect: true })
  size: ButtonSize = 'medium';

  /** Whether the button is disabled */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Whether the button shows a loading state */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** Button type attribute */
  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  /** Full width button */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  private _handleClick(e: MouseEvent) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('canon-click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e },
      })
    );
  }

  override render() {
    const classes = [
      'button',
      `button--${this.variant}`,
      `button--${this.size}`,
      this.loading ? 'button--loading' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <button
        part="button"
        class=${classes}
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-busy=${this.loading}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'canon-button': CanonButton;
  }
}
