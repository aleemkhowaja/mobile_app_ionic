import { Component, OnInit, Input } from '@angular/core';
import { IOptionsPsComplexLcDocumentDetailsExposed } from './ps-complex-lc-document-details.component.interface';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';

@Component({
  selector: 'ps-complex-lc-document-details',
  templateUrl: './ps-complex-lc-document-details.component.html',
  styleUrls: ['./ps-complex-lc-document-details.component.scss'],
})
export class PsComplexLcDocumentDetailsComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexLcDocumentDetailsExposed;

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
  
  onChange(event){

  }

  onAirwayBillChange(event){
    
  }

}
