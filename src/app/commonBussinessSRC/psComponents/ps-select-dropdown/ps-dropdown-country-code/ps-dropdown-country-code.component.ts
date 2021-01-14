import { Component, Input, OnInit } from '@angular/core';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';

import { PsSelectDropdownComponent } from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from '../../../../commonSRC/psServices/logger/logger.service';
import { IOptionsPsSelectDropdown, IPsSelect } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsDropdownCountryCodeExposed } from './ps-dropdown-country-code.component.interfaces';

@Component({
  selector: 'ps-dropdown-country-code',
  templateUrl: './ps-dropdown-country-code.component.html',
  styleUrls: ['./ps-dropdown-country-code.component.scss'],
})
export class PsDropdownCountryCodeComponent extends PsSelectDropdownComponent implements OnInit {
  @Input() options: IOptionsPsDropdownCountryCodeExposed;
  selectOptions: IOptionsPsSelectDropdown = {
    placeHolder: 'countries_key',
    labelKey: 'countries_key',
  };
  public flagsLocation;

  constructor(commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.flagsLocation = PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + 'countries/';
    this.commonProv.copyObject(this.selectOptions, this.options);
    this.selectOptions.listOfOptions = this.loadCountries();
  }
  onCountryCodechange(event: IPsSelect) {
    if (event !== null && event !== undefined) {
    this.value = event.itemValue;
    this.onPsChange.emit(event);
    this.selectOptions.placeHolder = '';
    }
  }

