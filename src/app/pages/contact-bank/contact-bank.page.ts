import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsEntityPhoneNumberExposed } from 'src/app/commonBussinessSRC/psComponents/ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.interfaces';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsContainerPanel, IOptionsPsFileUploadComponent, IOptionsPsKeyinTextarea, IOptionsPsTemplateForm } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'contact-bank',
  templateUrl: './contact-bank.page.html',
})
export class ContactBankPage extends OmniBasePage implements OnInit {

  public formGroup: FormGroup = new FormGroup({});

  public options: IOptionsPsTemplateForm = {
    group: this.formGroup,
    submitOptions: {
      group: this.formGroup,
      submitServiceUrl: '/////////********/////////',
    }
  };


  public panelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'contact_us_key',
    expanded: true
  };

  public nameOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'full_name_key',
    placeHolder: 'full_name_key',
    fcName: 'full_name',
    group: this.formGroup
  };
  public emailOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'email_key',
    placeHolder: 'email_key',
    fcName: 'email',
    group: this.formGroup
  };

  public phoneNumberOptions: IOptionsPsEntityPhoneNumberExposed = {
    fcName: 'mobileNumber',
    labelKey: 'phone_number_key',
    placeHolder: 'phone_number_key',
    group: this.formGroup
  };

  public subjectOptions: IOptionsPsEntityPhoneNumberExposed = {
    fcName: 'subject',
    labelKey: 'subject_key',
    placeHolder: 'subject_key',
    group: this.formGroup
  };

  fileUploadOptions: IOptionsPsFileUploadComponent = {
    multiple: true,
    fcName: 'uploadedFiles',
    group: this.formGroup,
    uploadIconName: 'attach'
  };

  commentsOptions: IOptionsPsKeyinTextarea = {
    labelKey: 'comments_key',
    rows: '3',
    cols: '10',
    fcName: 'accountDeactivationReasonDetail',
    group: this.formGroup
  };
  constructor(public commonService: PsCommonService, public logger: LoggerService) {
    super();
  }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
  }

}
