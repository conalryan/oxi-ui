// Angular wrappers for all Canon web components
// Import this module to use all components with Angular

export { CanonButtonComponent, CanonButtonModule } from '../button/angular';
export type { ButtonVariant, ButtonSize } from '../button/types';

export { CanonTextFieldComponent, CanonTextFieldModule } from '../text-field/angular';
export type { TextFieldType, TextFieldSize } from '../text-field/types';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CanonButtonModule } from '../button/angular';
import { CanonTextFieldModule } from '../text-field/angular';

/**
 * Angular module that includes all Canon web components
 *
 * @example
 * ```typescript
 * import { CanonComponentsModule } from '@canon/web-components/angular';
 *
 * @NgModule({
 *   imports: [CanonComponentsModule],
 * })
 * export class AppModule {}
 * ```
 */
@NgModule({
  imports: [CanonButtonModule, CanonTextFieldModule],
  exports: [CanonButtonModule, CanonTextFieldModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CanonComponentsModule {}
