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
 * Angular wrapper for the Canon Text Field web component
 *
 * @example
 * ```typescript
 * import { CanonTextFieldComponent } from '@canon/web-components/text-field/angular';
 *
 * @Component({
 *   selector: 'app-example',
 *   template: `
 *     <canon-text-field-wrapper
 *       label="Email"
 *       type="email"
 *       [value]="email"
 *       (canonInput)="onEmailInput($event)">
 *     </canon-text-field-wrapper>
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
  selector: 'canon-text-field-wrapper',
  template: `
    <canon-text-field
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
      (canon-input)="onCanonInput($event)"
      (canon-change)="onCanonChange($event)"
      (canon-focus)="onCanonFocus($event)"
      (canon-blur)="onCanonBlur($event)"
    >
    </canon-text-field>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class CanonTextFieldComponent {
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
  @Output() canonInput = new EventEmitter<CustomEvent<{ value: string }>>();

  /** Change event emitter */
  @Output() canonChange = new EventEmitter<CustomEvent<{ value: string }>>();

  /** Focus event emitter */
  @Output() canonFocus = new EventEmitter<CustomEvent>();

  /** Blur event emitter */
  @Output() canonBlur = new EventEmitter<CustomEvent>();

  constructor(private elementRef: ElementRef) {}

  onCanonInput(event: CustomEvent<{ value: string }>) {
    this.canonInput.emit(event);
  }

  onCanonChange(event: CustomEvent<{ value: string }>) {
    this.canonChange.emit(event);
  }

  onCanonFocus(event: CustomEvent) {
    this.canonFocus.emit(event);
  }

  onCanonBlur(event: CustomEvent) {
    this.canonBlur.emit(event);
  }
}

/**
 * Angular module for Canon Text Field
 */
@NgModule({
  declarations: [CanonTextFieldComponent],
  exports: [CanonTextFieldComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CanonTextFieldModule {}

export type { TextFieldType, TextFieldSize };
