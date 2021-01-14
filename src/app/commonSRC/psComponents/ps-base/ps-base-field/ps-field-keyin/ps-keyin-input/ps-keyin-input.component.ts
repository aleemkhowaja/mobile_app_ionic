import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsKeyinInput, IOptionsPsLabelInput } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { ConstantCommon } from '../../../../../psServices/models/common-constant';
import { IOptionsPsFieldLabel } from '../../../../../psServices/models/ps-common-interface';
import { PsFieldKeyinComponent } from '../ps-field-keyin.component';


@Component({
    selector: 'ps-keyin-input',
    templateUrl: 'ps-keyin-input.component.html',
    styleUrls: ['./ps-keyin-input.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PsKeyinInputComponent extends PsFieldKeyinComponent implements OnInit {

    @Input() options: IOptionsPsKeyinInput;
    previewLblOptions: IOptionsPsFieldLabel;
    @Output() onPsIconClicked = new EventEmitter<void>();
    @Output() onPsImageClicked = new EventEmitter<void>();
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onPsKeyUp = new EventEmitter<void>();
    get previewValOptions(): IOptionsPsFieldLabel {
        return {
            labelKey: this.fcFieldValue,
            psClass: 'ps-value-preview',
            previewMode: true
        };
    }

    get labelOptions(): IOptionsPsLabelInput {
        return {
            required: this.required,
            labelKey: this.options.labelKey
        };
    }

    /**
     * getter created in order to populate the mask options to the variable this.maskOptions
     * in order for the mask/unmask to work properly in case the mask options were changed on the run.
     */
    public get maskOption() {
        this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_MASK_OPTIONS] = this.options.mask;
        return this.options.mask;
    }


    constructor(commonProv: PsCommonService, loggerP: LoggerService) {
        super(commonProv, loggerP);
    }

    ngOnInit() {
        this.custIconOptions.component = PsKeyinInputComponent;
        this.custIconOptions.componentOptions = this.options;
        super.ngOnInit();
        // set the available customizations
        if (this.options.type === 'number' || this.options.type === 'amount') {
            this.custIconOptions.availableCustomization.MAX_VALUE = true;
            this.custIconOptions.availableCustomization.MIN_VALUE = true;
        } else {
            this.custIconOptions.availableCustomization.MIN_LENGTH = true;
            this.custIconOptions.availableCustomization.MAX_LENGTH = true;
            this.custIconOptions.availableCustomization.PATTERN = true;
        }
        // end setting the available customizations

        this.previewLblOptions = {
            labelKey: this.options.labelKey,
            psClass: 'ps-lbl-preview',
            previewMode: true
        };
        if (this.options) {
            if (this.options.iconOptions || this.options.imageOptions) {
                this.itemOptions = { ...this.options };
            }


        }
        if (this.options.mask) {
            if (!this.options.mask.placeholder) {
                this.options.mask.placeholder = '';
            }
            if ((this.options.type === 'number' || this.options.type === 'amount')) {
                this.options.mask.numericInput = true;
            }
        }
        this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_MASK_OPTIONS] = this.options.mask;
        this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_MASK_APPLICABLE] = true;
        this.itemOptions.psClass = this.options.psClass;
        if(this.options.name == undefined || this.options.name == null )
        {
        	this.options.name = this.options.fcName;
        }
    }

    public onKeyDown(event: any) {
        // #800979
        super.onKeyDown(event);
        const e = event as KeyboardEvent;
        if (this.options.type == 'text' && this.options.disableSpecChars) {
            if (!this.isAlphaNumericKey(e)) {
                event.preventDefault();
                event.stopPropagation();
            }
        } else if (this.options.type == 'number' && (e.code == 'KeyE' ||
            // the below line is added for bug nb:808781
            e.code == 'Minus' || e.shiftKey == true || e.code == 'NumpadDecimal' ||
            e.code == 'NumpadAdd' || e.code == 'NumpadSubtract')) {
            event.preventDefault();
            event.stopPropagation();
        } else if (this.options.type == 'amount' && e.code != 'NumpadDecimal' && !this.isAlphaNumericKey(e) &&
            e.code == 'KeyE') {
            event.preventDefault();
            event.stopPropagation();
        }
        return;
    }

    disableDragAndDrop(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    onIconClicked() {
        this.onPsIconClicked.emit();
    }

    onImageClicked() {
        this.onPsImageClicked.emit();
    }

    onKeyUp(event) {
        this.onPsKeyUp.emit(event);
    }

    onFocus(event) {
        this.onPsFocus.emit(event);
    }

}
