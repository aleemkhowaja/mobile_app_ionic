import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IAvailableCustomizationOptions, IchangeValues, ICustomizationData, ICustomizationGroups, IdefaultValidators, IMainCustomizationOptions, IOptionsPsButtonStandard, IOptionsPsContainerPanel, IOptionsPsKeyinInputExposed, IOptionsPsLabel, IOptionsPsSelectSegment } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsComplexAlertController } from 'src/app/commonSRC/psTemplates/ps-template-alert-controller/ps-template-alert-controller.template.interfaces';
import { CommonUtils } from '../../../../../../src/app/commonSRC/psServices/models/common-utils';


@Component({
    templateUrl: './field-customization.html',
})
export class FieldCustomizationPage implements OnInit, AfterViewChecked, AfterViewInit {

    operId: number;
    fieldName: string;
    hasApprovedRec: boolean;
    private actScreenDispId: number;
    private appScreenDispId: number;
    calledFrom = 'M'; // M:Maintenance; V:view; A:Approve
    dataFetched = false;
    showBusRelatedMsg = false;
    CUSTOMIZATION_BY_TYPE = ConstantCommon.CUSTOMIZATION_BY_TYPE;
    CUSTOMIZATION_BY_NAME = ConstantCommon.CUSTOMIZATION_BY_NAME;
    customizationGroupByName: IMainCustomizationOptions = {};
    customizationGroupByType: IMainCustomizationOptions = {};
    availableOptions: IAvailableCustomizationOptions = {};
    fcNamesAndsessionVarsList: string[] = [];

    operIdOptions: IOptionsPsLabel = {
        labelKey: 'operid_key'
    };
    operIdValueOptions: IOptionsPsLabel = {};
    pageNameOptions: IOptionsPsLabel = {
        labelKey: 'page_name_key'
    };
    pageNameValueOptions: IOptionsPsLabel = {};
    fieldNameOptions: IOptionsPsLabel = {
        labelKey: 'name_key'
    };
    fieldNameValueOptions: IOptionsPsLabel = {};
    saveCustOptions: IOptionsPsButtonStandard = {
        labelKey: 'save_key',
        allowCust: false,
        group: null
    };
    resetCustOptions: IOptionsPsButtonStandard = {
        labelKey: 'reset_key',
        allowCust: false,
        group: null
    };
    labelKeyDescLabelOptions: IOptionsPsLabel = {
        labelKey: 'description_key'
    };
    labelKeyDescOptions: IOptionsPsLabel = {};
    patternErrorLabelOptions: IOptionsPsLabel = {
        labelKey: 'description_key'
    };
    patterErrorDescLabelOptions: IOptionsPsLabel = {};
    placeholderLabelOptions: IOptionsPsLabel = {
        labelKey: 'description_key'
    };
    busMessageOptions: IOptionsPsLabel = {
        labelKey: 'cust_cannot_change_key'
    };
    placeholderDescLabelOptions: IOptionsPsLabel = {};
    custData: ICustomizationData = {
        customizationByType: {},
        customizationByName: {}
    };
    fieldCustForm: ICustomizationGroups = {
        customizationByType: new FormGroup({}),
        customizationByName: new FormGroup({})
    };
    custSegmentOptions: IOptionsPsSelectSegment = {
        segmentList: [{
            itemValue: 1,
            description: this.common.translate('cust_by_name_key')
        }
            // ,{
            //     itemValue: 2,
            //     description: this.common.translate('customization_by_type_key')
            // }
        ],
        defaultSegment: { itemValue: 1, description: this.common.translate('cust_by_name_key') }
    };
    showCustByNameFields = true;
    showCustByTypeFields = false;
    showLabelDesc = false;
    showErrorLabelDesc = false;
    showPlaceholderLabelDesc = false;
    labelDesc: string = null;
    labelKeyId: number;
    patternErrorKeyId: number;
    placeholderKeyId: number;
    oldRequiredValue: string | number | boolean;
    oldVisibilityValue: string | number | boolean;
    oldReadonlyValue: string | number | boolean;

    basicPanelOptions: IOptionsPsContainerPanel = {
        labelKey: 'basic_cust_key',
        isExpandable: true,
        // iconName: 'edit',
        expanded: true,
        allowCust: false
    };
    patternPanelOptions: IOptionsPsContainerPanel = {
        labelKey: 'regular_expr_key',
        isExpandable: true,
        // iconName: 'edit',
        expanded: false,
        allowCust: false
    };

    labelPanelOptions: IOptionsPsContainerPanel = {
        labelKey: 'label_key',
        isExpandable: true,
        // iconName: 'edit',
        expanded: false,
        allowCust: false
    };

    placeholderPanelOptions: IOptionsPsContainerPanel = {
        labelKey: 'placeholder_key',
        isExpandable: true,
        // iconName: 'edit',
        expanded: false,
        allowCust: false
    };


