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
 * import { OxiUIButtonComponent } from '@oxi-ui/web-components/button/angular';
 *
 * @Component({
 *   selector: 'app-example',
 *   template: `
 *     <oxi-button-wrapper
 *       variant="primary"
 *       (oxi-uiClick)="handleClick($event)">
 *       Click me
 *     </oxi-ui-button-wrapper>
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
  selector: 'oxi-ui-button-wrapper',
  template: `
    <oxi-button
      [attr.variant]="variant"
      [attr.size]="size"
      [attr.disabled]="disabled || null"
      [attr.loading]="loading || null"
      [attr.type]="type"
      [attr.full-width]="fullWidth || null"
      (oxi-ui-click)="onOxiUIClick($event)"
    >
      <ng-content></ng-content>
    </oxi-ui-button>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class OxiUIButtonComponent {
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
  @Output() oxi-uiClick = new EventEmitter<CustomEvent>();

  constructor(private elementRef: ElementRef) {}

  onOxiUIClick(event: CustomEvent) {
    this.oxi-uiClick.emit(event);
  }
}

/**
 * Angular module for OxiUI Button
 */
@NgModule({
  declarations: [OxiUIButtonComponent],
  exports: [OxiUIButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OxiUIButtonModule {}

export type { ButtonVariant, ButtonSize };