  loadCountries() {
    const countries = [
      {
        name: 'Afghanistan',
        itemValue: '+93',
        additionalDescr: 'AF',
        iconUrl: this.flagsLocation.concat('af.png'),
        description: '+93',
        disableAdditionalDescrOnSelect: true,
        selectedObj:
        {
          name: 'Afghanistan',
          itemValue: '+93',
          additionalDescr: 'AF',
          iconUrl: this.flagsLocation.concat('af.png'),
          description: '+93',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'United States',
        itemValue: '+1',
        additionalDescr: 'US',
        iconUrl: this.flagsLocation.concat('us.png'),
        description: '+1',
        disableAdditionalDescrOnSelect: true,
        selectedObj:
        {
          name: 'United States',
          itemValue: '+1',
          additionalDescr: 'US',
          iconUrl: this.flagsLocation.concat('us.png'),
          description: '+1',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Albania',
        itemValue: '+355',
        additionalDescr: 'AL',
        iconUrl: this.flagsLocation.concat('al.png'),
        description: '+355',
        disableAdditionalDescrOnSelect: true,
        selectedObj:
        {
          name: 'Albania',
          itemValue: '+355',
          additionalDescr: 'AL',
          iconUrl: this.flagsLocation.concat('al.png'),
          description: '+355',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Algeria',
        itemValue: '+213',
        additionalDescr: 'DZ',
        iconUrl: this.flagsLocation.concat('dz.png'),
        description: '+213',
        disableAdditionalDescrOnSelect: true,
        selectedObj:
        {
          name: 'Algeria',
          itemValue: '+213',
          additionalDescr: 'DZ',
          iconUrl: this.flagsLocation.concat('dz.png'),
          description: '+213',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'AmericanSamoa',
        itemValue: '+1 684',
        additionalDescr: 'AS',
        iconUrl: this.flagsLocation.concat('as.png'),
        description: '+1 684',
        disableAdditionalDescrOnSelect: true,
        selectedObj:
        {
          name: 'AmericanSamoa',
          itemValue: '+1 684',
          additionalDescr: 'AS',
          iconUrl: this.flagsLocation.concat('as.png'),
          description: '+1 684',
          disableAdditionalDescrOnSelect: true,
        }

      },
      {
        name: 'Andorra',
        itemValue: '+376',
        additionalDescr: 'AD',
        iconUrl: this.flagsLocation.concat('ad.png'),
        description: '+376',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Andorra',
          itemValue: '+376',
          additionalDescr: 'AD',
          iconUrl: this.flagsLocation.concat('ad.png'),
          description: '+376',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Angola',
        itemValue: '+244',
        additionalDescr: 'AO',
        iconUrl: this.flagsLocation.concat('ao.png'),
        description: '+244',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Angola',
          itemValue: '+244',
          additionalDescr: 'AO',
          iconUrl: this.flagsLocation.concat('ao.png'),
          description: '+244',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Anguilla',
        itemValue: '+1 264',
        additionalDescr: 'AI',
        iconUrl: this.flagsLocation.concat('ai.png'),
        description: '+1 264',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Anguilla',
          itemValue: '+1 264',
          additionalDescr: 'AI',
          iconUrl: this.flagsLocation.concat('ai.png'),
          description: '+1 264',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Antigua and Barbuda',
        itemValue: '+1268',
        additionalDescr: 'AG',
        iconUrl: this.flagsLocation.concat('ag.png'),
        description: '+1268',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Antigua and Barbuda',
          itemValue: '+1268',
          additionalDescr: 'AG',
          iconUrl: this.flagsLocation.concat('ag.png'),
          description: '+1268',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Argentina',
        itemValue: '+54',
        additionalDescr: 'AR',
        iconUrl: this.flagsLocation.concat('ar.png'),
        description: '+54',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Argentina',
          itemValue: '+54',
          additionalDescr: 'AR',
          iconUrl: this.flagsLocation.concat('ar.png'),
          description: '+54',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Armenia',
        itemValue: '+374',
        additionalDescr: 'AM',
        iconUrl: this.flagsLocation.concat('am.png'),
        description: '+374',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Armenia',
          itemValue: '+374',
          additionalDescr: 'AM',
          iconUrl: this.flagsLocation.concat('am.png'),
          description: '+374',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Aruba',
        itemValue: '+297',
        additionalDescr: 'AW',
        iconUrl: this.flagsLocation.concat('aw.png'),
        description: '+297',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Aruba',
          itemValue: '+297',
          additionalDescr: 'AW',
          iconUrl: this.flagsLocation.concat('aw.png'),
          description: '+297',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Australia',
        itemValue: '+61',
        additionalDescr: 'AU',
        iconUrl: this.flagsLocation.concat('au.png'),
        description: '+61',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Australia',
          itemValue: '+61',
          additionalDescr: 'AU',
          iconUrl: this.flagsLocation.concat('au.png'),
          description: '+61',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Austria',
        itemValue: '+43',
        additionalDescr: 'AT',
        iconUrl: this.flagsLocation.concat('at.png'),
        description: '+43',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Austria',
          itemValue: '+43',
          additionalDescr: 'AT',
          iconUrl: this.flagsLocation.concat('at.png'),
          description: '+43',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Azerbaijan',
        itemValue: '+994',
        additionalDescr: 'AZ',
        iconUrl: this.flagsLocation.concat('az.png'),
        description: '+994',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Azerbaijan',
          itemValue: '+994',
          additionalDescr: 'AZ',
          iconUrl: this.flagsLocation.concat('az.png'),
          description: '+994',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Bahamas',
        itemValue: '+1 242',
        additionalDescr: 'BS',
        iconUrl: this.flagsLocation.concat('bs.png'),
        description: '+1 242',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Bahamas',
          itemValue: '+1 242',
          additionalDescr: 'BS',
          iconUrl: this.flagsLocation.concat('bs.png'),
          description: '+1 242',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Bahrain',
        itemValue: '+973',
        additionalDescr: 'BH',
        iconUrl: this.flagsLocation.concat('bh.png'),
        description: '+973',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Bahrain',
          itemValue: '+973',
          additionalDescr: 'BH',
          iconUrl: this.flagsLocation.concat('bh.png'),
          description: '+973',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Bangladesh',
        itemValue: '+880',
        additionalDescr: 'BD',
        iconUrl: this.flagsLocation.concat('bd.png'),
        description: '+880',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Bangladesh',
          itemValue: '+880',
          additionalDescr: 'BD',
          iconUrl: this.flagsLocation.concat('bd.png'),
          description: '+880',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Barbados',
        itemValue: '+1 246',
        additionalDescr: 'BB',
        iconUrl: this.flagsLocation.concat('bb.png'),
        description: '+1 246',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Barbados',
          itemValue: '+1 246',
          additionalDescr: 'BB',
          iconUrl: this.flagsLocation.concat('bb.png'),
          description: '+1 246',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Belarus',
        itemValue: '+375',
        additionalDescr: 'BY',
        iconUrl: this.flagsLocation.concat('by.png'),
        description: '+375',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Belarus',
          itemValue: '+375',
          additionalDescr: 'BY',
          iconUrl: this.flagsLocation.concat('by.png'),
          description: '+375',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Belgium',
        itemValue: '+32',
        additionalDescr: 'BE',
        iconUrl: this.flagsLocation.concat('be.png'),
        description: '+32',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Belgium',
          itemValue: '+32',
          additionalDescr: 'BE',
          iconUrl: this.flagsLocation.concat('be.png'),
          description: '+32',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Belize',
        itemValue: '+501',
        additionalDescr: 'BZ',
        iconUrl: this.flagsLocation.concat('bz.png'),
        description: '+501',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Belize',
          itemValue: '+501',
          additionalDescr: 'BZ',
          iconUrl: this.flagsLocation.concat('bz.png'),
          description: '+501',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Benin',
        itemValue: '+229',
        additionalDescr: 'BJ',
        iconUrl: this.flagsLocation.concat('bg.png'),
        description: '+229',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Benin',
          itemValue: '+229',
          additionalDescr: 'BJ',
          iconUrl: this.flagsLocation.concat('bg.png'),
          description: '+229',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Bermuda',
        itemValue: '+1 441',
        additionalDescr: 'BM',
        iconUrl: this.flagsLocation.concat('bm.png'),
        description: '+1 441',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Bermuda',
          itemValue: '+1 441',
          additionalDescr: 'BM',
          iconUrl: this.flagsLocation.concat('bm.png'),
          description: '+1 441',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Bhutan',
        itemValue: '+975',
        additionalDescr: 'BT',
        iconUrl: this.flagsLocation.concat('bt.png'),
        description: '+975',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Bhutan',
          itemValue: '+975',
          additionalDescr: 'BT',
          iconUrl: this.flagsLocation.concat('bt.png'),
          description: '+975',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Bosnia and Herzegovina',
        itemValue: '+387',
        additionalDescr: 'BA',
        iconUrl: this.flagsLocation.concat('ba.png'),
        description: '+387',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Bosnia and Herzegovina',
          itemValue: '+387',
          additionalDescr: 'BA',
          iconUrl: this.flagsLocation.concat('ba.png'),
          description: '+387',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Botswana',
        itemValue: '+267',
        additionalDescr: 'BW',
        iconUrl: this.flagsLocation.concat('bw.png'),
        description: '+267',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Botswana',
          itemValue: '+267',
          additionalDescr: 'BW',
          iconUrl: this.flagsLocation.concat('bw.png'),
          description: '+267',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Brazil',
        itemValue: '+55',
        additionalDescr: 'BR',
        iconUrl: this.flagsLocation.concat('br.png'),
        description: '+55',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Brazil',
          itemValue: '+55',
          additionalDescr: 'BR',
          iconUrl: this.flagsLocation.concat('br.png'),
          description: '+55',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'British Indian Ocean Territory',
        itemValue: '+246',
        additionalDescr: 'IO',
        iconUrl: this.flagsLocation.concat('bg.png'),
        description: '+246',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'British Indian Ocean Territory',
          itemValue: '+246',
          additionalDescr: 'IO',
          iconUrl: this.flagsLocation.concat('bg.png'),
          description: '+246',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Bulgaria',
        itemValue: '+359',
        additionalDescr: 'BG',
        iconUrl: this.flagsLocation.concat('bg.png'),
        description: '+359',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Bulgaria',
          itemValue: '+359',
          additionalDescr: 'BG',
          iconUrl: this.flagsLocation.concat('bg.png'),
          description: '+359',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Burkina Faso',
        itemValue: '+226',
        additionalDescr: 'BF',
        iconUrl: this.flagsLocation.concat('bf.png'),
        description: '+226',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Burkina Faso',
          itemValue: '+226',
          additionalDescr: 'BF',
          iconUrl: this.flagsLocation.concat('bf.png'),
          description: '+226',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Burundi',
        itemValue: '+257',
        additionalDescr: 'BI',
        iconUrl: this.flagsLocation.concat('bi.png'),
        description: '+257',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Burundi',
          itemValue: '+257',
          additionalDescr: 'BI',
          iconUrl: this.flagsLocation.concat('bi.png'),
          description: '+257',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Cambodia',
        itemValue: '+855',
        additionalDescr: 'KH',
        iconUrl: this.flagsLocation.concat('kh.png'),
        description: '+855',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Cambodia',
          itemValue: '+855',
          additionalDescr: 'KH',
          iconUrl: this.flagsLocation.concat('kh.png'),
          description: '+855',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Cameroon',
        itemValue: '+237',
        additionalDescr: 'CM',
        iconUrl: this.flagsLocation.concat('cm.png'),
        description: '+237',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Cameroon',
          itemValue: '+237',
          additionalDescr: 'CM',
          iconUrl: this.flagsLocation.concat('cm.png'),
          description: '+237',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Canada',
        itemValue: '+1',
        additionalDescr: 'CA',
        iconUrl: this.flagsLocation.concat('ca.png'),
        description: '+1',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Canada',
          itemValue: '+1',
          additionalDescr: 'CA',
          iconUrl: this.flagsLocation.concat('ca.png'),
          description: '+1',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Cape Verde',
        itemValue: '+238',
        additionalDescr: 'CV',
        iconUrl: this.flagsLocation.concat('cv.png'),
        description: '+238',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Cape Verde',
          itemValue: '+238',
          additionalDescr: 'CV',
          iconUrl: this.flagsLocation.concat('cv.png'),
          description: '+238',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Cayman Islands',
        itemValue: '+ 345',
        additionalDescr: 'KY',
        iconUrl: this.flagsLocation.concat('ky.png'),
        description: '+345',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Cayman Islands',
          itemValue: '+ 345',
          additionalDescr: 'KY',
          iconUrl: this.flagsLocation.concat('ky.png'),
          description: '+345',
          disableAdditionalDescrOnSelect: true,
        }
      },
      {
        name: 'Central African Republic',
        itemValue: '+236',
        additionalDescr: 'CF',
        iconUrl: this.flagsLocation.concat('cf.png'),
        description: '+236',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Central African Republic',
          itemValue: '+236',
          additionalDescr: 'CF',
          iconUrl: this.flagsLocation.concat('cf.png'),
          description: '+236',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Chad',
        itemValue: '+235',
        additionalDescr: 'TD',
        iconUrl: this.flagsLocation.concat('td.png'),
        description: '+235',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Chad',
          itemValue: '+235',
          additionalDescr: 'TD',
          iconUrl: this.flagsLocation.concat('td.png'),
          description: '+235',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Chile',
        itemValue: '+56',
        additionalDescr: 'CL',
        iconUrl: this.flagsLocation.concat('cl.png'),
        description: '+56',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Chile',
          itemValue: '+56',
          additionalDescr: 'CL',
          iconUrl: this.flagsLocation.concat('cl.png'),
          description: '+56',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'China',
        itemValue: '+86',
        additionalDescr: 'CN',
        iconUrl: this.flagsLocation.concat('cn.png'),
        description: '+86',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'China',
          itemValue: '+86',
          additionalDescr: 'CN',
          iconUrl: this.flagsLocation.concat('cn.png'),
          description: '+86',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Christmas Island',
        itemValue: '+61',
        additionalDescr: 'CX',
        iconUrl: this.flagsLocation.concat('cx.png'),
        description: '+61',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Christmas Island',
          itemValue: '+61',
          additionalDescr: 'CX',
          iconUrl: this.flagsLocation.concat('cx.png'),
          description: '+61',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Colombia',
        itemValue: '+57',
        additionalDescr: 'CO',
        iconUrl: this.flagsLocation.concat('co.png'),
        description: '+57',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Colombia',
          itemValue: '+57',
          additionalDescr: 'CO',
          iconUrl: this.flagsLocation.concat('co.png'),
          description: '+57',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Comoros',
        itemValue: '+269',
        additionalDescr: 'KM',
        iconUrl: this.flagsLocation.concat('km.png'),
        description: '+269',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Comoros',
          itemValue: '+269',
          additionalDescr: 'KM',
          iconUrl: this.flagsLocation.concat('km.png'),
          description: '+269',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Congo',
        itemValue: '+242',
        additionalDescr: 'CG',
        iconUrl: this.flagsLocation.concat('cg.png'),
        description: '+242',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Congo',
          itemValue: '+242',
          additionalDescr: 'CG',
          iconUrl: this.flagsLocation.concat('cg.png'),
          description: '+242',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Cook Islands',
        itemValue: '+682',
        additionalDescr: 'CK',
        iconUrl: this.flagsLocation.concat('ck.png'),
        description: '+682',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Cook Islands',
          itemValue: '+682',
          additionalDescr: 'CK',
          iconUrl: this.flagsLocation.concat('ck.png'),
          description: '+682',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Costa Rica',
        itemValue: '+506',
        additionalDescr: 'CR',
        iconUrl: this.flagsLocation.concat('cr.png'),
        description: '+506',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Costa Rica',
          itemValue: '+506',
          additionalDescr: 'CR',
          iconUrl: this.flagsLocation.concat('cr.png'),
          description: '+506',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Croatia',
        itemValue: '+385',
        additionalDescr: 'HR',
        iconUrl: this.flagsLocation.concat('hr.png'),
        description: '+385',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Croatia',
          itemValue: '+385',
          additionalDescr: 'HR',
          iconUrl: this.flagsLocation.concat('hr.png'),
          description: '+385',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Cuba',
        itemValue: '+53',
        additionalDescr: 'CU',
        iconUrl: this.flagsLocation.concat('cu.png'),
        description: '+53',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Cuba',
          itemValue: '+53',
          additionalDescr: 'CU',
          iconUrl: this.flagsLocation.concat('cu.png'),
          description: '+53',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Cyprus',
        itemValue: '+537',
        additionalDescr: 'CY',
        iconUrl: this.flagsLocation.concat('cy.png'),
        description: '+537',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Cyprus',
          itemValue: '+537',
          additionalDescr: 'CY',
          iconUrl: this.flagsLocation.concat('cy.png'),
          description: '+537',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Czech Republic',
        itemValue: '+420',
        additionalDescr: 'CZ',
        iconUrl: this.flagsLocation.concat('cz.png'),
        description: '+420',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Czech Republic',
          itemValue: '+420',
          additionalDescr: 'CZ',
          iconUrl: this.flagsLocation.concat('cz.png'),
          description: '+420',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Denmark',
        itemValue: '+45',
        additionalDescr: 'DK',
        iconUrl: this.flagsLocation.concat('dk.png'),
        description: '+45',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Denmark',
          itemValue: '+45',
          additionalDescr: 'DK',
          iconUrl: this.flagsLocation.concat('dk.png'),
          description: '+45',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Djibouti',
        itemValue: '+253',
        additionalDescr: 'DJ',
        iconUrl: this.flagsLocation.concat('dj.png'),
        description: '+253',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Djibouti',
          itemValue: '+253',
          additionalDescr: 'DJ',
          iconUrl: this.flagsLocation.concat('dj.png'),
          description: '+253',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Dominica',
        itemValue: '+1 767',
        additionalDescr: 'DM',
        iconUrl: this.flagsLocation.concat('dm.png'),
        description: '+1 767',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Dominica',
          itemValue: '+1 767',
          additionalDescr: 'DM',
          iconUrl: this.flagsLocation.concat('dm.png'),
          description: '+1 767',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Dominican Republic',
        itemValue: '+1 849',
        additionalDescr: 'DO',
        iconUrl: this.flagsLocation.concat('do.png'),
        description: '+1 849',
        disableAdditionalDescrOnSelect: true,
        selectedObj:
        {
          name: 'Dominican Republic',
          itemValue: '+1 849',
          additionalDescr: 'DO',
          iconUrl: this.flagsLocation.concat('do.png'),
          description: '+1 849',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Ecuador',
        itemValue: '+593',
        additionalDescr: 'EC',
        iconUrl: this.flagsLocation.concat('ec.png'),
        description: '+593',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Ecuador',
          itemValue: '+593',
          additionalDescr: 'EC',
          iconUrl: this.flagsLocation.concat('ec.png'),
          description: '+593',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Egypt',
        itemValue: '+20',
        additionalDescr: 'EG',
        iconUrl: this.flagsLocation.concat('eg.png'),
        description: '+20',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Egypt',
          itemValue: '+20',
          additionalDescr: 'EG',
          iconUrl: this.flagsLocation.concat('eg.png'),
          description: '+20',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'El Salvador',
        itemValue: '+503',
        additionalDescr: 'SV',
        iconUrl: this.flagsLocation.concat('sv.png'),
        description: '+503',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'El Salvador',
          itemValue: '+503',
          additionalDescr: 'SV',
          iconUrl: this.flagsLocation.concat('sv.png'),
          description: '+503',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Equatorial Guinea',
        itemValue: '+240',
        additionalDescr: 'GQ',
        iconUrl: this.flagsLocation.concat('gq.png'),
        description: '+240',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Equatorial Guinea',
          itemValue: '+240',
          additionalDescr: 'GQ',
          iconUrl: this.flagsLocation.concat('gq.png'),
          description: '+240',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Eritrea',
        itemValue: '+291',
        additionalDescr: 'ER',
        iconUrl: this.flagsLocation.concat('er.png'),
        description: '+291',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Eritrea',
          itemValue: '+291',
          additionalDescr: 'ER',
          iconUrl: this.flagsLocation.concat('er.png'),
          description: '+291',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Estonia',
        itemValue: '+372',
        additionalDescr: 'EE',
        iconUrl: this.flagsLocation.concat('ee.png'),
        description: '+372',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Estonia',
          itemValue: '+372',
          additionalDescr: 'EE',
          iconUrl: this.flagsLocation.concat('ee.png'),
          description: '+372',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Ethiopia',
        itemValue: '+251',
        additionalDescr: 'ET',
        iconUrl: this.flagsLocation.concat('et.png'),
        description: '+251',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Ethiopia',
          itemValue: '+251',
          additionalDescr: 'ET',
          iconUrl: this.flagsLocation.concat('et.png'),
          description: '+251',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Faroe Islands',
        itemValue: '+298',
        additionalDescr: 'FO',
        iconUrl: this.flagsLocation.concat('fo.png'),
        description: '+298',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Faroe Islands',
          itemValue: '+298',
          additionalDescr: 'FO',
          iconUrl: this.flagsLocation.concat('fo.png'),
          description: '+298',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Fiji',
        itemValue: '+679',
        additionalDescr: 'FJ',
        iconUrl: this.flagsLocation.concat('fj.png'),
        description: '+679',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Fiji',
          itemValue: '+679',
          additionalDescr: 'FJ',
          iconUrl: this.flagsLocation.concat('fj.png'),
          description: '+679',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Finland',
        itemValue: '+358',
        additionalDescr: 'FI',
        iconUrl: this.flagsLocation.concat('fi.png'),
        description: '+358',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Finland',
          itemValue: '+358',
          additionalDescr: 'FI',
          iconUrl: this.flagsLocation.concat('fi.png'),
          description: '+358',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'France',
        itemValue: '+33',
        additionalDescr: 'FR',
        iconUrl: this.flagsLocation.concat('fr.png'),
        description: '+33',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'France',
          itemValue: '+33',
          additionalDescr: 'FR',
          iconUrl: this.flagsLocation.concat('fr.png'),
          description: '+33',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'French Guiana',
        itemValue: '+594',
        additionalDescr: 'GF',
        iconUrl: this.flagsLocation.concat('gf.png'),
        description: '+594',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'French Guiana',
          itemValue: '+594',
          additionalDescr: 'GF',
          iconUrl: this.flagsLocation.concat('gf.png'),
          description: '+594',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'French Polynesia',
        itemValue: '+689',
        additionalDescr: 'PF',
        iconUrl: this.flagsLocation.concat('pf.png'),
        description: '+689',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'French Polynesia',
          itemValue: '+689',
          additionalDescr: 'PF',
          iconUrl: this.flagsLocation.concat('pf.png'),
          description: '+689',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Gabon',
        itemValue: '+241',
        additionalDescr: 'GA',
        iconUrl: this.flagsLocation.concat('ga.png'),
        description: '+241',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Gabon',
          itemValue: '+241',
          additionalDescr: 'GA',
          iconUrl: this.flagsLocation.concat('ga.png'),
          description: '+241',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Gambia',
        itemValue: '+220',
        additionalDescr: 'GM',
        iconUrl: this.flagsLocation.concat('gm.png'),
        description: '+220',
        disableAdditionalDescrOnSelect: true,
        selectedObj:
        {
          name: 'Gambia',
          itemValue: '+220',
          additionalDescr: 'GM',
          iconUrl: this.flagsLocation.concat('gm.png'),
          description: '+220',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Georgia',
        itemValue: '+995',
        additionalDescr: 'GE',
        iconUrl: this.flagsLocation.concat('ge.png'),
        description: '+995',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Georgia',
          itemValue: '+995',
          additionalDescr: 'GE',
          iconUrl: this.flagsLocation.concat('ge.png'),
          description: '+995',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Germany',
        itemValue: '+49',
        additionalDescr: 'DE',
        iconUrl: this.flagsLocation.concat('de.png'),
        description: '+49',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Germany',
          itemValue: '+49',
          additionalDescr: 'DE',
          iconUrl: this.flagsLocation.concat('de.png'),
          description: '+49',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Ghana',
        itemValue: '+233',
        additionalDescr: 'GH',
        iconUrl: this.flagsLocation.concat('gh.png'),
        description: '+233',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Ghana',
          itemValue: '+233',
          additionalDescr: 'GH',
          iconUrl: this.flagsLocation.concat('gh.png'),
          description: '+233',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Gibraltar',
        itemValue: '+350',
        additionalDescr: 'GI',
        iconUrl: this.flagsLocation.concat('gi.png'),
        description: '+350',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Gibraltar',
          itemValue: '+350',
          additionalDescr: 'GI',
          iconUrl: this.flagsLocation.concat('gi.png'),
          description: '+350',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Greece',
        itemValue: '+30',
        additionalDescr: 'GR',
        iconUrl: this.flagsLocation.concat('gr.png'),
        description: '+30',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Greece',
          itemValue: '+30',
          additionalDescr: 'GR',
          iconUrl: this.flagsLocation.concat('gr.png'),
          description: '+30',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Greenland',
        itemValue: '+299',
        additionalDescr: 'GL',
        iconUrl: this.flagsLocation.concat('gl.png'),
        description: '+299',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Greenland',
          itemValue: '+299',
          additionalDescr: 'GL',
          iconUrl: this.flagsLocation.concat('gl.png'),
          description: '+299',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Grenada',
        itemValue: '+1 473',
        additionalDescr: 'GD',
        iconUrl: this.flagsLocation.concat('gd.png'),
        description: '+1 473',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Grenada',
          itemValue: '+1 473',
          additionalDescr: 'GD',
          iconUrl: this.flagsLocation.concat('gd.png'),
          description: '+1 473',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Guadeloupe',
        itemValue: '+590',
        additionalDescr: 'GP',
        iconUrl: this.flagsLocation.concat('gp.png'),
        description: '+590',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Guadeloupe',
          itemValue: '+590',
          additionalDescr: 'GP',
          iconUrl: this.flagsLocation.concat('gp.png'),
          description: '+590',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Guam',
        itemValue: '+1 671',
        additionalDescr: 'GU',
        iconUrl: this.flagsLocation.concat('gu.png'),
        description: '+1 671',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Guam',
          itemValue: '+1 671',
          additionalDescr: 'GU',
          iconUrl: this.flagsLocation.concat('gu.png'),
          description: '+1 671',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Guatemala',
        itemValue: '+502',
        additionalDescr: 'GT',
        iconUrl: this.flagsLocation.concat('gt.png'),
        description: '+502',
        disableAdditionalDescrOnSelect: true
      },
      {
        name: 'Guinea',
        itemValue: '+224',
        additionalDescr: 'GN',
        iconUrl: this.flagsLocation.concat('gn.png'),
        description: '+224',
        disableAdditionalDescrOnSelect: true
      },
      {
        name: 'Guinea-Bissau',
        itemValue: '+245',
        additionalDescr: 'GW',
        iconUrl: this.flagsLocation.concat('gw.png'),
        description: '+245',
        disableAdditionalDescrOnSelect: true
      },
      {
        name: 'Guyana',
        itemValue: '+595',
        additionalDescr: 'GY',
        iconUrl: this.flagsLocation.concat('gy.png'),
        description: '+595',
        disableAdditionalDescrOnSelect: true
      },
      {
        name: 'Haiti',
        itemValue: '+509',
        additionalDescr: 'HT',
        iconUrl: this.flagsLocation.concat('ht.png'),
        description: '+509',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Haiti',
          itemValue: '+509',
          additionalDescr: 'HT',
          iconUrl: this.flagsLocation.concat('ht.png'),
          description: '+509',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Honduras',
        itemValue: '+504',
        additionalDescr: 'HN',
        iconUrl: this.flagsLocation.concat('hn.png'),
        description: '+504',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Honduras',
          itemValue: '+504',
          additionalDescr: 'HN',
          iconUrl: this.flagsLocation.concat('hn.png'),
          description: '+504',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Hungary',
        itemValue: '+36',
        additionalDescr: 'HU',
        iconUrl: this.flagsLocation.concat('hu.png'),
        description: '+36',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Hungary',
          itemValue: '+36',
          additionalDescr: 'HU',
          iconUrl: this.flagsLocation.concat('hu.png'),
          description: '+36',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Iceland',
        itemValue: '+354',
        additionalDescr: 'IS',
        iconUrl: this.flagsLocation.concat('is.png'),
        description: '+354',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Iceland',
          itemValue: '+354',
          additionalDescr: 'IS',
          iconUrl: this.flagsLocation.concat('is.png'),
          description: '+354',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'India',
        itemValue: '+91',
        additionalDescr: 'IN',
        iconUrl: this.flagsLocation.concat('in.png'),
        description: '+91',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'India',
          itemValue: '+91',
          additionalDescr: 'IN',
          iconUrl: this.flagsLocation.concat('in.png'),
          description: '+91',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Indonesia',
        itemValue: '+62',
        additionalDescr: 'ID',
        iconUrl: this.flagsLocation.concat('id.png'),
        description: '+62',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Indonesia',
          itemValue: '+62',
          additionalDescr: 'ID',
          iconUrl: this.flagsLocation.concat('id.png'),
          description: '+62',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Iraq',
        itemValue: '+964',
        additionalDescr: 'IQ',
        iconUrl: this.flagsLocation.concat('iq.png'),
        description: '+964',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Iraq',
          itemValue: '+964',
          additionalDescr: 'IQ',
          iconUrl: this.flagsLocation.concat('iq.png'),
          description: '+964',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Ireland',
        itemValue: '+353',
        additionalDescr: 'IE',
        iconUrl: this.flagsLocation.concat('ie.png'),
        description: '+353',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Ireland',
          itemValue: '+353',
          additionalDescr: 'IE',
          iconUrl: this.flagsLocation.concat('ie.png'),
          description: '+353',
          disableAdditionalDescrOnSelect: true
        }
      },
      /* {
        name: 'Israel',
        itemValue: '+972',
        additionalDescr: 'IL',
        iconUrl: 'assets/img/countries/ils.png',
        description: '+972',
        disableAdditionalDescrOnSelect: true
      }, */
      {
        name: 'Italy',
        itemValue: '+39',
        additionalDescr: 'IT',
        iconUrl: this.flagsLocation.concat('it.png'),
        description: '+39',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Italy',
          itemValue: '+39',
          additionalDescr: 'IT',
          iconUrl: this.flagsLocation.concat('it.png'),
          description: '+39',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Jamaica',
        itemValue: '+1 876',
        additionalDescr: 'JM',
        iconUrl: this.flagsLocation.concat('jm.png'),
        description: '+1 876',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Jamaica',
          itemValue: '+1 876',
          additionalDescr: 'JM',
          iconUrl: this.flagsLocation.concat('jm.png'),
          description: '+1 876',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Japan',
        itemValue: '+81',
        additionalDescr: 'JP',
        iconUrl: this.flagsLocation.concat('jp.png'),
        description: '+81',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Japan',
          itemValue: '+81',
          additionalDescr: 'JP',
          iconUrl: this.flagsLocation.concat('jp.png'),
          description: '+81',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Jordan',
        itemValue: '+962',
        additionalDescr: 'JO',
        iconUrl: this.flagsLocation.concat('jo.png'),
        description: '+962',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Jordan',
          itemValue: '+962',
          additionalDescr: 'JO',
          iconUrl: this.flagsLocation.concat('jo.png'),
          description: '+962',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Kazakhstan',
        itemValue: '+7 7',
        additionalDescr: 'KZ',
        iconUrl: this.flagsLocation.concat('kz.png'),
        description: '+7 7',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Kazakhstan',
          itemValue: '+7 7',
          additionalDescr: 'KZ',
          iconUrl: this.flagsLocation.concat('kz.png'),
          description: '+7 7',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Kenya',
        itemValue: '+254',
        additionalDescr: 'KE',
        iconUrl: this.flagsLocation.concat('ke.png'),
        description: '+254',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Kenya',
          itemValue: '+254',
          additionalDescr: 'KE',
          iconUrl: this.flagsLocation.concat('ke.png'),
          description: '+254',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Kiribati',
        itemValue: '+686',
        additionalDescr: 'KI',
        iconUrl: this.flagsLocation.concat('ki.png'),
        description: '+686',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Kiribati',
          itemValue: '+686',
          additionalDescr: 'KI',
          iconUrl: this.flagsLocation.concat('ki.png'),
          description: '+686',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Kuwait',
        itemValue: '+965',
        additionalDescr: 'KW',
        iconUrl: this.flagsLocation.concat('kw.png'),
        description: '+965',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Kiribati',
          itemValue: '+686',
          additionalDescr: 'KI',
          iconUrl: this.flagsLocation.concat('ki.png'),
          description: '+686',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Kyrgyzstan',
        itemValue: '+996',
        additionalDescr: 'KG',
        iconUrl: this.flagsLocation.concat('kg.png'),
        description: '+996',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Kyrgyzstan',
          itemValue: '+996',
          additionalDescr: 'KG',
          iconUrl: this.flagsLocation.concat('kg.png'),
          description: '+996',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Latvia',
        itemValue: '+371',
        additionalDescr: 'LV',
        iconUrl: this.flagsLocation.concat('lv.png'),
        description: '+371',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Latvia',
          itemValue: '+371',
          additionalDescr: 'LV',
          iconUrl: this.flagsLocation.concat('lv.png'),
          description: '+371',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Lebanon',
        itemValue: '+961',
        additionalDescr: 'LB',
        iconUrl: this.flagsLocation.concat('lb.png'),
        description: '+961',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Lebanon',
          itemValue: '+961',
          additionalDescr: 'LB',
          iconUrl: this.flagsLocation.concat('lb.png'),
          description: '+961',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Lesotho',
        itemValue: '+266',
        additionalDescr: 'LS',
        iconUrl: this.flagsLocation.concat('ls.png'),
        description: '+266',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Lesotho',
          itemValue: '+266',
          additionalDescr: 'LS',
          iconUrl: this.flagsLocation.concat('ls.png'),
          description: '+266',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Liberia',
        itemValue: '+231',
        additionalDescr: 'LR',
        iconUrl: this.flagsLocation.concat('lr.png'),
        description: '+231',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Liberia',
          itemValue: '+231',
          additionalDescr: 'LR',
          iconUrl: this.flagsLocation.concat('lr.png'),
          description: '+231',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Liechtenstein',
        itemValue: '+423',
        additionalDescr: 'LI',
        iconUrl: this.flagsLocation.concat('li.png'),
        description: '+423',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Liechtenstein',
          itemValue: '+423',
          additionalDescr: 'LI',
          iconUrl: this.flagsLocation.concat('li.png'),
          description: '+423',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Lithuania',
        itemValue: '+370',
        additionalDescr: 'LT',
        iconUrl: this.flagsLocation.concat('lt.png'),
        description: '+370',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Lithuania',
          itemValue: '+370',
          additionalDescr: 'LT',
          iconUrl: this.flagsLocation.concat('lt.png'),
          description: '+370',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Luxembourg',
        itemValue: '+352',
        additionalDescr: 'LU',
        iconUrl: this.flagsLocation.concat('lu.png'),
        description: '+352',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Luxembourg',
          itemValue: '+352',
          additionalDescr: 'LU',
          iconUrl: this.flagsLocation.concat('lu.png'),
          description: '+352',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Madagascar',
        itemValue: '+261',
        additionalDescr: 'MG',
        iconUrl: this.flagsLocation.concat('mg.png'),
        description: '+261',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Madagascar',
          itemValue: '+261',
          additionalDescr: 'MG',
          iconUrl: this.flagsLocation.concat('mg.png'),
          description: '+261',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Malawi',
        itemValue: '+265',
        additionalDescr: 'MW',
        iconUrl: this.flagsLocation.concat('mw.png'),
        description: '+265',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Malawi',
          itemValue: '+265',
          additionalDescr: 'MW',
          iconUrl: this.flagsLocation.concat('mw.png'),
          description: '+265',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Malaysia',
        itemValue: '+60',
        additionalDescr: 'MY',
        iconUrl: this.flagsLocation.concat('my.png'),
        description: '+60',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Malaysia',
          itemValue: '+60',
          additionalDescr: 'MY',
          iconUrl: this.flagsLocation.concat('my.png'),
          description: '+60',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Maldives',
        itemValue: '+960',
        additionalDescr: 'MV',
        iconUrl: this.flagsLocation.concat('mv.png'),
        description: '+960',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Maldives',
          itemValue: '+960',
          additionalDescr: 'MV',
          iconUrl: this.flagsLocation.concat('mv.png'),
          description: '+960',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Mali',
        itemValue: '+223',
        additionalDescr: 'ML',
        iconUrl: this.flagsLocation.concat('ml.png'),
        description: '+223',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Mali',
          itemValue: '+223',
          additionalDescr: 'ML',
          iconUrl: this.flagsLocation.concat('ml.png'),
          description: '+223',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Malta',
        itemValue: '+356',
        additionalDescr: 'MT',
        iconUrl: this.flagsLocation.concat('mt.png'),
        description: '+356',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Malta',
          itemValue: '+356',
          additionalDescr: 'MT',
          iconUrl: this.flagsLocation.concat('mt.png'),
          description: '+356',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Marshall Islands',
        itemValue: '+692',
        additionalDescr: 'MH',
        iconUrl: this.flagsLocation.concat('mh.png'),
        description: '+692',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Marshall Islands',
          itemValue: '+692',
          additionalDescr: 'MH',
          iconUrl: this.flagsLocation.concat('mh.png'),
          description: '+692',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Martinique',
        itemValue: '+596',
        additionalDescr: 'MQ',
        iconUrl: this.flagsLocation.concat('mq.png'),
        description: '+596',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Martinique',
          itemValue: '+596',
          additionalDescr: 'MQ',
          iconUrl: this.flagsLocation.concat('mq.png'),
          description: '+596',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Mauritania',
        itemValue: '+222',
        additionalDescr: 'MR',
        iconUrl: this.flagsLocation.concat('mr.png'),
        description: '+222',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Mauritania',
          itemValue: '+222',
          additionalDescr: 'MR',
          iconUrl: this.flagsLocation.concat('mr.png'),
          description: '+222',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Mauritius',
        itemValue: '+230',
        additionalDescr: 'MU',
        iconUrl: this.flagsLocation.concat('mu.png'),
        description: '+230',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Mauritius',
          itemValue: '+230',
          additionalDescr: 'MU',
          iconUrl: this.flagsLocation.concat('mu.png'),
          description: '+230',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Mayotte',
        itemValue: '+262',
        additionalDescr: 'YT',
        iconUrl: this.flagsLocation.concat('yt.png'),
        description: '+262',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Mayotte',
          itemValue: '+262',
          additionalDescr: 'YT',
          iconUrl: this.flagsLocation.concat('yt.png'),
          description: '+262',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Mexico',
        itemValue: '+52',
        additionalDescr: 'MX',
        iconUrl: this.flagsLocation.concat('mx.png'),
        description: '+52',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Mexico',
          itemValue: '+52',
          additionalDescr: 'MX',
          iconUrl: this.flagsLocation.concat('mx.png'),
          description: '+52',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Monaco',
        itemValue: '+377',
        additionalDescr: 'MC',
        iconUrl: this.flagsLocation.concat('mc.png'),
        description: '+377',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Monaco',
          itemValue: '+377',
          additionalDescr: 'MC',
          iconUrl: this.flagsLocation.concat('mc.png'),
          description: '+377',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Mongolia',
        itemValue: '+976',
        additionalDescr: 'MN',
        iconUrl: this.flagsLocation.concat('mn.png'),
        description: '+976',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Mongolia',
          itemValue: '+976',
          additionalDescr: 'MN',
          iconUrl: this.flagsLocation.concat('mn.png'),
          description: '+976',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Montenegro',
        itemValue: '+382',
        additionalDescr: 'ME',
        iconUrl: this.flagsLocation.concat('me.png'),
        description: '+382',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Montenegro',
          itemValue: '+382',
          additionalDescr: 'ME',
          iconUrl: this.flagsLocation.concat('me.png'),
          description: '+382',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Montserrat',
        itemValue: '+1664',
        additionalDescr: 'MS',
        iconUrl: this.flagsLocation.concat('ms.png'),
        description: '+1664',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Montserrat',
          itemValue: '+1664',
          additionalDescr: 'MS',
          iconUrl: this.flagsLocation.concat('ms.png'),
          description: '+1664',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Morocco',
        itemValue: '+212',
        additionalDescr: 'MA',
        iconUrl: this.flagsLocation.concat('ma.png'),
        description: '+212',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Morocco',
          itemValue: '+212',
          additionalDescr: 'MA',
          iconUrl: this.flagsLocation.concat('ma.png'),
          description: '+212',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Myanmar',
        itemValue: '+95',
        additionalDescr: 'MM',
        iconUrl: this.flagsLocation.concat('mm.png'),
        description: '+95',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Myanmar',
          itemValue: '+95',
          additionalDescr: 'MM',
          iconUrl: this.flagsLocation.concat('mm.png'),
          description: '+95',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Namibia',
        itemValue: '+264',
        additionalDescr: 'NA',
        iconUrl: this.flagsLocation.concat('na.png'),
        description: '+264',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Namibia',
          itemValue: '+264',
          additionalDescr: 'NA',
          iconUrl: this.flagsLocation.concat('na.png'),
          description: '+264',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Nauru',
        itemValue: '+674',
        additionalDescr: 'NR',
        iconUrl: this.flagsLocation.concat('nr.png'),
        description: '+674',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Nauru',
          itemValue: '+674',
          additionalDescr: 'NR',
          iconUrl: this.flagsLocation.concat('nr.png'),
          description: '+674',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Nepal',
        itemValue: '+977',
        additionalDescr: 'NP',
        iconUrl: this.flagsLocation.concat('np.png'),
        description: '+977',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Nepal',
          itemValue: '+977',
          additionalDescr: 'NP',
          iconUrl: this.flagsLocation.concat('np.png'),
          description: '+977',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Netherlands',
        itemValue: '+31',
        additionalDescr: 'NL',
        iconUrl: this.flagsLocation.concat('nl.png'),
        description: '+31',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Netherlands',
          itemValue: '+31',
          additionalDescr: 'NL',
          iconUrl: this.flagsLocation.concat('nl.png'),
          description: '+31',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Netherlands Antilles',
        itemValue: '+599',
        additionalDescr: 'AN',
        iconUrl: this.flagsLocation.concat('an.png'),
        description: '+599',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Netherlands Antilles',
          itemValue: '+599',
          additionalDescr: 'AN',
          iconUrl: this.flagsLocation.concat('an.png'),
          description: '+599',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'New Caledonia',
        itemValue: '+687',
        additionalDescr: 'NC',
        iconUrl: this.flagsLocation.concat('nc.png'),
        description: '+687',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'New Caledonia',
          itemValue: '+687',
          additionalDescr: 'NC',
          iconUrl: this.flagsLocation.concat('nc.png'),
          description: '+687',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'New Zealand',
        itemValue: '+64',
        additionalDescr: 'NZ',
        iconUrl: this.flagsLocation.concat('nz.png'),
        description: '+64',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'New Zealand',
          itemValue: '+64',
          additionalDescr: 'NZ',
          iconUrl: this.flagsLocation.concat('nz.png'),
          description: '+64',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Nicaragua',
        itemValue: '+505',
        additionalDescr: 'NI',
        iconUrl: this.flagsLocation.concat('ni.png'),
        description: '+505',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Nicaragua',
          itemValue: '+505',
          additionalDescr: 'NI',
          iconUrl: this.flagsLocation.concat('ni.png'),
          description: '+505',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Niger',
        itemValue: '+227',
        additionalDescr: 'NE',
        iconUrl: this.flagsLocation.concat('ne.png'),
        description: '+227',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Niger',
          itemValue: '+227',
          additionalDescr: 'NE',
          iconUrl: this.flagsLocation.concat('ne.png'),
          description: '+227',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Nigeria',
        itemValue: '+234',
        additionalDescr: 'NG',
        iconUrl: this.flagsLocation.concat('ng.png'),
        description: '+234',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Nigeria',
          itemValue: '+234',
          additionalDescr: 'NG',
          iconUrl: this.flagsLocation.concat('ng.png'),
          description: '+234',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Niue',
        itemValue: '+683',
        additionalDescr: 'NU',
        iconUrl: this.flagsLocation.concat('nu.png'),
        description: '+683',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Niue',
          itemValue: '+683',
          additionalDescr: 'NU',
          iconUrl: this.flagsLocation.concat('nu.png'),
          description: '+683',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Norfolk Island',
        itemValue: '+672',
        additionalDescr: 'NF',
        iconUrl: this.flagsLocation.concat('nf.png'),
        description: '+672',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Norfolk Island',
          itemValue: '+672',
          additionalDescr: 'NF',
          iconUrl: this.flagsLocation.concat('nf.png'),
          description: '+672',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Northern Mariana Islands',
        itemValue: '+1 670',
        additionalDescr: 'MP',
        iconUrl: this.flagsLocation.concat('mp.png'),
        description: '+1 670',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Northern Mariana Islands',
          itemValue: '+1 670',
          additionalDescr: 'MP',
          iconUrl: this.flagsLocation.concat('mp.png'),
          description: '+1 670',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Norway',
        itemValue: '+47',
        additionalDescr: 'NO',
        iconUrl: this.flagsLocation.concat('no.png'),
        description: '+47',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Norway',
          itemValue: '+47',
          additionalDescr: 'NO',
          iconUrl: this.flagsLocation.concat('no.png'),
          description: '+47',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Oman',
        itemValue: '+968',
        additionalDescr: 'OM',
        iconUrl: this.flagsLocation.concat('om.png'),
        description: '+968',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Oman',
          itemValue: '+968',
          additionalDescr: 'OM',
          iconUrl: this.flagsLocation.concat('om.png'),
          description: '+968',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Pakistan',
        itemValue: '+92',
        additionalDescr: 'PK',
        iconUrl: this.flagsLocation.concat('pk.png'),
        description: '+92',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Pakistan',
          itemValue: '+92',
          additionalDescr: 'PK',
          iconUrl: this.flagsLocation.concat('pk.png'),
          description: '+92',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Palau',
        itemValue: '+680',
        additionalDescr: 'PW',
        iconUrl: this.flagsLocation.concat('pw.png'),
        description: '+680',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Palau',
          itemValue: '+680',
          additionalDescr: 'PW',
          iconUrl: this.flagsLocation.concat('pw.png'),
          description: '+680',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Panama',
        itemValue: '+507',
        additionalDescr: 'PA',
        iconUrl: this.flagsLocation.concat('pa.png'),
        description: '+507',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Panama',
          itemValue: '+507',
          additionalDescr: 'PA',
          iconUrl: this.flagsLocation.concat('pa.png'),
          description: '+507',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Papua New Guinea',
        itemValue: '+675',
        additionalDescr: 'PG',
        iconUrl: this.flagsLocation.concat('pg.png'),
        description: '+675',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Papua New Guinea',
          itemValue: '+675',
          additionalDescr: 'PG',
          iconUrl: this.flagsLocation.concat('pg.png'),
          description: '+675',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Paraguay',
        itemValue: '+595',
        additionalDescr: 'PY',
        iconUrl: this.flagsLocation.concat('py.png'),
        description: '+595',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Paraguay',
          itemValue: '+595',
          additionalDescr: 'PY',
          iconUrl: this.flagsLocation.concat('py.png'),
          description: '+595',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Peru',
        itemValue: '+51',
        additionalDescr: 'PE',
        iconUrl: this.flagsLocation.concat('pe.png'),
        description: '+51',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Peru',
          itemValue: '+51',
          additionalDescr: 'PE',
          iconUrl: this.flagsLocation.concat('pe.png'),
          description: '+51',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Philippines',
        itemValue: '+63',
        additionalDescr: 'PH',
        iconUrl: this.flagsLocation.concat('ph.png'),
        description: '+63',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Philippines',
          itemValue: '+63',
          additionalDescr: 'PH',
          iconUrl: this.flagsLocation.concat('ph.png'),
          description: '+63',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Poland',
        itemValue: '+48',
        additionalDescr: 'PL',
        iconUrl: this.flagsLocation.concat('pl.png'),
        description: '+48',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Poland',
          itemValue: '+48',
          additionalDescr: 'PL',
          iconUrl: this.flagsLocation.concat('pl.png'),
          description: '+48',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Portugal',
        itemValue: '+351',
        additionalDescr: 'PT',
        iconUrl: this.flagsLocation.concat('pt.png'),
        description: '+351',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Portugal',
          itemValue: '+351',
          additionalDescr: 'PT',
          iconUrl: this.flagsLocation.concat('pt.png'),
          description: '+351',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Puerto Rico',
        itemValue: '+1 939',
        additionalDescr: 'PR',
        iconUrl: this.flagsLocation.concat('pr.png'),
        description: '+1 939',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Puerto Rico',
          itemValue: '+1 939',
          additionalDescr: 'PR',
          iconUrl: this.flagsLocation.concat('pr.png'),
          description: '+1 939',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Qatar',
        itemValue: '+974',
        additionalDescr: 'QA',
        iconUrl: this.flagsLocation.concat('qa.png'),
        description: '+974',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Qatar',
          itemValue: '+974',
          additionalDescr: 'QA',
          iconUrl: this.flagsLocation.concat('qa.png'),
          description: '+974',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Romania',
        itemValue: '+40',
        additionalDescr: 'RO',
        iconUrl: this.flagsLocation.concat('ro.png'),
        description: '+40',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Romania',
          itemValue: '+40',
          additionalDescr: 'RO',
          iconUrl: this.flagsLocation.concat('ro.png'),
          description: '+40',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Rwanda',
        itemValue: '+250',
        additionalDescr: 'RW',
        iconUrl: this.flagsLocation.concat('rw.png'),
        description: '+250',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Rwanda',
          itemValue: '+250',
          additionalDescr: 'RW',
          iconUrl: this.flagsLocation.concat('rw.png'),
          description: '+250',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Samoa',
        itemValue: '+685',
        additionalDescr: 'WS',
        iconUrl: this.flagsLocation.concat('ws.png'),
        description: '+685',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Samoa',
          itemValue: '+685',
          additionalDescr: 'WS',
          iconUrl: this.flagsLocation.concat('ws.png'),
          description: '+685',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'San Marino',
        itemValue: '+378',
        additionalDescr: 'SM',
        iconUrl: this.flagsLocation.concat('sm.png'),
        description: '+378',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'San Marino',
          itemValue: '+378',
          additionalDescr: 'SM',
          iconUrl: this.flagsLocation.concat('sm.png'),
          description: '+378',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Saudi Arabia',
        itemValue: '+966',
        additionalDescr: 'SA',
        iconUrl: this.flagsLocation.concat('sa.png'),
        description: '+966',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Saudi Arabia',
          itemValue: '+966',
          additionalDescr: 'SA',
          iconUrl: this.flagsLocation.concat('sa.png'),
          description: '+966',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Senegal',
        itemValue: '+221',
        additionalDescr: 'SN',
        iconUrl: this.flagsLocation.concat('sn.png'),
        description: '+221',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Senegal',
          itemValue: '+221',
          additionalDescr: 'SN',
          iconUrl: this.flagsLocation.concat('sn.png'),
          description: '+221',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Serbia',
        itemValue: '+381',
        additionalDescr: 'RS',
        iconUrl: this.flagsLocation.concat('rs.png'),
        description: '+381',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Serbia',
          itemValue: '+381',
          additionalDescr: 'RS',
          iconUrl: this.flagsLocation.concat('rs.png'),
          description: '+381',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Seychelles',
        itemValue: '+248',
        additionalDescr: 'SC',
        iconUrl: this.flagsLocation.concat('sc.png'),
        description: '+248',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Seychelles',
          itemValue: '+248',
          additionalDescr: 'SC',
          iconUrl: this.flagsLocation.concat('sc.png'),
          description: '+248',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Sierra Leone',
        itemValue: '+232',
        additionalDescr: 'SL',
        iconUrl: this.flagsLocation.concat('sl.png'),
        description: '+232',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Sierra Leone',
          itemValue: '+232',
          additionalDescr: 'SL',
          iconUrl: this.flagsLocation.concat('sl.png'),
          description: '+232',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Singapore',
        itemValue: '+65',
        additionalDescr: 'SG',
        iconUrl: this.flagsLocation.concat('sg.png'),
        description: '+65',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Singapore',
          itemValue: '+65',
          additionalDescr: 'SG',
          iconUrl: this.flagsLocation.concat('sg.png'),
          description: '+65',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Slovakia',
        itemValue: '+421',
        additionalDescr: 'SK',
        iconUrl: this.flagsLocation.concat('sk.png'),
        description: '+421',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Slovakia',
          itemValue: '+421',
          additionalDescr: 'SK',
          iconUrl: this.flagsLocation.concat('sk.png'),
          description: '+421',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Slovenia',
        itemValue: '+386',
        additionalDescr: 'SI',
        iconUrl: this.flagsLocation.concat('si.png'),
        description: '+386',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Slovenia',
          itemValue: '+386',
          additionalDescr: 'SI',
          iconUrl: this.flagsLocation.concat('si.png'),
          description: '+386',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Solomon Islands',
        itemValue: '+677',
        additionalDescr: 'SB',
        iconUrl: this.flagsLocation.concat('sb.png'),
        description: '+677',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Solomon Islands',
          itemValue: '+677',
          additionalDescr: 'SB',
          iconUrl: this.flagsLocation.concat('sb.png'),
          description: '+677',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'South Africa',
        itemValue: '+27',
        additionalDescr: 'ZA',
        iconUrl: this.flagsLocation.concat('za.png'),
        description: '+27',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'South Africa',
          itemValue: '+27',
          additionalDescr: 'ZA',
          iconUrl: this.flagsLocation.concat('za.png'),
          description: '+27',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'South Georgia and the South Sandwich Islands',
        itemValue: '+500',
        additionalDescr: 'GS',
        iconUrl: this.flagsLocation.concat('gs.png'),
        description: '+500',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'South Georgia and the South Sandwich Islands',
          itemValue: '+500',
          additionalDescr: 'GS',
          iconUrl: this.flagsLocation.concat('gs.png'),
          description: '+500',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Spain',
        itemValue: '+34',
        additionalDescr: 'ES',
        iconUrl: this.flagsLocation.concat('es.png'),
        description: '+34',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Spain',
          itemValue: '+34',
          additionalDescr: 'ES',
          iconUrl: this.flagsLocation.concat('es.png'),
          description: '+34',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Sri Lanka',
        itemValue: '+94',
        additionalDescr: 'LK',
        iconUrl: this.flagsLocation.concat('lk.png'),
        description: '+94',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Sri Lanka',
          itemValue: '+94',
          additionalDescr: 'LK',
          iconUrl: this.flagsLocation.concat('lk.png'),
          description: '+94',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Sudan',
        itemValue: '+249',
        additionalDescr: 'SD',
        iconUrl: this.flagsLocation.concat('sd.png'),
        description: '+249',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Sudan',
          itemValue: '+249',
          additionalDescr: 'SD',
          iconUrl: this.flagsLocation.concat('sd.png'),
          description: '+249',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Suriname',
        itemValue: '+597',
        additionalDescr: 'SR',
        iconUrl: this.flagsLocation.concat('sr.png'),
        description: '+597',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Suriname',
          itemValue: '+597',
          additionalDescr: 'SR',
          iconUrl: this.flagsLocation.concat('sr.png'),
          description: '+597',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Swaziland',
        itemValue: '+268',
        additionalDescr: 'SZ',
        iconUrl: this.flagsLocation.concat('sz.png'),
        description: '+268',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Swaziland',
          itemValue: '+268',
          additionalDescr: 'SZ',
          iconUrl: this.flagsLocation.concat('sz.png'),
          description: '+268',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Sweden',
        itemValue: '+46',
        additionalDescr: 'SE',
        iconUrl: this.flagsLocation.concat('se.png'),
        description: '+46',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Sweden',
          itemValue: '+46',
          additionalDescr: 'SE',
          iconUrl: this.flagsLocation.concat('se.png'),
          description: '+46',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Switzerland',
        itemValue: '+41',
        additionalDescr: 'CH',
        iconUrl: this.flagsLocation.concat('ch.png'),
        description: '+41',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Switzerland',
          itemValue: '+41',
          additionalDescr: 'CH',
          iconUrl: this.flagsLocation.concat('ch.png'),
          description: '+41',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Tajikistan',
        itemValue: '+992',
        additionalDescr: 'TJ',
        iconUrl: this.flagsLocation.concat('tj.png'),
        description: '+992',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Tajikistan',
          itemValue: '+992',
          additionalDescr: 'TJ',
          iconUrl: this.flagsLocation.concat('tj.png'),
          description: '+992',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Thailand',
        itemValue: '+66',
        additionalDescr: 'TH',
        iconUrl: this.flagsLocation.concat('th.png'),
        description: '+66',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Thailand',
          itemValue: '+66',
          additionalDescr: 'TH',
          iconUrl: this.flagsLocation.concat('th.png'),
          description: '+66',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Togo',
        itemValue: '+228',
        additionalDescr: 'TG',
        iconUrl: this.flagsLocation.concat('tg.png'),
        description: '+228',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Togo',
          itemValue: '+228',
          additionalDescr: 'TG',
          iconUrl: this.flagsLocation.concat('tg.png'),
          description: '+228',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Tokelau',
        itemValue: '+690',
        additionalDescr: 'TK',
        iconUrl: this.flagsLocation.concat('tk.png'),
        description: '+690',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Tokelau',
          itemValue: '+690',
          additionalDescr: 'TK',
          iconUrl: this.flagsLocation.concat('tk.png'),
          description: '+690',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Tonga',
        itemValue: '+676',
        additionalDescr: 'TO',
        iconUrl: this.flagsLocation.concat('to.png'),
        description: '+676',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Tonga',
          itemValue: '+676',
          additionalDescr: 'TO',
          iconUrl: this.flagsLocation.concat('to.png'),
          description: '+676',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Trinidad and Tobago',
        itemValue: '+1 868',
        additionalDescr: 'TT',
        iconUrl: this.flagsLocation.concat('tt.png'),
        description: '+1 868',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Trinidad and Tobago',
          itemValue: '+1 868',
          additionalDescr: 'TT',
          iconUrl: this.flagsLocation.concat('tt.png'),
          description: '+1 868',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Tunisia',
        itemValue: '+216',
        additionalDescr: 'TN',
        iconUrl: this.flagsLocation.concat('tn.png'),
        description: '+216',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Tunisia',
          itemValue: '+216',
          additionalDescr: 'TN',
          iconUrl: this.flagsLocation.concat('tn.png'),
          description: '+216',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Turkey',
        itemValue: '+90',
        additionalDescr: 'TR',
        iconUrl: this.flagsLocation.concat('tr.png'),
        description: '+90',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Turkey',
          itemValue: '+90',
          additionalDescr: 'TR',
          iconUrl: this.flagsLocation.concat('tr.png'),
          description: '+90',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Turkmenistan',
        itemValue: '+993',
        additionalDescr: 'TM',
        iconUrl: this.flagsLocation.concat('tm.png'),
        description: '+993',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Turkmenistan',
          itemValue: '+993',
          additionalDescr: 'TM',
          iconUrl: this.flagsLocation.concat('tm.png'),
          description: '+993',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Turks and Caicos Islands',
        itemValue: '+1 649',
        additionalDescr: 'TC',
        iconUrl: this.flagsLocation.concat('tc.png'),
        description: '+1 649',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Turks and Caicos Islands',
          itemValue: '+1 649',
          additionalDescr: 'TC',
          iconUrl: this.flagsLocation.concat('tc.png'),
          description: '+1 649',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Tuvalu',
        itemValue: '+688',
        additionalDescr: 'TV',
        iconUrl: this.flagsLocation.concat('tv.png'),
        description: '+688',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Tuvalu',
          itemValue: '+688',
          additionalDescr: 'TV',
          iconUrl: this.flagsLocation.concat('tv.png'),
          description: '+688',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Uganda',
        itemValue: '+256',
        additionalDescr: 'UG',
        iconUrl: this.flagsLocation.concat('ug.png'),
        description: '+256',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Uganda',
          itemValue: '+256',
          additionalDescr: 'UG',
          iconUrl: this.flagsLocation.concat('ug.png'),
          description: '+256',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Ukraine',
        itemValue: '+380',
        additionalDescr: 'UA',
        iconUrl: this.flagsLocation.concat('ua.png'),
        description: '+380',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Ukraine',
          itemValue: '+380',
          additionalDescr: 'UA',
          iconUrl: this.flagsLocation.concat('ua.png'),
          description: '+380',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'United Arab Emirates',
        itemValue: '+971',
        additionalDescr: 'AE',
        iconUrl: this.flagsLocation.concat('aed.png'),
        description: '+971',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'United Arab Emirates',
          itemValue: '+971',
          additionalDescr: 'AE',
          iconUrl: this.flagsLocation.concat('aed.png'),
          description: '+971',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'United Kingdom',
        itemValue: '+44',
        additionalDescr: 'GB',
        iconUrl: this.flagsLocation.concat('gb.png'),
        description: '+44',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'United Kingdom',
          itemValue: '+44',
          additionalDescr: 'GB',
          iconUrl: this.flagsLocation.concat('gb.png'),
          description: '+44',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Uruguay',
        itemValue: '+598',
        additionalDescr: 'UY',
        iconUrl: this.flagsLocation.concat('uy.png'),
        description: '+598',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Uruguay',
          itemValue: '+598',
          additionalDescr: 'UY',
          iconUrl: this.flagsLocation.concat('uy.png'),
          description: '+598',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Uzbekistan',
        itemValue: '+998',
        additionalDescr: 'UZ',
        iconUrl: this.flagsLocation.concat('uz.png'),
        description: '+998',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Uzbekistan',
          itemValue: '+998',
          additionalDescr: 'UZ',
          iconUrl: this.flagsLocation.concat('uz.png'),
          description: '+998',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Vanuatu',
        itemValue: '+678',
        additionalDescr: 'VU',
        iconUrl: this.flagsLocation.concat('vu.png'),
        description: '+678',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Vanuatu',
          itemValue: '+678',
          additionalDescr: 'VU',
          iconUrl: this.flagsLocation.concat('vu.png'),
          description: '+678',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Wallis and Futuna',
        itemValue: '+681',
        additionalDescr: 'WF',
        iconUrl: this.flagsLocation.concat('wf.png'),
        description: '+681',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Wallis and Futuna',
          itemValue: '+681',
          additionalDescr: 'WF',
          iconUrl: this.flagsLocation.concat('wf.png'),
          description: '+681',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Yemen',
        itemValue: '+967',
        additionalDescr: 'YE',
        iconUrl: this.flagsLocation.concat('ye.png'),
        description: '+967',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Yemen',
          itemValue: '+967',
          additionalDescr: 'YE',
          iconUrl: this.flagsLocation.concat('ye.png'),
          description: '+967',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Zambia',
        itemValue: '+260',
        additionalDescr: 'ZM',
        iconUrl: this.flagsLocation.concat('zm.png'),
        description: '+260',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Zambia',
          itemValue: '+260',
          additionalDescr: 'ZM',
          iconUrl: this.flagsLocation.concat('zm.png'),
          description: '+260',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Zimbabwe',
        itemValue: '+263',
        additionalDescr: 'ZW',
        iconUrl: this.flagsLocation.concat('zw.png'),
        description: '+263',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Zimbabwe',
          itemValue: '+263',
          additionalDescr: 'ZW',
          iconUrl: this.flagsLocation.concat('zw.png'),
          description: '+263',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'land Islands',
        itemValue: '+358',
        additionalDescr: 'AX',
        iconUrl: this.flagsLocation.concat('ax.png'),
        description: '+358',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'land Islands',
          itemValue: '+358',
          additionalDescr: 'AX',
          iconUrl: this.flagsLocation.concat('ax.png'),
          description: '+358',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Antarctica',
        itemValue: '+672',
        additionalDescr: 'AQ',
        iconUrl: this.flagsLocation.concat('aq.png'),
        description: '+672',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Antarctica',
          itemValue: '+672',
          additionalDescr: 'AQ',
          iconUrl: this.flagsLocation.concat('aq.png'),
          description: '+672',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Bolivia, Plurinational State of',
        itemValue: '+591',
        additionalDescr: 'BO',
        iconUrl: this.flagsLocation.concat('bo.png'),
        description: '+591',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Bolivia, Plurinational State of',
          itemValue: '+591',
          additionalDescr: 'BO',
          iconUrl: this.flagsLocation.concat('bo.png'),
          description: '+591',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Brunei Darussalam',
        itemValue: '+673',
        additionalDescr: 'BN',
        iconUrl: this.flagsLocation.concat('bn.png'),
        description: '+673',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Brunei Darussalam',
          itemValue: '+673',
          additionalDescr: 'BN',
          iconUrl: this.flagsLocation.concat('bn.png'),
          description: '+673',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Cocos (Keeling) Islands',
        itemValue: '+61',
        additionalDescr: 'CC',
        iconUrl: this.flagsLocation.concat('cc.png'),
        description: '+61',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Cocos (Keeling) Islands',
          itemValue: '+61',
          additionalDescr: 'CC',
          iconUrl: this.flagsLocation.concat('cc.png'),
          description: '+61',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Congo, The Democratic Republic of the',
        itemValue: '+243',
        additionalDescr: 'CD',
        iconUrl: this.flagsLocation.concat('cd.png'),
        description: '+243',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Congo, The Democratic Republic of the',
          itemValue: '+243',
          additionalDescr: 'CD',
          iconUrl: this.flagsLocation.concat('cd.png'),
          description: '+243',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Cote d"Ivoire',
        itemValue: '+225',
        additionalDescr: 'CI',
        iconUrl: this.flagsLocation.concat('ci.png'),
        description: '+225',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Cote d"Ivoire',
          itemValue: '+225',
          additionalDescr: 'CI',
          iconUrl: this.flagsLocation.concat('ci.png'),
          description: '+225',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Falkland Islands (Malvinas)',
        itemValue: '+500',
        additionalDescr: 'FK',
        iconUrl: this.flagsLocation.concat('fk.png'),
        description: '+500',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Falkland Islands (Malvinas)',
          itemValue: '+500',
          additionalDescr: 'FK',
          iconUrl: this.flagsLocation.concat('fk.png'),
          description: '+500',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Guernsey',
        itemValue: '+44',
        additionalDescr: 'GG',
        iconUrl: this.flagsLocation.concat('gg.png'),
        description: '+44',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Guernsey',
          itemValue: '+44',
          additionalDescr: 'GG',
          iconUrl: this.flagsLocation.concat('gg.png'),
          description: '+44',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Holy See (Vatican City State)',
        itemValue: '+379',
        additionalDescr: 'VA',
        iconUrl: this.flagsLocation.concat('va.png'),
        description: '+379',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Holy See (Vatican City State)',
          itemValue: '+379',
          additionalDescr: 'VA',
          iconUrl: this.flagsLocation.concat('va.png'),
          description: '+379',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Hong Kong',
        itemValue: '+852',
        additionalDescr: 'HK',
        iconUrl: this.flagsLocation.concat('hk.png'),
        description: '+852',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Hong Kong',
          itemValue: '+852',
          additionalDescr: 'HK',
          iconUrl: this.flagsLocation.concat('hk.png'),
          description: '+852',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Iran, Islamic Republic of',
        itemValue: '+98',
        additionalDescr: 'IR',
        iconUrl: this.flagsLocation.concat('ir.png'),
        description: '+98',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Iran, Islamic Republic of',
          itemValue: '+98',
          additionalDescr: 'IR',
          iconUrl: this.flagsLocation.concat('ir.png'),
          description: '+98',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Isle of Man',
        itemValue: '+44',
        additionalDescr: 'IM',
        iconUrl: this.flagsLocation.concat('im.png'),
        description: '+44',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Isle of Man',
          itemValue: '+44',
          additionalDescr: 'IM',
          iconUrl: this.flagsLocation.concat('im.png'),
          description: '+44',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Jersey',
        itemValue: '+44 ',
        additionalDescr: 'JE',
        iconUrl: this.flagsLocation.concat('je.png'),
        description: '+44',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Jersey',
          itemValue: '+44 ',
          additionalDescr: 'JE',
          iconUrl: this.flagsLocation.concat('je.png'),
          description: '+44',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Korea, Democratic People"s Republic of',
        itemValue: '+850',
        additionalDescr: 'KP',
        iconUrl: this.flagsLocation.concat('kp.png'),
        description: '+850',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Korea, Democratic People"s Republic of',
          itemValue: '+850',
          additionalDescr: 'KP',
          iconUrl: this.flagsLocation.concat('kp.png'),
          description: '+850',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Korea, Republic of',
        itemValue: '+82',
        additionalDescr: 'KR',
        iconUrl: this.flagsLocation.concat('kr.png'),
        description: '+82',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Korea, Republic of',
          itemValue: '+82',
          additionalDescr: 'KR',
          iconUrl: this.flagsLocation.concat('kr.png'),
          description: '+82',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Lao People"s Democratic Republic',
        itemValue: '+856',
        additionalDescr: 'LA',
        iconUrl: this.flagsLocation.concat('la.png'),
        description: '+856',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Lao People"s Democratic Republic',
          itemValue: '+856',
          additionalDescr: 'LA',
          iconUrl: this.flagsLocation.concat('la.png'),
          description: '+856',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Libyan Arab Jamahiriya',
        itemValue: '+218',
        additionalDescr: 'LY',
        iconUrl: this.flagsLocation.concat('ly.png'),
        description: '+218',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Libyan Arab Jamahiriya',
          itemValue: '+218',
          additionalDescr: 'LY',
          iconUrl: this.flagsLocation.concat('ly.png'),
          description: '+218',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Macao',
        itemValue: '+853',
        additionalDescr: 'MO',
        iconUrl: this.flagsLocation.concat('mo.png'),
        description: '+853',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Macao',
          itemValue: '+853',
          additionalDescr: 'MO',
          iconUrl: this.flagsLocation.concat('mo.png'),
          description: '+853',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Macedonia, The Former Yugoslav Republic of',
        itemValue: '+389',
        additionalDescr: 'MK',
        iconUrl: this.flagsLocation.concat('mk.png'),
        description: '+389',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Macedonia, The Former Yugoslav Republic of',
          itemValue: '+389',
          additionalDescr: 'MK',
          iconUrl: this.flagsLocation.concat('mk.png'),
          description: '+389',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Micronesia, Federated States of',
        itemValue: '+691',
        additionalDescr: 'FM',
        iconUrl: this.flagsLocation.concat('fm.png'),
        description: '+691',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Micronesia, Federated States of',
          itemValue: '+691',
          additionalDescr: 'FM',
          iconUrl: this.flagsLocation.concat('fm.png'),
          description: '+691',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Moldova, Republic of',
        itemValue: '+373',
        additionalDescr: 'MD',
        iconUrl: this.flagsLocation.concat('md.png'),
        description: '+373',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Moldova, Republic of',
          itemValue: '+373',
          additionalDescr: 'MD',
          iconUrl: this.flagsLocation.concat('md.png'),
          description: '+373',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Mozambique',
        itemValue: '+258',
        additionalDescr: 'MZ',
        iconUrl: this.flagsLocation.concat('mz.png'),
        description: '+258',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Mozambique',
          itemValue: '+258',
          additionalDescr: 'MZ',
          iconUrl: this.flagsLocation.concat('mz.png'),
          description: '+258',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Palestinian Territory, Occupied',
        itemValue: '+970',
        additionalDescr: 'PS',
        iconUrl: this.flagsLocation.concat('ps.png'),
        description: '+970',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Palestinian Territory, Occupied',
          itemValue: '+970',
          additionalDescr: 'PS',
          iconUrl: this.flagsLocation.concat('ps.png'),
          description: '+970',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Pitcairn',
        itemValue: '+872',
        additionalDescr: 'PN',
        iconUrl: this.flagsLocation.concat('pn.png'),
        description: '+872',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Pitcairn',
          itemValue: '+872',
          additionalDescr: 'PN',
          iconUrl: this.flagsLocation.concat('pn.png'),
          description: '+872',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Réunion',
        itemValue: '+262',
        additionalDescr: 'RE',
        iconUrl: this.flagsLocation.concat('re.png'),
        description: '+262',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Réunion',
          itemValue: '+262',
          additionalDescr: 'RE',
          iconUrl: this.flagsLocation.concat('re.png'),
          description: '+262',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Russia',
        itemValue: '+7',
        additionalDescr: 'RU',
        iconUrl: this.flagsLocation.concat('ru.png'),
        description: '+7',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Russia',
          itemValue: '+7',
          additionalDescr: 'RU',
          iconUrl: this.flagsLocation.concat('ru.png'),
          description: '+7',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Saint Barthélemy',
        itemValue: '+590',
        additionalDescr: 'BL',
        iconUrl: this.flagsLocation.concat('bl.png'),
        description: '+590',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Saint Barthélemy',
          itemValue: '+590',
          additionalDescr: 'BL',
          iconUrl: this.flagsLocation.concat('bl.png'),
          description: '+590',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Saint Helena, Ascension and Tristan Da Cunha',
        itemValue: '+290',
        additionalDescr: 'SH',
        iconUrl: this.flagsLocation.concat('sh.png'),
        description: '+290',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Saint Helena, Ascension and Tristan Da Cunha',
          itemValue: '+290',
          additionalDescr: 'SH',
          iconUrl: this.flagsLocation.concat('sh.png'),
          description: '+290',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Saint Kitts and Nevis',
        itemValue: '+1 869',
        additionalDescr: 'KN',
        iconUrl: this.flagsLocation.concat('kn.png'),
        description: '+1 869',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Saint Kitts and Nevis',
          itemValue: '+1 869',
          additionalDescr: 'KN',
          iconUrl: this.flagsLocation.concat('kn.png'),
          description: '+1 869',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Saint Lucia',
        itemValue: '+1 758',
        additionalDescr: 'LC',
        iconUrl: this.flagsLocation.concat('lc.png'),
        description: '+1 758',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Saint Lucia',
          itemValue: '+1 758',
          additionalDescr: 'LC',
          iconUrl: this.flagsLocation.concat('lc.png'),
          description: '+1 758',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Saint Martin',
        itemValue: '+590',
        additionalDescr: 'MF',
        iconUrl: this.flagsLocation.concat('mf.png'),
        description: '+590',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Saint Martin',
          itemValue: '+590',
          additionalDescr: 'MF',
          iconUrl: this.flagsLocation.concat('mf.png'),
          description: '+590',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Saint Pierre and Miquelon',
        itemValue: '+508',
        additionalDescr: 'PM',
        iconUrl: this.flagsLocation.concat('pm.png'),
        description: '+508',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Saint Pierre and Miquelon',
          itemValue: '+508',
          additionalDescr: 'PM',
          iconUrl: this.flagsLocation.concat('pm.png'),
          description: '+508',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Saint Vincent and the Grenadines',
        itemValue: '+1 784',
        additionalDescr: 'VC',
        iconUrl: this.flagsLocation.concat('vc.png'),
        description: '+1 784',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Saint Vincent and the Grenadines',
          itemValue: '+1 784',
          additionalDescr: 'VC',
          iconUrl: this.flagsLocation.concat('vc.png'),
          description: '+1 784',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Sao Tome and Principe',
        itemValue: '+239',
        additionalDescr: 'ST',
        iconUrl: this.flagsLocation.concat('st.png'),
        description: '+239',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Sao Tome and Principe',
          itemValue: '+239',
          additionalDescr: 'ST',
          iconUrl: this.flagsLocation.concat('st.png'),
          description: '+239',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Somalia',
        itemValue: '+252',
        additionalDescr: 'SO',
        iconUrl: this.flagsLocation.concat('so.png'),
        description: '+252',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Somalia',
          itemValue: '+252',
          additionalDescr: 'SO',
          iconUrl: this.flagsLocation.concat('so.png'),
          description: '+252',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Svalbard and Jan Mayen',
        itemValue: '+47',
        additionalDescr: 'SJ',
        iconUrl: this.flagsLocation.concat('sj.png'),
        description: '+47',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Svalbard and Jan Mayen',
          itemValue: '+47',
          additionalDescr: 'SJ',
          iconUrl: this.flagsLocation.concat('sj.png'),
          description: '+47',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Syrian Arab Republic',
        itemValue: '+963',
        additionalDescr: 'SY',
        iconUrl: this.flagsLocation.concat('sy.png'),
        description: '+963',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Syrian Arab Republic',
          itemValue: '+963',
          additionalDescr: 'SY',
          iconUrl: this.flagsLocation.concat('sy.png'),
          description: '+963',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Taiwan, Province of China',
        itemValue: '+886',
        additionalDescr: 'TW',
        iconUrl: this.flagsLocation.concat('tw.png'),
        description: '+886',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Taiwan, Province of China',
          itemValue: '+886',
          additionalDescr: 'TW',
          iconUrl: this.flagsLocation.concat('tw.png'),
          description: '+886',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Tanzania, United Republic of',
        itemValue: '+255',
        additionalDescr: 'TZ',
        iconUrl: this.flagsLocation.concat('tz.png'),
        description: '+255',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Tanzania, United Republic of',
          itemValue: '+255',
          additionalDescr: 'TZ',
          iconUrl: this.flagsLocation.concat('tz.png'),
          description: '+255',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Timor-Leste',
        itemValue: '+670',
        additionalDescr: 'TL',
        iconUrl: this.flagsLocation.concat('tl.png'),
        description: '+670',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Timor-Leste',
          itemValue: '+670',
          additionalDescr: 'TL',
          iconUrl: this.flagsLocation.concat('tl.png'),
          description: '+670',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Venezuela, Bolivarian Republic of',
        itemValue: '+58',
        additionalDescr: 'VE',
        iconUrl: this.flagsLocation.concat('ve.png'),
        description: '+58',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Venezuela, Bolivarian Republic of',
          itemValue: '+58',
          additionalDescr: 'VE',
          iconUrl: this.flagsLocation.concat('ve.png'),
          description: '+58',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Viet Nam',
        itemValue: '+84',
        additionalDescr: 'VN',
        iconUrl: this.flagsLocation.concat('vn.png'),
        description: '+84',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Viet Nam',
          itemValue: '+84',
          additionalDescr: 'VN',
          iconUrl: this.flagsLocation.concat('vn.png'),
          description: '+84',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Virgin Islands, British',
        itemValue: '+1 284',
        additionalDescr: 'VG',
        iconUrl: this.flagsLocation.concat('vg.png'),
        description: '+1 284',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Virgin Islands, British',
          itemValue: '+1 284',
          additionalDescr: 'VG',
          iconUrl: this.flagsLocation.concat('vg.png'),
          description: '+1 284',
          disableAdditionalDescrOnSelect: true
        }
      },
      {
        name: 'Virgin Islands, U.S.',
        itemValue: '+1 340',
        additionalDescr: 'VI',
        iconUrl: this.flagsLocation.concat('vi.png'),
        description: '+1 340',
        disableAdditionalDescrOnSelect: true,

        selectedObj:
        {
          name: 'Virgin Islands, U.S.',
          itemValue: '+1 340',
          additionalDescr: 'VI',
          iconUrl: this.flagsLocation.concat('vi.png'),
          description: '+1 340',
          disableAdditionalDescrOnSelect: true
        }
      }
    ];

    return countries.sort((leftSide, rightSide): number => {
      if (leftSide.additionalDescr < rightSide.additionalDescr) { return -1; }
      if (leftSide.additionalDescr > rightSide.additionalDescr) { return 1; }
      return 0;
    });
  }
}
