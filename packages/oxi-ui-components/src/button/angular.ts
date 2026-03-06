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
 * Angular wrapper for the OxiUI Button web component
 *
 * @example
 * ```typescript
 * import { OxiButtonComponent } from '@oxi-ui/web-components/button/angular';
 *
 * @Component({
 *   selector: 'app-example',
 *   template: `
 *     <oxi-button-wrapper
 *       variant="primary"
 *       (click)="handleClick($event)">
 *       Click me
 *     </oxi-button-wrapper>
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
  selector: 'oxi-button-wrapper',
  template: `
    <oxi-button
      [attr.variant]="variant"
      [attr.size]="size"
      [attr.disabled]="disabled || null"
      [attr.loading]="loading || null"
      [attr.type]="type"
      [attr.full-width]="fullWidth || null"
      (click)="onOxiUIClick($event)">
      <ng-content></ng-content>
    </oxi-button>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class OxiButtonComponent {
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
  @Output() click = new EventEmitter<CustomEvent>();

  constructor(private elementRef: ElementRef) {}

  onOxiUIClick(event: CustomEvent) {
    this.click.emit(event);
  }
}

/**
 * Angular module for OxiUI Button
 */
@NgModule({
  declarations: [OxiButtonComponent],
  exports: [OxiButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OxiButtonModule {}

export type { ButtonVariant, ButtonSize };
