import { Component, OnInit, Input } from '@angular/core';
import { IOptionsPsComplexDocumentDetailsExposed } from './ps-complex-document-details.component.interface';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';

@Component({
  selector: 'ps-complex-document-details',
  templateUrl: './ps-complex-document-details.component.html',
  styleUrls: ['./ps-complex-document-details.component.scss'],
})
export class PsComplexDocumentDetailsComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexDocumentDetailsExposed;

  showDocumentInput:boolean = false;

  constructor(
    public commonProv: PsCommonService,
    public loggerP: LoggerService
  ) {
    super(commonProv,loggerP)
   }

  ngOnInit() {
    super.init();
  }

  onCheckBoxChanged(event) {
    this.showDocumentInput=false;
    if (event != null && event !== undefined) {
      if(event.newValue == true)
      this.showDocumentInput=true;

      else
      this.showDocumentInput=false;
    }

  }
  

  onDocumentLovChange(values: IchangeValues){
    this.onPsChange.emit(values);
  }

}
