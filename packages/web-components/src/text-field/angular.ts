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
 * Angular wrapper for the OxiUI Text Field web component
 *
 * @example
 * ```typescript
 * import { OxiUITextFieldComponent } from '@oxi-ui/web-components/text-field/angular';
 *
 * @Component({
 *   selector: 'app-example',
 *   template: `
 *     <oxi-text-field-wrapper
 *       label="Email"
 *       type="email"
 *       [value]="email"
 *       (oxi-uiInput)="onEmailInput($event)">
 *     </oxi-ui-text-field-wrapper>
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
  selector: 'oxi-ui-text-field-wrapper',
  template: `
    <oxi-text-field
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
      (oxi-ui-input)="onOxiUIInput($event)"
      (oxi-ui-change)="onOxiUIChange($event)"
      (oxi-ui-focus)="onOxiUIFocus($event)"
      (oxi-ui-blur)="onOxiUIBlur($event)"
    >
    </oxi-ui-text-field>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class OxiUITextFieldComponent {
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
  @Output() oxi-uiInput = new EventEmitter<CustomEvent<{ value: string }>>();

  /** Change event emitter */
  @Output() oxi-uiChange = new EventEmitter<CustomEvent<{ value: string }>>();

  /** Focus event emitter */
  @Output() oxi-uiFocus = new EventEmitter<CustomEvent>();

  /** Blur event emitter */
  @Output() oxi-uiBlur = new EventEmitter<CustomEvent>();

  constructor(private elementRef: ElementRef) {}

  onOxiUIInput(event: CustomEvent<{ value: string }>) {
    this.oxi-uiInput.emit(event);
  }

  onOxiUIChange(event: CustomEvent<{ value: string }>) {
    this.oxi-uiChange.emit(event);
  }

  onOxiUIFocus(event: CustomEvent) {
    this.oxi-uiFocus.emit(event);
  }

  onOxiUIBlur(event: CustomEvent) {
    this.oxi-uiBlur.emit(event);
  }
}

/**
 * Angular module for OxiUI Text Field
 */
@NgModule({
  declarations: [OxiUITextFieldComponent],
  exports: [OxiUITextFieldComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OxiUITextFieldModule {}

export type { TextFieldType, TextFieldSize };