    servicMappingBtnOptions: IOptionsPsButtonStandard = {
        labelKey: 'service_mapping_key',
        allowCust: false,
        group: null
    };

    serviceMappingPanelOptions: IOptionsPsContainerPanel = {
        labelKey: 'service_mapping_key',
        isExpandable: true,
        expanded: false,
        allowCust: false
    };

    removeServicMappingBtnOptions: IOptionsPsButtonStandard = {
        labelKey: 'reset_mapping_key',
        allowCust: false,
        group: null
    };

    constructor(
        private modalCtrl: ModalController,
        private common: PsCommonService,
        public navParams: NavParams,
        private cdr: ChangeDetectorRef) {
        this.initializeMainOptions(this.customizationGroupByName, this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_NAME]);
        this.initializeMainOptions(this.customizationGroupByType, this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_TYPE]);
    }

    initializeMainOptions(options: IMainCustomizationOptions, formGroup: FormGroup) {
        options.visibleFlagOptions = {
            group: formGroup,
            fcName: 'screenDispVO.IS_VISIBLE',
            labelKey: 'hidden_key',
            allowCust: false
        };
        options.readOnlyFlagOptions = {
            group: formGroup,
            fcName: 'screenDispVO.IS_READONLY',
            labelKey: 'disabled_key',
            allowCust: false
        };
        options.requiredFlagOptions = {
            group: formGroup,
            fcName: 'screenDispVO.IS_MANDATORY',
            labelKey: 'required_key',
            allowCust: false
        };
        options.allowZeroFlagOptions = {
            group: formGroup,
            fcName: 'screenDispVO.ZERO_NOT_ALLOWED',
            labelKey: 'allow_zero_key',
            allowCust: false
        };
        options.minLengthOptions = {
            group: formGroup,
            allowCust: false,
            fcName: 'screenDispVO.MIN_LENGTH',
            labelKey: 'min_length_key',
            type: 'number',
            mask: {
                mask: '9999'
            }
        };
        options.maxLengthOptions = {
            group: formGroup,
            allowCust: false,
            fcName: 'screenDispVO.MAX_LENGTH',
            labelKey: 'max_length_key',
            type: 'number',
            mask: {
                mask: '9999'
            }
        };
        options.minValueOptions = {
            group: formGroup,
            allowCust: false,
            labelKey: 'min_value_key',
            fcName: 'screenDispVO.MIN_VALUE',
            type: 'amount',
            decimalPoints: 3
        };
        options.maxValueOptions = {
            group: formGroup,
            allowCust: false,
            labelKey: 'max_value_key',
            fcName: 'screenDispVO.MAX_VALUE',
            type: 'amount',
            decimalPoints: 3
        };
        options.patternOptions = {
            group: formGroup,
            allowCust: false,
            labelKey: 'regex_key',
            fcName: 'screenDispVO.PATTERN',
            type: 'text',
            psClass: 'pattern-customization'
        };
        options.patternLabelKeyOptions = {
            group: formGroup,
            allowCust: false,
            labelKey: 'regexp_error_key',
            fcName: 'screenDispVO.PATTERN_ERROR_LABEL_ID',
            asyncURL: PsCommonSettings.serviceUrl.returnKeyLabels,
            placeHolder: 'search_for_new_label_key'
        };
        options.labelKeyOptions = {
            group: formGroup,
            allowCust: false,
            labelKey: 'label_key',
            fcName: 'screenDispVO.KEY_LABEL_ID',
            asyncURL: PsCommonSettings.serviceUrl.returnKeyLabels,
            placeHolder: 'search_for_new_label_key',
        };

        options.placeholderKeyOptions = {
            group: formGroup,
            allowCust: false,
            labelKey: 'placeholder_key',
            fcName: 'screenDispVO.PLACEHOLDER_LABEL_ID',
            asyncURL: PsCommonSettings.serviceUrl.returnKeyLabels,
            placeHolder: 'search_for_new_label_key'
        };

        options.dynamicComponentOptions = {
            group: formGroup,
            allowCust: false,
            labelKey: 'default_value_key',
            fcName: 'screenDispVO.DEFAULT_VALUE',
            psClass: 'cust_autocomplete',
            placeHolder: 'set_default_value_key'
        };

        options.defaultValueOptions = {};

        if (this.navParams.data) {
            options.dynamicComponentOptions.component = this.navParams.data.component;
            this.common.copyObject(options.defaultValueOptions, this.navParams.data.componentOptions);
            options.defaultValueOptions.fcName = 'screenDispVO.DEFAULT_VALUE';
            options.defaultValueOptions.allowCust = false;
            options.defaultValueOptions.labelKey = 'default_value_key';
            options.defaultValueOptions.group = formGroup;
            options.defaultValueOptions.placeHolder = '';
            options.dynamicComponentOptions.componentOptions = options.defaultValueOptions;

            options.defalutLabelOption = {
                labelKey: 'default_label_key',
                placeHolder: this.navParams.data.componentOptions.labelKey,
                fcName: 'defaultLbl',
                group: formGroup,
                allowCust: false,
                psClass: 'default-lable-customization'
            };
            options.defalutPlaceholderOption = {
                labelKey: 'default_placeholder_key',
                placeHolder: this.navParams.data.componentOptions.placeHolder,
                fcName: 'defaultPlaceHolder',
                group: formGroup,
                allowCust: false,
                psClass: 'default-lable-customization'
            };

            const defaultValidations: Map<string, IdefaultValidators> = new Map<string, IdefaultValidators>();
            defaultValidations.set(options.defalutLabelOption.fcName, this.common.prepareValidation(true, false, true));
            defaultValidations.set(options.defalutPlaceholderOption.fcName, this.common.prepareValidation(true, false, true));
            this.common.setDefaultValidators(defaultValidations, formGroup);
        }
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    ngOnInit() {
        if (this.navParams.data) {
            this.operId = this.navParams.data.operId;
            this.operIdValueOptions.labelKey = String(this.operId);
            this.pageNameValueOptions.labelKey = PsCommonSettings.pageName;
            this.fieldNameValueOptions.labelKey = this.navParams.data.fieldNameDesc;
            this.availableOptions = this.navParams.data.availableOptions;
            this.fieldName = this.navParams.data.fieldName;
            this.hasApprovedRec = this.navParams.data.hasApprovedRec;
            this.actScreenDispId = this.navParams.data.actScreenDispId;
            this.appScreenDispId = this.navParams.data.appScreenDispId;
            this.fcNamesAndsessionVarsList = this.navParams.data.fcNamesAndsessionVarsList;
            this.custData[ConstantCommon.CUSTOMIZATION_BY_NAME] = this.returnDefaultCust();
            this.common.setFormData(this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_NAME], this.custData[ConstantCommon.CUSTOMIZATION_BY_NAME]);
            // add controlers not found in html/used instead of hidden fields just to pass data
            this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_NAME].addControl('screenDispVO.BUS_RELATED', new FormControl(''));
            this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_NAME].addControl('screenDispVO.FIELD_TECH_DETAILS_ID', new FormControl(''));
            this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_NAME].addControl('screenDispVO.STATUS', new FormControl(''));
            this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_NAME].addControl('screenDispVO.KEY_LABEL_ID', new FormControl(''));
            this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_NAME].addControl('screenDispVO.SCREEN_DISPLAY_ID', new FormControl(''));
            this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_NAME].addControl('screenDispVO.DEFAULT_VALUE', new FormControl(''));
            this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_NAME].addControl('fieldTechDetailsVO.ELEMENT_NAME', new FormControl(''));
            this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_NAME].addControl('fieldTechDetailsVO.VO_PROPERTY_NAME', new FormControl(''));

            const custParams = {
                operId: this.operId,
                appId: PsCommonSettings.APP_ID,
                channelId: PsCommonSettings.CHNL_ID,
                compCode: PsCommonSettings.COMP_CODE,
                calledFrom: this.calledFrom,
                actScreenDispId: this.actScreenDispId,
                appScreenDispId: this.appScreenDispId
            };
            custParams[ConstantCommon.CUSTOMIZATION_BY_NAME] = {
                fieldTechDetailsVO: {
                    ELEMENT_NAME: this.fieldName
                }
            };
            this.common.presentLoading();
            this.common.http.commonRequestAjax(PsCommonSettings.serviceUrl.returnElmCustomization, custParams).then(result => {
                if (result.success) {
                    const data = result.data[ConstantCommon.CUSTOMIZATION_BY_NAME];
                    if (data) {
                        this.common.copyObject(this.custData[ConstantCommon.CUSTOMIZATION_BY_NAME], this.convertFlagValues(true, data), true);
                        if ((this.calledFrom === 'M' && data.screenDispVO.BUS_RELATED === 1) || (this.calledFrom !== 'M')) {
                            setTimeout(() => {
                                this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_NAME].disable();
                            }, 0);
                            if (this.calledFrom === 'M' && data.screenDispVO.BUS_RELATED === 1) {
                                this.showBusRelatedMsg = true;
                            }
                        }
                        this.dataFetched = true;
                    }
                    // set the default value of the label key search language
                    if (this.availableOptions) {
                        if(this.availableOptions.KEY_LABEL_ID){
                            this.common.setValInsideNestedObj(this.customizationGroupByName.labelKeyOptions.fcName, this.labelKeyId, this.custData[this.CUSTOMIZATION_BY_NAME]);
                        }
                        if (this.availableOptions.PATTERN) {
                            this.common.setValInsideNestedObj(this.customizationGroupByName.patternLabelKeyOptions.fcName, this.patternErrorKeyId, this.custData[this.CUSTOMIZATION_BY_NAME]);
                        }
                        if (this.availableOptions.PLACEHOLDER_LABEL_ID) {
                            this.common.setValInsideNestedObj(this.customizationGroupByName.placeholderKeyOptions.fcName, this.placeholderKeyId, this.custData[this.CUSTOMIZATION_BY_NAME]);
                        }
                    }
                } else {
                    this.common.logger.error('error while getting the customization data:' + result.error);
                }
                this.common.dismissLoading();
            }).catch(error => {
                this.common.dismissLoading();
                this.common.logger.error('error in catch while getting the customization data:' + error);
            });


        }

    }

    returnDefaultCust(): any {
        const fNameLst = this.fieldName.split('.');
        let voProperty, voCoReference;
        if (fNameLst.length > 1) {
            voProperty = fNameLst[fNameLst.length - 1];
            const voIndex = this.fieldName.lastIndexOf('.');
            voCoReference = this.fieldName.substring(0, voIndex);
        }
        const fieldValidations = this.common.getElementValidations(this.fieldName);
        return {
            screenDispVO: {
                IS_MANDATORY: fieldValidations.IS_MANDATORY !== null && fieldValidations.IS_MANDATORY !== undefined ? fieldValidations.IS_MANDATORY === 0 || !this.availableOptions.IS_MANDATORY ? false : true : true,
                IS_VISIBLE: false, // means the field is visible (invisible = false)
                IS_READONLY: false,
                BUS_RELATED: 0
            },
            fieldTechDetailsVO: {
                VO_PROPERTY_NAME: voProperty,
                VO_CO_REFERENCE: voCoReference,
                ELEMENT_NAME: this.fieldName
            }
        };
    }

    /**
     * function to convert the values of visibility, mandatory, readonly and zero not allowed fields:
     * -from 0/1 to true/false after retreiving the data from the server.
     * -from true/false to 0/1 before sending data to server.
     * IS_VISIBLE = 0: invisible (flag checked), 1: visible (flag not checked)
     * IS_MANDATORY = 1: required (flag checked), 0: not required (flag not checked)
     * IS_READONLY = 1: disabled (flag checked), 0: enabled (flag not checked)
     *
     * @param convertToBoolean if true mean we want to convert from 1/0 to true/false and vice versa
     * @param values object of all the data (by name & by type)
     */
    convertFlagValues(convertToBoolean: boolean, values: any): any {
        if (values && values.screenDispVO) {
            const curData: any = {};
            this.common.copyObject(curData, JSON.parse(JSON.stringify(values)));
            if (convertToBoolean) {
                curData.screenDispVO.IS_VISIBLE = curData.screenDispVO.IS_VISIBLE === 0 ? true : false;
                curData.screenDispVO.IS_MANDATORY = curData.screenDispVO.IS_MANDATORY === 1 ? true : false;
                curData.screenDispVO.IS_READONLY = curData.screenDispVO.IS_READONLY === 1 ? true : false;
                this.patternErrorKeyId = curData.screenDispVO.PATTERN_ERROR_LABEL_ID ? curData.screenDispVO.PATTERN_ERROR_LABEL_ID : null;
                this.patterErrorDescLabelOptions.labelKey = curData.patternLabelDesc ? curData.patternLabelDesc : null;
                this.placeholderKeyId = curData.screenDispVO.PLACEHOLDER_LABEL_ID ? curData.screenDispVO.PLACEHOLDER_LABEL_ID : null;
                this.placeholderDescLabelOptions.labelKey = curData.placeholderLabelDesc ? curData.placeholderLabelDesc : null;
                this.labelKeyId = curData.screenDispVO.KEY_LABEL_ID ? curData.screenDispVO.KEY_LABEL_ID : null;
                this.labelKeyDescOptions.labelKey = curData.labelKeyDesc ? curData.labelKeyDesc : null;
                this.showLabelDesc = this.labelKeyId ? true : false;
                this.showPlaceholderLabelDesc = this.placeholderKeyId ? true : false;
                this.showErrorLabelDesc = this.patternErrorKeyId ? true : false;
                if (curData.patternLabelCode) {
                    curData.screenDispVO.PATTERN_ERROR_LABEL_ID = this.common.translate(curData.patternLabelCode);
                }
            } else {
                curData.screenDispVO.IS_MANDATORY = curData.screenDispVO.IS_MANDATORY ? 1 : 0;
                curData.screenDispVO.IS_READONLY = curData.screenDispVO.IS_READONLY ? 1 : 0;
                curData.screenDispVO.IS_VISIBLE = curData.screenDispVO.IS_VISIBLE ? 0 : 1;
                curData.screenDispVO.ZERO_NOT_ALLOWED = curData.screenDispVO.ZERO_NOT_ALLOWED ? 0 : 1;
            }
            return curData;
        }
        return values;
    }

    onClickSegment(selectedSegment) {
        if (selectedSegment === 1) {
            this.showCustByNameFields = true;
            this.showCustByTypeFields = false;
        } else {
            this.showCustByNameFields = false;
            this.showCustByTypeFields = true;
        }
    }

    onReadOnlyChange(values: IchangeValues, type) {
        let valueChanged = false;
        if (this.oldReadonlyValue !== undefined && this.oldReadonlyValue !== null) {
            this.oldReadonlyValue = this.oldReadonlyValue === 'false' || this.oldReadonlyValue === false || this.oldReadonlyValue === 0 || this.oldReadonlyValue === '0' ? 'false' : 'true';
            const currentValue = values.newValue === false || values.newValue === 0 ? 'false' : 'true';
            if (this.oldReadonlyValue !== currentValue) {
                valueChanged = true;
            }
        } else {
            valueChanged = true;
        }
        if (valueChanged) {
            if (values.newValue) {
                if (this.custData[type].screenDispVO && this.custData[type].screenDispVO.IS_MANDATORY) {
                    this.showMessage('fld_cust_editable_remove_not_allowed_key');
                    this.fieldCustForm[type].controls['screenDispVO.IS_READONLY'].setValue(false, { emitEvent: true });
                    this.custData[type].screenDispVO.IS_READONLY = 0;
                } else {
                    this.custData[type].screenDispVO.IS_READONLY = 1;
                }
            } else {
                this.custData[type].screenDispVO.IS_READONLY = 0;
            }
        }
    }

    onVisibilityChange(values: IchangeValues, type) {
        let valueChanged = false;
        if (this.oldVisibilityValue !== undefined && this.oldVisibilityValue !== null) {
            this.oldVisibilityValue = this.oldVisibilityValue === 'false' || this.oldVisibilityValue === false || this.oldVisibilityValue === 0 || this.oldVisibilityValue === '0' ? 'false' : 'true';
            const currentValue = values.newValue === false || values.newValue === 0 ? 'false' : 'true';
            if (this.oldVisibilityValue !== currentValue) {
                valueChanged = true;
            }
        } else {
            valueChanged = true;
        }
        if (valueChanged) {
            this.oldVisibilityValue = values.newValue;
            if (values.newValue) {
                if (this.custData[type].screenDispVO && this.custData[type].screenDispVO.IS_MANDATORY) {
                    this.showMessage('fld_cust_visibility_remove_not_allowed_key');
                    this.custData[type].screenDispVO.IS_VISIBLE = 0;
                    this.fieldCustForm[type].controls['screenDispVO.IS_VISIBLE'].setValue(false, { emitEvent: true });
                } else {
                    this.custData[type].screenDispVO.IS_VISIBLE = 1;
                }
            } else {
                this.custData[type].screenDispVO.IS_VISIBLE = 0;
            }
        }
    }

    onRequiredChange(values: IchangeValues, type) {
        let valueChanged = false;
        if (this.oldRequiredValue !== undefined && this.oldRequiredValue !== null) {
            this.oldRequiredValue = this.oldRequiredValue === 'false' || this.oldRequiredValue === false || this.oldRequiredValue === '0' || this.oldRequiredValue === 0 ? 'false' : 'true';
            const currentValue = values.newValue === false || values.newValue === 0 ? 'false' : 'true';
            if (this.oldRequiredValue !== currentValue) {
                valueChanged = true;
            }
        } else {
            valueChanged = true;
        }
        if (valueChanged) {
            if (values.newValue) {
                if (this.custData[type].screenDispVO && this.custData[type].screenDispVO.IS_READONLY) {
                    this.showMessage('checkReadOnly_key');
                    this.custData[type].screenDispVO.IS_MANDATORY = 0;
                    this.fieldCustForm[type].controls['screenDispVO.IS_MANDATORY'].setValue(false, { emitevent: true });
                } else {
                    if (this.custData[type].screenDispVO && this.custData[type].screenDispVO.IS_VISIBLE) {
                        this.showMessage('fld_cust_visibility_remove_not_allowed_key');
                        this.custData[type].screenDispVO.IS_MANDATORY = 0;
                        this.fieldCustForm[type].controls['screenDispVO.IS_MANDATORY'].setValue(false, { emitevent: true });
                    } else {
                        this.custData[type].screenDispVO.IS_MANDATORY = 1;
                    }
                }
            } else {
                this.custData[type].screenDispVO.IS_MANDATORY = 0;
            }
        }
    }

    onMinLengthChanged(data, type) {
        const maxLength = this.custData[type].screenDispVO.MAX_LENGTH;
        if (maxLength && maxLength <= data.newValue) {
            this.showMessage('min_max_error_key');
            this.fieldCustForm[type].controls['screenDispVO.MIN_LENGTH'].setValue(null, { emitevent: false });
            this.custData[type].screenDispVO.MIN_LENGTH = null;
        }
    }

    onMaxLengthChanged(data, type) {
        const minLength = this.custData[type].screenDispVO.MIN_LENGTH;
        if (minLength && minLength >= data.newValue) {
            this.showMessage('max_min_error_key');
            this.fieldCustForm[type].controls['screenDispVO.MAX_LENGTH'].setValue(null, { emitevent: false });
            this.custData[type].screenDispVO.MAX_LENGTH = null;
        }
    }

    onMinValueChanged(data, type) {
        const maxValue = this.custData[type].screenDispVO.MAX_VALUE;
        if (maxValue && maxValue <= data.newValue) {
            this.showMessage('min_max_error_key');
            this.fieldCustForm[type].controls['screenDispVO.MIN_VALUE'].setValue(null, { emitevent: false });
            this.custData[type].screenDispVO.MIN_VALUE = null;
        }
    }

    onMaxValueChanged(data, type) {
        const minValue = this.custData[type].screenDispVO.MIN_VALUE;
        if (minValue && minValue >= data.newValue) {
            this.showMessage('max_min_error_key');
            this.fieldCustForm[type].controls['screenDispVO.MAX_VALUE'].setValue(null, { emitevent: false });
            this.custData[type].screenDispVO.MAX_VALUE = null;
        }
    }

    private showMessage(message: string) {
        this.common.presentAlert(this.common.translate('warning_key'), this.common.translate(message), [this.common.translate('ok_key')]);
    }

    onLabelKeySelected(result) {
        if (result) {
            if (result.data) {
                const value = result.language ? result.language === 'EN' ? result.data.transEnglish : (result.language === 'FR' ? result.data.transFrench : (result.language === 'AR' ? result.data.transArabic : result.data.transEnglish)) : result.data.transEnglish;
                this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_NAME].controls['screenDispVO.KEY_LABEL_ID'].setValue(value);
                this.labelKeyId = result.data.keyLabelId;
            } else {
                this.showMessage('no_labels_found_key');
            }
        } else {
            this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_NAME].controls['screenDispVO.KEY_LABEL_ID'].setValue(null);
            this.labelKeyId = null;
        }
    }

    onPatternErrorKeySelected(result) {
        if (result) {
            if (result.data) {
                const value = result.language ? result.language === 'EN' ? result.data.transEnglish : (result.language === 'FR' ? result.data.transFrench : (result.language === 'AR' ? result.data.transArabic : result.data.transEnglish)) : result.data.transEnglish;
                this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_NAME].controls['screenDispVO.PATTERN_ERROR_LABEL_ID'].setValue(value);
                this.patternErrorKeyId = result.data.keyLabelId;
            } else {
                this.showMessage('no_labels_found_key');
            }
        } else {
            this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_NAME].controls['screenDispVO.PATTERN_ERROR_LABEL_ID'].setValue(null);
            this.patternErrorKeyId = null;
        }
    }

    onPlaceHolderKeySelected(result) {
        if (result) {
            if (result.data) {
                const value = result.language ? result.language === 'EN' ? result.data.transEnglish : (result.language === 'FR' ? result.data.transFrench : (result.language === 'AR' ? result.data.transArabic : result.data.transEnglish)) : result.data.transEnglish;
                this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_NAME].controls['screenDispVO.PLACEHOLDER_LABEL_ID'].setValue(value);
                this.placeholderKeyId = result.data.keyLabelId;
            } else {
                this.showMessage('no_labels_found_key');
            }
        } else {
            this.fieldCustForm[ConstantCommon.CUSTOMIZATION_BY_NAME].controls['screenDispVO.PLACEHOLDER_LABEL_ID'].setValue(null);
            this.placeholderKeyId = null;
        }
    }

    onSaveCust() {
        const formsChanged = {};
        const formKeys = Object.keys(this.fieldCustForm);
        for (const key of formKeys) {
            const myForm = this.fieldCustForm[key];
            if (myForm.dirty && this.calledFrom === 'M') {
                const minLength = this.custData[key] ? this.custData[key].screenDispVO ? this.custData[key].screenDispVO.MIN_LENGTH : null : null;
                const maxLength = this.custData[key] ? this.custData[key].screenDispVO ? this.custData[key].screenDispVO.MAX_LENGTH : null : null;
                if (maxLength && minLength != null && minLength > maxLength) {
                    this.showMessage('min_max_error_key');
                    return;
                }
                const minValue = this.custData[key] ? this.custData[key].screenDispVO ? this.custData[key].screenDispVO.MIN_VALUE : null : null;
                const maxValue = this.custData[key] ? this.custData[key].screenDispVO ? this.custData[key].screenDispVO.MIN_VALUE : null : null;
                if (minValue && maxValue && minValue > maxValue) {
                    this.showMessage('max_min_error_key');
                    return;
                }
                formsChanged[key] = true;
            }
        }
        if (formsChanged[ConstantCommon.CUSTOMIZATION_BY_NAME] || formsChanged[ConstantCommon.CUSTOMIZATION_BY_TYPE] || this.calledFrom === 'A') {
            const params = {};
            if (this.calledFrom === 'M') {
                if (formsChanged[this.CUSTOMIZATION_BY_NAME]) {
                    params[this.CUSTOMIZATION_BY_NAME] = this.convertFlagValues(false, this.custData.customizationByName);
                } else {
                    params[this.CUSTOMIZATION_BY_NAME] = {};
                }
                params[this.CUSTOMIZATION_BY_NAME]['changed'] = formsChanged[this.CUSTOMIZATION_BY_NAME];
                if (formsChanged[this.CUSTOMIZATION_BY_TYPE]) {
                    params[this.CUSTOMIZATION_BY_TYPE] = this.convertFlagValues(false, this.custData.customizationByType);
                } else {
                    params[this.CUSTOMIZATION_BY_TYPE] = {};
                }
                params[this.CUSTOMIZATION_BY_TYPE]['changed'] = formsChanged[this.CUSTOMIZATION_BY_TYPE];
            }
            if (params[this.CUSTOMIZATION_BY_NAME].screenDispVO !== undefined) {
                if (params[this.CUSTOMIZATION_BY_NAME].screenDispVO.DEFAULT_VALUE !== undefined && params[this.CUSTOMIZATION_BY_NAME].screenDispVO.DEFAULT_VALUE.itemValue !== undefined) {
                    params[this.CUSTOMIZATION_BY_NAME].screenDispVO.DEFAULT_VALUE = params[this.CUSTOMIZATION_BY_NAME].screenDispVO.DEFAULT_VALUE.itemValue;
                }
            }
            if (params[this.CUSTOMIZATION_BY_TYPE].screenDispVO !== undefined) {
                if (params[this.CUSTOMIZATION_BY_TYPE].screenDispVO.DEFAULT_VALUE !== undefined && params[this.CUSTOMIZATION_BY_TYPE].screenDispVO.DEFAULT_VALUE.itemValue !== undefined) {
                    params[this.CUSTOMIZATION_BY_TYPE].screenDispVO.DEFAULT_VALUE = params[this.CUSTOMIZATION_BY_TYPE].screenDispVO.DEFAULT_VALUE.itemValue;
                }
            }
            params['operId'] = this.operId;
            params['appId'] = PsCommonSettings.APP_ID;
            params['channelId'] = PsCommonSettings.CHNL_ID;
            params['compCode'] = PsCommonSettings.COMP_CODE;
            params['calledFrom'] = this.calledFrom;
            params['actScreenDispId'] = this.actScreenDispId;
            params['appScreenDispId'] = this.appScreenDispId;
            this.common.presentLoading();
            this.common.http.commonRequestAjax(PsCommonSettings.serviceUrl.saveOperCustomization, params).then(result => {
                if (result && result.success) {
                    // check if there's no already saved cust record, then add the new saved record to the map so that the cust icon will change color after save
                    let screenOperCust = this.common.initialScreenDisplayParams.get(this.operId);
                    if (typeof screenOperCust === 'undefined') {
                        screenOperCust = new Map<string, any>();
                        screenOperCust.set(this.fieldName, params[this.CUSTOMIZATION_BY_NAME].screenDispVO);
                        this.common.setInitialScreenDisplayParams(screenOperCust);
                    } else if (typeof screenOperCust.get(this.fieldName) === 'undefined') {
                        screenOperCust.set(this.fieldName, params[this.CUSTOMIZATION_BY_NAME].screenDispVO);
                    }
                    this.common.dismissLoading();
                    this.modalCtrl.dismiss();
                } else if (result.data.serviceResponse.statusDesc) {
                    this.showMessage(result.data.serviceResponse.statusDesc);
                    this.common.dismissLoading();
                } else {
                    this.common.logger.log('Error when saving in database');
                    this.common.dismissLoading();
                }
            }).catch(error => {
                this.common.logger.log('error in catch while saving the customization data:' + error);
            });
        } else {
            this.showMessage('no_changes_detected_key');
        }
    }

    confirmReset() {
        const alertController: IOptionsPsComplexAlertController = {
            header: 'confirm_delete_cust_key',
            buttons: [
                {
                    options: {
                        labelKey: 'no_key',
                        group: null
                    },
                    handler: () => {
                        CommonUtils.dismissAllModals();
                    }
                },
                {
                    options: {
                        labelKey: 'yes_key',
                        group: null
                    },
                    handler: () => {
                        CommonUtils.dismissAllModals();
                        this.onResetCust();
                    }
                }
            ]
        };
        this.common.presentPsAlert(alertController, 'confirm_reset_cust');
    }

    onResetCust() {
        const params = {};
        if (this.custData.customizationByName && this.custData.customizationByName.screenDispVO) {
            params[this.CUSTOMIZATION_BY_NAME] = { screenDispVO: { SCREEN_DISPLAY_ID: this.custData.customizationByName.screenDispVO.SCREEN_DISPLAY_ID } };
        } else {
            params[this.CUSTOMIZATION_BY_NAME] = {};
        }
        if (this.custData.customizationByType && this.custData.customizationByType.screenDispVO) {
            params[this.CUSTOMIZATION_BY_TYPE] = { screenDispVO: { SCREEN_DISPLAY_ID: this.custData.customizationByType.screenDispVO.SCREEN_DISPLAY_ID } };
        } else {
            params[this.CUSTOMIZATION_BY_TYPE] = {};
        }

        this.common.presentLoading();
        this.common.http.commonRequestAjax(PsCommonSettings.serviceUrl.resetOperCustomization, params)
            .then(res => {
                if (res.success) {
                    // remove the related record from the cust map so that the cust icon will change color after save
                    const screenOperCust = this.common.initialScreenDisplayParams.get(this.operId);
                    if (screenOperCust && screenOperCust.get(this.fieldName)) {
                        screenOperCust.delete(this.fieldName);
                    }
                    // AppProvider.showMessage('success_key','record_deleted_successfully_key');
                    this.common.copyObject(this.custData[ConstantCommon.CUSTOMIZATION_BY_NAME], this.returnDefaultCust(), true);
                    this.common.dismissLoading();
                } else {
                    this.common.logger.log('error while deleting the customization data:' + res.error);
                    this.common.dismissLoading();
                }
            })
            .catch(err => {
                this.common.logger.log('error in catch while deleting the customization data:' + err);
                this.common.dismissLoading();
            });
    }

    /**
     * will send fcnames and session parameters list to the admin service mapping screen
     * TP# 997503
     * @author Aftab.Ali
     * @since 15-9-2020
     */
    serviceMappingAction(custType) {
        const index: number = this.fcNamesAndsessionVarsList.indexOf('formData');
        if (index !== -1) {
            this.fcNamesAndsessionVarsList.splice(index, 1);
        }
        const serviceMappingParams = {
            fcAndSessionVarsNameList: this.fcNamesAndsessionVarsList,
            screenDispVO: this.custData[custType].screenDispVO,
            custType
        };
        window.parent.postMessage(JSON.stringify(serviceMappingParams), '*');
    }

    /**
     * will get back the service mapping id from admin (emitted from admin)
     * TP# 997503
     * @author Aftab.Ali
     * @since 15-9-2020
     */
    ngAfterViewInit(): void {
        window.addEventListener('message', (event) => {
            if (event && event.data) {
                const mappingParasm: any = JSON.parse(event.data);
                this.custData[ConstantCommon.CUSTOMIZATION_BY_NAME].screenDispVO.SERVICE_MAPPING_ID = mappingParasm.mappingId;
                const custType = mappingParasm.custType;
                if (!this.fieldCustForm[custType].touched) {
                    this.fieldCustForm[custType].markAsDirty();
                }
            }
        }, false);
    }


    /**
     * confirmation popup for removing service mapping
     * TP# 997503
     * @author Aftab.Ali
     * @since 15-9-2020
     */
    public confirmResetServiceMapping(custType) {
        const alertController: IOptionsPsComplexAlertController = {
            header: 'confirm_delete_service_mapping_key',
            buttons: [
                {
                    options: {
                        labelKey: 'no_key',
                        group: null
                    },
                    handler: () => {
                        CommonUtils.dismissAllModals();
                    }
                },
                {
                    options: {
                        labelKey: 'yes_key',
                        group: null
                    },
                    handler: () => {
                        CommonUtils.dismissAllModals();
                        this.resetServiceMapping(custType);
                    }
                }
            ]
        };
        this.common.presentPsAlert(alertController, 'confirm_delete_service_mapping');
    }

    /**
     * this will remove the service mapping id if already set base on customization type (by name or by type)
     * TP# 997503
     * @author Aftab.Ali
     * @since 15-9-2020
     */
    public resetServiceMapping(custType) {
        if (this.custData[custType] && this.custData[custType].screenDispVO) {
            this.custData[custType].screenDispVO.SERVICE_MAPPING_ID = null;
            if (!this.fieldCustForm[custType].touched) {
                this.fieldCustForm[custType].markAsDirty();
            }
        }
    }

}
