import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IchangeValues } from '../../../../../commonSRC/psServices/models/ps-common-interface';
import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovPreferredLanguageExposed } from './ps-lov-preferred-language.component.interfaces';


/**
 * @author Aftab.Ali
 * @since 22/10/2019
 *
 * <p> PsLovPreferredLanguageComponent is responsile for fetching language based on lovTypeId(ID for PreferredLanguages).</p>
 */
@Component({
  selector: 'ps-lov-preferred-language',
  templateUrl: './ps-lov-preferred-language.component.html',
  styleUrls: ['./ps-lov-preferred-language.component.scss'],
})
export class PsLovPreferredLanguageComponent extends PsDropdownLovComponent implements OnInit {

  @Input() options: IOptionsPsLovPreferredLanguageExposed;

  public defaultOptions: IOptionsPsDropdownLov = {
    // labelKey: 'preferred_language_key',
    // placeHolder: 'select_preferred_language',
    iconLocation: PsCommonBusinessSettings.ICON_LOCATION_LANGUAGE,
    lovTypeId: CommonBussinessConstant.LOV_TYPE_ID_PREFERRED_LANGUAGES
  };

  constructor(
    commonProvService: PsCommonService,
    logger: LoggerService
  ) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.defaultOptions.labelKey = this.commonProv.translate('LANGUAGE_KEY');
    this.commonProv.copyObject(this.defaultOptions, this.options, false);
    // this.defaultOptions.labelKey = this.commonProv.translate('LANGUAGE_KEY');
  }
  ngAfterContentInit() {

  }

  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
    this.commonProv.presentProfile.next(false);
  }

  stopBannersTimer() {
    this.commonProv.presentProfile.next(true);
  }
}
