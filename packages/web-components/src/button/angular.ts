import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
import type { ButtonVariant, ButtonSize } from './types';

// Ensure the web component is imported for side effects
import './button.element';

/**
 * Angular wrapper for the Canon Button web component
 *
 * @example
 * ```typescript
 * import { CanonButtonComponent } from '@canon/web-components/button/angular';
 *
 * @Component({
 *   selector: 'app-example',
 *   template: `
 *     <canon-button-wrapper
 *       variant="primary"
 *       (canonClick)="handleClick($event)">
 *       Click me
 *     </canon-button-wrapper>
 *   `
 * })
 * export class ExampleComponent {
 *   handleClick(event: CustomEvent) {
 *     console.log('clicked', event);
 *   }
 * }
 * ```
 */
@Component({
  selector: 'canon-button-wrapper',
  template: `
    <canon-button
      [attr.variant]="variant"
      [attr.size]="size"
      [attr.disabled]="disabled || null"
      [attr.loading]="loading || null"
      [attr.type]="type"
      [attr.full-width]="fullWidth || null"
      (canon-click)="onCanonClick($event)"
    >
      <ng-content></ng-content>
    </canon-button>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class CanonButtonComponent {
  /** Button variant style */
  @Input() variant: ButtonVariant = 'primary';

  /** Button size */
  @Input() size: ButtonSize = 'medium';

  /** Whether the button is disabled */
  @Input() disabled = false;

  /** Whether the button shows a loading state */
  @Input() loading = false;

  /** Button type attribute */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** Full width button */
  @Input() fullWidth = false;

  /** Click event emitter */
  @Output() canonClick = new EventEmitter<CustomEvent>();

  constructor(private elementRef: ElementRef) {}

  onCanonClick(event: CustomEvent) {
    this.canonClick.emit(event);
  }
}

/**
 * Angular module for Canon Button
 */
@NgModule({
  declarations: [CanonButtonComponent],
  exports: [CanonButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CanonButtonModule {}

export type { ButtonVariant, ButtonSize };
