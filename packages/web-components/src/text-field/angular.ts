import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
import type { TextFieldType, TextFieldSize } from './types';

// Ensure the web component is imported for side effects
import './text-field.element';

/**
 * Angular wrapper for the Piloting Text Field web component
 *
 * @example
 * ```typescript
 * import { PilotingTextFieldComponent } from '@piloting/web-components/text-field/angular';
 *
 * @Component({
 *   selector: 'app-example',
 *   template: `
 *     <piloting-text-field-wrapper
 *       label="Email"
 *       type="email"
 *       [value]="email"
 *       (pilotingInput)="onEmailInput($event)">
 *     </piloting-text-field-wrapper>
 *   `
 * })
 * export class ExampleComponent {
 *   email = '';
 *
 *   onEmailInput(event: CustomEvent<{ value: string }>) {
 *     this.email = event.detail.value;
 *   }
 * }
 * ```
 */
@Component({
  selector: 'piloting-text-field-wrapper',
  template: `
    <piloting-text-field
      [attr.type]="type"
      [attr.name]="name"
      [attr.value]="value"
      [attr.placeholder]="placeholder"
      [attr.label]="label"
      [attr.helper-text]="helperText"
      [attr.error-text]="errorText"
      [attr.size]="size"
      [attr.disabled]="disabled || null"
      [attr.readonly]="readonly || null"
      [attr.required]="required || null"
      [attr.max-length]="maxLength"
      [attr.min-length]="minLength"
      [attr.pattern]="pattern"
      [attr.full-width]="fullWidth || null"
      (piloting-input)="onPilotingInput($event)"
      (piloting-change)="onPilotingChange($event)"
      (piloting-focus)="onPilotingFocus($event)"
      (piloting-blur)="onPilotingBlur($event)"
    >
    </piloting-text-field>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class PilotingTextFieldComponent {
  /** Input type */
  @Input() type: TextFieldType = 'text';

  /** Input name */
  @Input() name = '';

  /** Input value */
  @Input() value = '';

  /** Placeholder text */
  @Input() placeholder = '';

  /** Label text */
  @Input() label = '';

  /** Helper text below input */
  @Input() helperText = '';

  /** Error message */
  @Input() errorText = '';

  /** Field size */
  @Input() size: TextFieldSize = 'medium';

  /** Whether the field is disabled */
  @Input() disabled = false;

  /** Whether the field is readonly */
  @Input() readonly = false;

  /** Whether the field is required */
  @Input() required = false;

  /** Maximum length */
  @Input() maxLength?: number;

  /** Minimum length */
  @Input() minLength?: number;

  /** Pattern for validation */
  @Input() pattern?: string;

  /** Full width field */
  @Input() fullWidth = false;

  /** Input event emitter */
  @Output() pilotingInput = new EventEmitter<CustomEvent<{ value: string }>>();

  /** Change event emitter */
  @Output() pilotingChange = new EventEmitter<CustomEvent<{ value: string }>>();

  /** Focus event emitter */
  @Output() pilotingFocus = new EventEmitter<CustomEvent>();

  /** Blur event emitter */
  @Output() pilotingBlur = new EventEmitter<CustomEvent>();

  constructor(private elementRef: ElementRef) {}

  onPilotingInput(event: CustomEvent<{ value: string }>) {
    this.pilotingInput.emit(event);
  }

  onPilotingChange(event: CustomEvent<{ value: string }>) {
    this.pilotingChange.emit(event);
  }

  onPilotingFocus(event: CustomEvent) {
    this.pilotingFocus.emit(event);
  }

  onPilotingBlur(event: CustomEvent) {
    this.pilotingBlur.emit(event);
  }
}

/**
 * Angular module for Piloting Text Field
 */
@NgModule({
  declarations: [PilotingTextFieldComponent],
  exports: [PilotingTextFieldComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PilotingTextFieldModule {}

export type { TextFieldType, TextFieldSize };
