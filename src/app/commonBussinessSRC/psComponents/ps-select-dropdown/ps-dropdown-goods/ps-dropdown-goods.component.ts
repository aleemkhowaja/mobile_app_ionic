import { Component, OnInit, Input } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from './../../../../commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsDropdownGoodsExposed } from './ps-dropdown-goods.component.interfaces';
import { IOptionsPsSelectDropdown, IchangeValues, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';

/**
 * @author Ahmed.Ragab
 * @since 14/06/2020
 *
 * <p> PsDropdownGoodsComponent will fetch the list of product types from server</p>
 */
@Component({
  selector: 'ps-dropdown-goods',
  templateUrl: './ps-dropdown-goods.component.html',
  styleUrls: ['./ps-dropdown-goods.component.scss'],
})
export class PsDropdownGoodsComponent extends PsSelectDropdownComponent implements OnInit {

  @Input() options: IOptionsPsDropdownGoodsExposed = {};
  public defaultOptions: IOptionsPsSelectDropdown = {
    listOfOptions: [],
  };

  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
    private omniPullService?: OmniPullService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultOptions, this.options, false);
    this.loadGoods();
  }

  /**
   * populating product types fetched from server
   */
  private async loadGoods() {

    const Goods = await this.omniPullService.returnGoods({}).catch(error => {
      this.logger.error('Error: While fetching Product types in PsDropdownGoodsComponent : ', error);
    });

    if (Goods && Goods.gridModel && Goods.gridModel.length > 0) {
      for (const iterator of Goods.gridModel) {
        const Good: IPsSelect = {
          itemValue: iterator.goodsId,
          description: iterator.goodsName,
          selectedObj: iterator
        };
        this.defaultOptions.listOfOptions.push(Good);
      }
    }
  }

  selectDropDownChange(values: IchangeValues) {
    this.onPsChange.emit(values);
  }
}
