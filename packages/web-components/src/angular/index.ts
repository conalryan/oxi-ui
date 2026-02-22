// Angular wrappers for all Piloting web components
// Import this module to use all components with Angular

export { PilotingButtonComponent, PilotingButtonModule } from '../button/angular';
export type { ButtonVariant, ButtonSize } from '../button/types';

export { PilotingTextFieldComponent, PilotingTextFieldModule } from '../text-field/angular';
export type { TextFieldType, TextFieldSize } from '../text-field/types';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PilotingButtonModule } from '../button/angular';
import { PilotingTextFieldModule } from '../text-field/angular';

/**
 * Angular module that includes all Piloting web components
 *
 * @example
 * ```typescript
 * import { PilotingComponentsModule } from '@piloting/web-components/angular';
 *
 * @NgModule({
 *   imports: [PilotingComponentsModule],
 * })
 * export class AppModule {}
 * ```
 */
@NgModule({
  imports: [PilotingButtonModule, PilotingTextFieldModule],
  exports: [PilotingButtonModule, PilotingTextFieldModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PilotingComponentsModule {}
