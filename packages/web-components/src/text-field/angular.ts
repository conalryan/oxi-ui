import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from "@angular/core";
import type { TextFieldType, TextFieldSize } from "./types";

// Ensure the web component is imported for side effects
import "./text-field.element";

/**
 * Angular wrapper for the OxiUI Text Field web component
 *
 * @example
 * ```typescript
 * import { OxiTextFieldComponent } from '@/web-components/text-field/angular';
 *
 * @Component({
 *   selector: 'app-example',
 *   template: `
 *     <oxi-text-field-wrapper
 *       label="Email"
 *       type="email"
 *       [value]="email"
 *       (input)="onEmailInput($event)">
 *     </oxi-text-field-wrapper>
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
  selector: "oxi-text-field-wrapper",
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
      (input)="onInput($event)"
      (change)="onChange($event)"
      (focus)="onFocus($event)"
      (blur)="onBlur($event)"
    >
    </oxi-text-field>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class OxiTextFieldComponent {
  /** Input type */
  @Input() type: TextFieldType = "text";

  /** Input name */
  @Input() name = "";

  /** Input value */
  @Input() value = "";

  /** Placeholder text */
  @Input() placeholder = "";

  /** Label text */
  @Input() label = "";

  /** Helper text below input */
  @Input() helperText = "";

  /** Error message */
  @Input() errorText = "";

  /** Field size */
  @Input() size: TextFieldSize = "medium";

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
  @Output() input = new EventEmitter<CustomEvent<{ value: string }>>();

  /** Change event emitter */
  @Output() change = new EventEmitter<CustomEvent<{ value: string }>>();

  /** Focus event emitter */
  @Output() focus = new EventEmitter<CustomEvent>();

  /** Blur event emitter */
  @Output() blur = new EventEmitter<CustomEvent>();

  constructor(private elementRef: ElementRef) {}

  onInput(event: CustomEvent<{ value: string }>) {
    this.input.emit(event);
  }

  onChange(event: CustomEvent<{ value: string }>) {
    this.change.emit(event);
  }

  onFocus(event: CustomEvent) {
    this.focus.emit(event);
  }

  onBlur(event: CustomEvent) {
    this.blur.emit(event);
  }
}

/**
 * Angular module for OxiUI Text Field
 */
@NgModule({
  declarations: [OxiTextFieldComponent],
  exports: [OxiTextFieldComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OxiTextFieldModule {}

export type { TextFieldType, TextFieldSize };
