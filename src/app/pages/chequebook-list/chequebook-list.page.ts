import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';

import { IOptionsPsTemplateView } from '../../commonSRC/psServices/models/ps-common-interface';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { IChequebooksListRequest, IChequebooksListResponse, IOptionsPsOptionChequebookExposed } from './../../commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-chequebook/ps-option-chequebook.component.interface';
import { OmniPullService } from './../../commonBussinessSRC/psServices/omni-common/omni-pull.service';

@Component({
  selector: 'chequebook-list',
  templateUrl: './chequebook-list.page.html',
  styleUrls: ['./chequebook-list.page.scss'],
})
export class ChequebookListPage extends OmniBasePage implements OnInit {

  private formGroup = new FormGroup({});
  chequebookOptions: IOptionsPsOptionChequebookExposed;
  showList = false;
  public templateViewOptions: IOptionsPsTemplateView = {
    group: this.formGroup
  };
  private chequebooksListRequest: IChequebooksListRequest = {};

  constructor(private omniPull: OmniPullService, public logger: LoggerService, public navService?: PsNavigatorService) {
    super();
  }

  ngOnInit() {
    super.init();
    this.chequebookOptions = {
      isEditable: true
    };

    this.chequebooksListRequest = {};
    this.returnChequeBookList(this.chequebooksListRequest);
  }


  private async returnChequeBookList(chequebooksListRequest: IChequebooksListRequest) {
    this.chequebookOptions.listOfOptions = this.populateChequebooks([]);
    const result = await this.omniPull.returnChequebooksList(chequebooksListRequest).catch(error => {
      this.logger.error('Error: While chequebook list in PsLookupChequebooksComponent :', error);
    });

    if (result && result.gridModel.length > 0) {
      this.chequebookOptions.listOfOptions = this.populateChequebooks(result.gridModel);
    } else {
      this.chequebookOptions.listOfOptions = [];
    }
    this.showList = true;
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
        chequeTypeName: iterator.chequeTypeName,
        chequebookStatusDesc: iterator.chequebookStatusDesc
      };
      chequeBooklist.push(chequeBook);
    }
    return chequeBooklist;
  }

}
