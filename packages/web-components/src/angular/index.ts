// Angular wrappers for all OxiUI web components
// Import this module to use all components with Angular

export { OxiUIButtonComponent, OxiUIButtonModule } from '../button/angular';
export type { ButtonVariant, ButtonSize } from '../button/types';

export { OxiUITextFieldComponent, OxiUITextFieldModule } from '../text-field/angular';
export type { TextFieldType, TextFieldSize } from '../text-field/types';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OxiUIButtonModule } from '../button/angular';
import { OxiUITextFieldModule } from '../text-field/angular';

/**
 * Angular module that includes all OxiUI web components
 *
 * @example
 * ```typescript
 * import { OxiUIComponentsModule } from '@oxi-ui/web-components/angular';
 *
 * @NgModule({
 *   imports: [OxiUIComponentsModule],
 * })
 * export class AppModule {}
 * ```
 */
@NgModule({
  imports: [OxiUIButtonModule, OxiUITextFieldModule],
  exports: [OxiUIButtonModule, OxiUITextFieldModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OxiUIComponentsModule {}
