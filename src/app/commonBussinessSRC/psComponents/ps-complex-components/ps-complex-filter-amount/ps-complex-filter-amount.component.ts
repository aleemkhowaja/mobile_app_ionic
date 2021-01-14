import { Component, OnInit, Input } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsInputAmount } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { IOptionsPSComplexAmountFilter } from './ps-complex-filter-amount.component.interface';
import { PsInputAmountComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-keyin-input/ps-input-amount/ps-input-amount.component';

@Component({
    selector: 'ps-complex-filter-amount',
    templateUrl: './ps-complex-filter-amount.component.html',
    styleUrls: ['./ps-complex-filter-amount.component.scss'],
})
export class PsComplexFilterAmountComponent extends PsInputAmountComponent implements OnInit {

    @Input() public options: IOptionsPSComplexAmountFilter;

    maxAmountFilter: IOptionsPsInputAmount = {};
    minAmountFilter: IOptionsPsInputAmount = {};

    constructor(private commonC: PsCommonService, private loggerC: LoggerService, private omniPull: OmniPullService) {
        super(commonC, loggerC);
    }

    ngOnInit() {
        this.maxAmountFilter = {
            fcName: this.options.max.fcName,
            labelKey: this.options.max.labelKey,
            group: this.options.max.group,
            decimalPoints: 2,
            placeHolder: this.options.max.placeHolder
        };
        this.minAmountFilter = {
            fcName: this.options.min.fcName,
            labelKey: this.options.min.labelKey,
            group: this.options.min.group,
            decimalPoints: 2,
            placeHolder: this.options.min.placeHolder
        };
    }

}
