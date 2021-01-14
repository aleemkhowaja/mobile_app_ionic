import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComplexTermsAndConditionsModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-terms-and-conditions/ps-complex-terms-and-conditions.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsGalleryVerificationImagesModule } from '../psComponents/ps-action-gallery/ps-gallery-verification-images/ps-gallery-verification-images.module';
import { PsImageLoggedinUserModule } from '../psComponents/ps-action-image/ps-image-loggedin-user/ps-image-loggedin-user.module';
import { PsComplexUserProfileMenuModule } from '../psComponents/ps-complex-components/ps-complex-user-profile-menu/ps-complex-user-profile-menu.module';
import { PsLovPreferredLanguageComponentModule } from '../psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-preferred-language/ps-lov-preferred-language.component.module';
import { ComponentTestComponent } from './component-test.component';

@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    PsComplexTermsAndConditionsModule,
    PsGalleryVerificationImagesModule,
    PsComplexUserProfileMenuModule,
    PsImageLoggedinUserModule,
    PsLovPreferredLanguageComponentModule,

  ],
  declarations: [ComponentTestComponent],
  exports: [ComponentTestComponent],
  entryComponents: [
    ComponentTestComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentTestComponentModule { }
