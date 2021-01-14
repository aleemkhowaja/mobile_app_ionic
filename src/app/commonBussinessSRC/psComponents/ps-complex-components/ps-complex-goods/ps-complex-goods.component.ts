import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsComplexGoodsExposed } from './ps-complex-goods.component.interfaces';


/**
 * @author Ahmed.Ragab
 * @since 14/06/2020
 * 
 * <p> PsComplexGoodsComponent is a complex component composed for facility request</p>
 */
@Component({
  selector: 'ps-complex-goods',
  templateUrl: './ps-complex-goods.component.html',
  styleUrls: ['./ps-complex-goods.component.scss'],
})
export class PsComplexGoodsComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexGoodsExposed;
  @Output() public GoodCategoriesChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public CountryGoodsChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public GoodsChange: EventEmitter<any> = new EventEmitter<any>();

  selectedFileData: any;
  constructor(
    commonService: PsCommonService,
    public omniPull: OmniPullService,
    logger: LoggerService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.ngOnInit();
  }
  onGoodCategoriesChanged(value: any) {
    if (value && value.selectedObj) {
      this.GoodCategoriesChange.emit(value);
    }
  }
  onCountryGoodsChanged(value: any) {
    if (value && value.selectedObj) {
      this.CountryGoodsChange.emit(value);
    }
  }
  onGoodsChanged(value: any) {
    if (value && value.selectedObj) {
      this.GoodsChange.emit(value);
    }
  }

}
