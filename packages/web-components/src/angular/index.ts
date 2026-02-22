// Angular wrappers for all Oxi web components
// Import this module to use all components with Angular

export { OxiButtonComponent, OxiButtonModule } from "../button/angular";
export type { ButtonVariant, ButtonSize } from "../button/types";

export { OxiTextFieldComponent, OxiTextFieldModule } from "../text-field/angular";
export type { TextFieldType, TextFieldSize } from "../text-field/types";

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { OxiButtonModule } from "../button/angular";
import { OxiTextFieldModule } from "../text-field/angular";

/**
 * Angular module that includes all Oxi web components
 *
 * @example
 * ```typescript
 * import { OxiComponentsModule } from '@oxi-ui/web-components/angular';
 *
 * @NgModule({
 *   imports: [OxiComponentsModule],
 * })
 * export class AppModule {}
 * ```
 */
@NgModule({
  imports: [OxiButtonModule, OxiTextFieldModule],
  exports: [OxiButtonModule, OxiTextFieldModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OxiComponentsModule {}
