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
 * Angular wrapper for the Piloting Button web component
 *
 * @example
 * ```typescript
 * import { PilotingButtonComponent } from '@piloting/web-components/button/angular';
 *
 * @Component({
 *   selector: 'app-example',
 *   template: `
 *     <piloting-button-wrapper
 *       variant="primary"
 *       (pilotingClick)="handleClick($event)">
 *       Click me
 *     </piloting-button-wrapper>
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
  selector: 'piloting-button-wrapper',
  template: `
    <piloting-button
      [attr.variant]="variant"
      [attr.size]="size"
      [attr.disabled]="disabled || null"
      [attr.loading]="loading || null"
      [attr.type]="type"
      [attr.full-width]="fullWidth || null"
      (piloting-click)="onPilotingClick($event)"
    >
      <ng-content></ng-content>
    </piloting-button>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class PilotingButtonComponent {
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
  @Output() pilotingClick = new EventEmitter<CustomEvent>();

  constructor(private elementRef: ElementRef) {}

  onPilotingClick(event: CustomEvent) {
    this.pilotingClick.emit(event);
  }
}

/**
 * Angular module for Piloting Button
 */
@NgModule({
  declarations: [PilotingButtonComponent],
  exports: [PilotingButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PilotingButtonModule {}

export type { ButtonVariant, ButtonSize };
