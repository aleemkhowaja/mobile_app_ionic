import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMapKeyValue } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexLookUpComponentExposed } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.interfaces';
import { PsOptionChequebookComponent } from '../../ps-container-lookup-option/ps-option-chequebook/ps-option-chequebook.component';
import { IChequebooksListRequest, IOptionsPsOptionChequebookExposed } from '../../ps-container-lookup-option/ps-option-chequebook/ps-option-chequebook.component.interface';
import { IChequebooksListResponse } from './../../ps-container-lookup-option/ps-option-chequebook/ps-option-chequebook.component.interface';
import { IOptionsPsLookupChequebooksExposed } from './ps-lookup-chequebooks.component.interfaces';

@Component({
  selector: 'ps-lookup-chequebooks',
  templateUrl: './ps-lookup-chequebooks.component.html',
  styleUrls: ['./ps-lookup-chequebooks.component.scss'],
})
export class PsLookupChequebooksComponent extends PsBaseFieldComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({});
  @Input() options: IOptionsPsLookupChequebooksExposed = {
    requestObject: null
  };
  public complexLookupOptions: IOptionsPsComplexLookUpComponentExposed = {
    requestObject: null,
    notFoundMessage: 'no_chequebook_found_key'
  };
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onChequeBookChange: EventEmitter<any> = new EventEmitter<any>();
  public labelValuesMap = new Map<string, IMapKeyValue>();
  private chequebooksListRequest: IChequebooksListRequest = {};
  chequebookOptions: IOptionsPsOptionChequebookExposed[] = [];
  showList = false;

  constructor(
    public commonService: PsCommonService,
    logger: LoggerService,
    private omniPull?: OmniPullService,
    public navService?: PsNavigatorService,
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.loadChequeBooks();
    this.complexLookupOptions.title = 'title_key';
    this.complexLookupOptions.subTitle = 'sub_title_key';
    this.complexLookupOptions.labelsValueMap = this.labelValuesMap;
    if (this.options && this.options.component) {
      this.complexLookupOptions.component = this.options.component;
    } else {
      this.complexLookupOptions.component = PsOptionChequebookComponent;
    }
    this.commonProv.copyObject(this.complexLookupOptions, this.options, false);
  }

  /**
   * populating chequebook list - fetching from server
   */
  private loadChequeBooks() {
    this.chequebooksListRequest = {};
    this.returnChequeBookList(this.chequebooksListRequest);
  }

  /**
   * fetching Local Benificiaries from server
   * @param requestData IOmniBeneficiaryRequest
   */
  private async returnChequeBookList(chequebooksListRequest: IChequebooksListRequest) {
    const result = await this.omniPull.returnChequebooksList(chequebooksListRequest).catch(error => {
      this.complexLookupOptions.listOfOptions = [];
      this.logger.error('Error: While chequebook list in PsLookupChequebooksComponent :', error);
    });

    if (result && result.gridModel.length > 0) {
      this.complexLookupOptions.listOfOptions = this.populateChequebooks(result.gridModel);
    } else {
      this.complexLookupOptions.listOfOptions = [];
    }
  }

  /**
   * customizing chequebook object
   * @param chequeBooks
   */
  private populateChequebooks(chequeBooks: Array<any>): IChequebooksListResponse[] {
    const chequeBooklist = [];
    for (const iterator of chequeBooks) {
      const chequeBook: IChequebooksListResponse = {
        fromNumber: iterator.fromNumber,
        printingLocation: iterator.printingLocation,
        chequebookCode: iterator.chequebookCode,
        chequebookStatus: iterator.chequebookStatus,
        toNumber: iterator.toNumber,
        cif: iterator.cif,
        additionalRef: iterator.additionalRef,
        accGl: iterator.accGl,
        currency: iterator.currency,
        branch: iterator.branch,
        serialNo: iterator.serialNo,
        chequeCode: iterator.chequeCode,
        lookupKey: iterator.chequebookCode,
        chequebookStatusDesc: iterator.chequebookStatusDesc
      };
      chequeBooklist.push(chequeBook);
    }

    return chequeBooklist;
  }

  onChangeItem(event) {
    this.logger.log('cheq #####', event);
    this.onChequeBookChange.emit(event.item);
  }

}
