import { Component, Input, OnInit } from '@angular/core';
import { PsActionImageComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-action/ps-action-image/ps-action-image.component';
import { IOptionsPsImageInlineLabeled } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

@Component({
  selector: 'ps-image-inline-labeled',
  templateUrl: './ps-image-inline-labeled.component.html',
  styleUrls: ['./ps-image-inline-labeled.component.scss'],
})
export class PsImageInlineLabeledComponent extends PsActionImageComponent implements OnInit {
  @Input() options: IOptionsPsImageInlineLabeled;
  defaultOptions: IOptionsPsImageInlineLabeled={   
  }
  
  constructor(public commonService: PsCommonService) { 
    super(commonService, commonService.logger);
  }
  ngOnInit() {
    this.commonService.copyObject(this.defaultOptions, this.options);    
  }
  selectImages(){  
    this.onClick.emit(event);    
   }
}
