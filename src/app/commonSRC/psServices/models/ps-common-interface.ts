import { ElementRef, Type } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { NavigationOptions } from '@ionic/angular/providers/nav-controller';
import { AlertOptions, PickerButton, PickerColumn } from '@ionic/core';
import { google } from 'google-maps';
import { IOmniResponseBaseObject, IOptionsTemplateBase } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsRadio, PsSelect } from './common-type';



declare var google: google;

export interface IOptionsTemplateStepper extends IOptionsTemplateBase {
    stepperName?: string;
    numberOfSteps: number;
    namesofSteps: string[];
    isHorizontalStepper?: boolean;
    submitOptions?: IOptionsPsButtonSubmitExposed;
    showReport?: boolean;
    schedulerStepIndex?: number;
}


export interface IOptionsPsContainerStepperComponent extends IOptionsPsBaseContainer {
    numberOfSteps?: number;
    isHorizontalStepper?: boolean;
    namesofSteps?: string[];
    group?: FormGroup;
    schedulerStepIndex?: number;
}



export interface IUserIpInfo {
    deviceInfo: IDevice;
    callingCode: string;
    city: string;
    countryCapital: string;
    country_code: string;
    country_name: string;
    currency: string;
    currencySymbol: string;
    emojiFlag: string;
    flagUrl: string;
    ip: string;
    is_in_european_union: false;
    latitude: number;
    longitude: number;
    metro_code: number;
    organisation: string;
    region_code: string;
    region_name: string;
    suspiciousFactors: { isProxy: boolean, isTorNode: boolean, isSpam: boolean, isSuspicious: boolean };
    time_zone: string;
}

// moved from deviceInfo provider
export interface IDevice {
    /** Get the version of Cordova running on the device. */
    cordova?: string;
    /**
     * The device.model returns the name of the device's model or product. The value is set
     * by the device manufacturer and may be different across versions of the same product.
     */
    model?: string;
    /** Get the device's operating system name. */
    platform?: string;
    /** Get the device's Universally Unique Identifier (UUID). */
    uuid?: string;
    /** Get the operating system version. */
    version?: string;
    /** Get the device's manufacturer. */
    manufacturer?: string;
    /** Whether the device is running on a simulator. */
    isVirtual?: boolean;
    /** Get the device hardware serial number. */
    serial?: string;
}


export interface IOptionsPsBase {
    psClass?: string;
    allowCust?: boolean;
    labelKey?: string;
    disablePreview?: boolean;
    forceShowOnPreview?: boolean;
}

export interface IOptionsPsBaseField extends IOptionsPsBase {
    placeHolder?: string;
    group?: FormGroup;
    fcName?: any;
    hideErrors?: boolean;
    forceTriggerChange?: boolean; // Added by Richie for #TP 1082495
}
export interface IOptionsPsBaseContainer extends IOptionsPsBase {

}
export interface IOptionsPsContainerFlip extends IOptionsPsBaseContainer {
    hideVisibleArea: boolean;
    isFlipped?: boolean;
    animationClass?: string;
}
export interface IOptionsPsBaseAction extends IOptionsPsBase {
    executionClass?: any;
    isDisabled?: boolean;
    handler?: (value?: any) => boolean | void | {
        [key: string]: any;
    };
    preCallFunction?: IFunctionDefinition;
    postCallFunction?: IFunctionDefinition;
    failureCallFunction?: IFunctionDefinition;
}
export interface IOptionsPsFieldKeyin extends IOptionsPsBaseField {
    type?: string; // "text", "password", "email", "number", "search", "tel", "url".
    disableSpecChars?: boolean;
}
export interface IOptionsPsFieldLabel extends IOptionsPsBaseField {
    previewMode?: boolean;
    required?: boolean;
}
export interface IOptionsPsLabelInput extends IOptionsPsFieldLabel {
}
export interface IOptionsPsLabelHeader extends IOptionsPsFieldLabel {

}
export interface IOptionsPsLabelNav extends IOptionsPsFieldLabel {

}
export interface IOptionsPsContainerWidget extends IOptionsPsBaseContainer {

}
export interface IOptionsPsContainerPanel extends IOptionsPsBaseContainer {
    iconName?: string;
    isExpandable?: boolean;
    expanded?: boolean;
    iconUrl?: string;
}
export interface IOptionsPsContainerSlider extends IOptionsPsBaseContainer {
    currentIndex?: number;
}
export interface IOptionsPsContainerLanding extends IOptionsPsBaseContainer {

}
export interface IOptionsPsContainerForm extends IOptionsPsBaseContainer {

}
export interface IOptionsPsContainerDraggable extends IOptionsPsBaseContainer {

}
export interface IOptionsPsContainerCard extends IOptionsPsBaseContainer {

}

export interface IchangeValues {
    newValue: any;
    oldValue: any;
}


// Added by Richie for #BUG 794943
export interface IvalidatorErrMsg {
    msgKey: string;
    param?: any;
}
export interface IcustomPatternValidator {
    expression: string | RegExp;
    errorMsgs?: IvalidatorErrMsg[];
}
// end Richie

export interface IdefaultValidatorsBase {
    overrideCust?: boolean; // property to identify whether the default validations set should override any similar validations set through customization.(defaulted to false)
    disabled?: boolean; // sets the element to disabled
    visible?: boolean; // sets the visibility of the element
}
export interface IdefaultValidatorsBaseAction extends IdefaultValidatorsBase { }
export interface IdefaultValidatorsBaseField extends IdefaultValidatorsBase {
    required?: boolean; // sets the field to required
    validators?: ValidatorFn[]; // array of custom validators that might be created specific for certain fields
}
export interface IdefaultValidatorsBaseContainer extends IdefaultValidatorsBase { }
export interface IdefaultValidatorsFieldKeyin extends IdefaultValidatorsBaseField {
    minValue?: number; // sets the min value that can be entered on number fields
    maxValue?: number; // sets the max value that can be entered on number fields
    minLength?: number; // sets the min length of the string value that can be entered on text fields/text areas
    maxLength?: number; // sets the max length of the string value that can be entered on text fields/text areas
    pattern?: IcustomPatternValidator; // sets a specific pattern on the text field/text area fields
    zeroNotAllowed?: string;
    advancedOptions?: IAdvancedCustomization; // This object is NOT subject to customization(it is affected only by screen parameters)
}
export interface IdefaultValidatorsFieldSelect extends IdefaultValidatorsBaseField { }
export interface IdefaultValidatorsFieldLabel extends IdefaultValidatorsBaseField { }
export interface IdefaultValidators extends IdefaultValidatorsBase,
    IdefaultValidatorsBaseAction,
    IdefaultValidatorsBaseField,
    IdefaultValidatorsBaseContainer,
    IdefaultValidatorsFieldKeyin {
}


export interface IsysParamObj {
    IS_MANDATORY?: number;
    IS_READONLY?: number;
    IS_VISIBLE?: number;
    MAX_LENGTH?: number;
    MIN_LENGTH?: number;
    ZERO_NOT_ALLOWED?: number;
    BUS_RELATED?: number;
    VISIBILITY_EXPR?: string;
    READONLY_EXPR?: string;
    MANDATORY_EXPR?: string;
    LABEL_KEY_EXPR?: string;
    ZERO_NOT_ALLOWED_EXPR?: string;
    KEY_LABEL_CODE?: string;
    PATTERN_ERROR_CODE?: string;
    SERVICE_URL?: string;
    PATTERN?: string;
    MAX_VALUE?: number;
    MIN_VALUE?: number;
    PLACEHOLDER_LABEL_CODE?: string;
    DEFAULT_VALUE?: any;
    SERVICE_MAPPING_ID?: number;
}

export interface IAdvancedCustomization {
    allowSpecialCharacter?: boolean;
    isAlphaNumeric?: boolean;
    shouldStartWithLetter?: boolean;
    requireSpecialCharacters?: boolean;
    requireNumericCharacters?: boolean;
    requireUpperCase?: boolean;
    requireLowerCase?: boolean;
    requireAlphabeticCharacters?: boolean;
    requireOnlyNumeric?: boolean;
    requireNoneConsecutive?: boolean;
}

export interface IFloatingObject {
    naturalMaxLength: number;
    decimalMaxLength: number;
}
export interface IPsSelect {
    itemValue?: string | number;
    description?: string;
    additionalDescr?: string; // in case we need to display more than 1 field in the options list
    selected?: boolean;
    iconName?: string; // name of the icon displayed in the options list(ex: more, menu)
    iconUrl?: string; // path of the icon displayed in the options list(flags, etc..)
    selectedObj?: any;
    disableAdditionalDescrOnSelect?: boolean; // this var will disable the additional description on select
    subCategoryList?: any[];
    shortDescription?: string;
}
export interface IPsRadio {
    itemValue: string | number;
    description: string;
    checked?: boolean;
    disabled?: boolean;
}

export interface Isubject {
    preview: boolean;
    formGroup: FormGroup;
}
export interface PSAlertOptions extends AlertOptions {
    title?: string;
    img?: {
        url: string
        postion: 'prepend' | 'append'
    };
    alertMessage?: {
        maxHeight?: string
    };
    refCode?: string | number;
    func?: (value: any) => boolean | void;
}
export interface IOmniRequestBaseObject {
    /*compCode?: string,
    channelId?: number,
    appId?: number,
    */
    ocUserId?: number;
    userName?: string;
    machineName?: string;
    sessionId?: string;
    deviceType?: string;
    deviceMacAddress?: string;
    deviceIp?: string;
    pathParam?: string;
    fromIonic?: string;
    code?: number;
    serviceMethod?: string;
    vsCode?: string;
    userCifNo?: string;
    apiCode?: number;
    language?: string;
    actionType?: string;
    serviceType?: string;
    pageActionName?: string;
    status?: string;
    triggerItem?: string;
    interactionTitle?: string;
    triggerEvent?: string;
    action?: string;
    description?: string;
    dateTime?: Date;
    userAgent?: string;
    appChnlId?: number;
    paramNameList?: string;
    udid?: string; /* nabil feghali - OMNI common security  */
    refCode?: number;
    appIdentifier?: string;
    profileId?: number;
    agentAllowedCifNo?: string;
    listAllAllowedCifs?: string;
    corporateId?: string;
}

export interface IOptionsPsFieldSelect extends IOptionsPsBaseField {
    listOfOptions?: PsSelect;
    asyncURL?: string;
    totalNbRec?: number;
}

export interface ICommonInterfaceRequest extends IOmniRequestBaseObject {
    /* compCode: number,
    channelId: number,
    appId: number,
    ocUserId: number, */
    serviceMethod?: string;
    vsCode?: string;
    userCifNo?: string;
    apiCode?: number;
    operId?: number;
    vsBranchCode?: string;
}
export interface IonicGridFilterCO {
    colName: string; // column name (as it is in the query to be filtered on it)
    filterOptions: IIonicGridSortFilterCO;
    operator?: 'AND' | 'OR'; // operator to add several filters on several columns
}
export interface IIonicGridSortFilterCO extends ICommonInterfaceRequest {
    colId?: string; // column name used for sorting
    sort?: 'ASC' | 'DESC';
    filter?: string; // sets the value of the filter column
    filterTo?: string; // value 2 of the filter in case the filter was 'inRange'
    filterType?: 'number' | 'text' | 'date'; // type of the column to be filtered
    type?: 'equals' | 'notEqual' | 'startsWith' | 'endsWith' | 'contains' | 'notContains' | 'lessThan' | 'lessThanOrEqual' | 'greaterThan' | 'greaterThanOrEqual' | 'inRange'; // type of the operation of the filter
    dateFrom?: string; // value of the date to be filtered on in case the filter type was 'date'
    dateTo?: string; // value 2 of the filter in case the filter was 'inRange' and the filter type was 'date'
}
export interface IOmniGridParamRequest extends ICommonInterfaceRequest {
    sortModel?: Array<IIonicGridSortFilterCO>;
    filterModel?: Array<IonicGridFilterCO>;
    sortOrder?: string;
    whereQuery?: string;
    nbRec?: number;
    totalNbRec?: number;
    recToskip?: number;
}
export interface IOmniCustomizationRequest extends IOmniGridParamRequest {
    operId?: number;
    labelKeyCodeFlag?: boolean;
    labelExprKeyCodeFlag?: boolean;
    allApps?: boolean;
    allChnls?: boolean;
    labelKeyCode?: string;
    labelKeyDesc?: string;
    calledFrom?: string;
    actScreenDispId?: number;
    appScreenDispId?: number;
    screenDispVO?: IOC_SCREEN_DISPLAYVO;
    fieldTechDetailsVO?: IOC_FIELD_TECH_DETAILSVO;
}
export interface IOC_SCREEN_DISPLAYVOKey extends IOmniBaseVO {
    SCREEN_DISPLAY_ID?: number;
}
export interface IOC_SCREEN_DISPLAYVO extends IOC_SCREEN_DISPLAYVOKey {
    OPER_ID?: number;
    APP_ID?: number;
    CHNL_ID?: number;
    COMP_CODE?: number;
    STATUS?: string;
    IS_MANDATORY?: number;
    IS_VISIBLE?: number;
    IS_READONLY?: number;
    ZERO_NOT_ALLOWED?: number;
    MAX_LENGTH?: number;
    MIN_LENGTH?: number;
    KEY_LABEL_ID?: number;
    KEY_LABEL_CODE?: number;
    BUS_RELATED?: number;
    FIELD_TECH_DETAILS_ID?: number;
    MANDATORY_EXPR?: string;
    VISIBILITY_EXPR?: string;
    READONLY_EXPR?: string;
    ZERO_NOT_ALLOWED_EXPR?: string;
    LABEL_KEY_EXPR?: string;
    OC_CREATED_BY?: number;
    DATE_CREATED?: Date;
    OC_MODIFIED_BY?: number;
    DATE_MODIFIED?: Date;
    OC_APPROVED_BY?: number;
    DATE_APPROVED?: Date;
    DATE_UPDATED?: Date;
    PATTERN_ERROR_LABEL_ID?: number;
    PLACEHOLDER_LABEL_ID?: number;
}
export interface IOC_FIELD_TECH_DETAILSVOKey extends IOmniBaseVO {
    FIELD_TECH_DETAILS_ID?: number;
}
export interface IOC_FIELD_TECH_DETAILSVO extends IOC_FIELD_TECH_DETAILSVOKey {
    ENTITY_TYPE?: string;
    ELEMENT_NAME?: string;
    ELEMENT_ID?: string;
    VO_PROPERTY_NAME?: string;
    VO_CO_REFERENCE?: string;
}
export interface IOmniBaseVO {
    crud?: string;
    channelId?: number;
    operId?: number;
    appName?: string;
    language?: string;
    opt?: string;
    originalCode?: number;
    tableRef?: number;
    ocUserId?: number;
    status?: string;
    runningDate?: Date;
    smartCOList?: Array<any>;
    otherLanguagesJson?: string;
    otherLanguagesColumnKey?: string;
    otherLanguagesTableCode?: number;
    otherLangList?: Array<any>;
    fieldList?: Array<any>;
    lovTypeId?: number;
    errorCode?: number;
    errorDesc?: string;
    reference?: string;
    responseCode?: number;
    responseDesc?: string;
    userCifNo?: string;
    briefDesc?: string;
    longDesc?: string;
    userName?: string;
    appIdentifier?: string;
    vsCode?: string;
    vsBranchCode?: string;
}
export interface IHTTPResponseResult {
    pathParam?: string;
    key?: string;
    iv?: string;
}


export interface IOptionsPsActionIcon extends IOptionsPsBaseAction {
    iconName?: string;
    disableFlipRTL?: boolean;
    iconPosition?: string;
    labelOptions?: IOptionsPsLabel;
}


export interface IOptionsPsIconAvailable extends IOptionsPsActionIcon {

}
export interface IOptionsPsIconUnAvailable extends IOptionsPsActionIcon {

}



export interface IOptionsPsContainerItem extends IOptionsPsBaseContainer {
    iconOptions?: IOptionsPsActionIcon;
    imageOptions?: IOptionsPsActionImage;
    hideImageAndIconIfNotPresent?: boolean;
    serviceMappingIconOptions?: IOptionsPsActionIcon;
}

export interface IOptionsPsKeyinDate extends IOptionsPsFieldKeyin {
    min?: Date;
    max?: Date;
    cancelText?: string;
    doneText?: string;
    displayFormat?: string;
    pickerFormat?: string;
    pickerOptions?: IOptionsPsPicker;
    /** Added by Hisham.Omar TP#1136182 start */
    setValAsFormat?: boolean;
    /** Added by Hisham.Omar TP#1136182 end */
}

export interface IOptionsPsPicker {
    animated?: boolean;
    backdropDismiss?: boolean;
    buttons?: PickerButton[];
    columns?: PickerColumn[];
    cssClass?: string | string[];
    showBackdrop?: boolean;
}

export interface IOptionsPsKeyinInput extends IOptionsPsFieldKeyin {
    iconOptions?: IOptionsPsActionIcon;
    mask?: IPsMaskOptions;
    imageOptions?: IOptionsPsActionImage;
    autocomplete?: 'off' | 'on' | 'new-password';
    autoCompleteList?: any[];
    showEmpty?: boolean;
    name?: string;
}

export interface IVersionParts {
    major?: number;
    minor?: number;
    extension?: number;
    store?: number;
    live?: number;
    assets?: number;
}

/**
 * interface for the inputMask library to apply masking on the input fields.
 * for detailed info about the options, refer to the below url:
 * https://www.npmjs.com/package/inputmask
 */
export interface IPsMaskOptions {
    mask?: string;
    alias?: string;
    regex?: string;
    placeholder?: string;
    optionalmarker?: { start: string; end: string; };
    quantifiermarker?: { start: string; end: string; };
    groupmarker?: { start: string; end: string; };
    alternatormarker?: string;
    escapeChar?: string;
    numericInput?: boolean;
    rightAlign?: boolean;
    radixPoint?: string;
    autoGroup?: boolean;
    digits?: number;
    digitsOptional?: boolean;
    groupSeparator?: string;
    positionCaretOnClick?: 'none' | 'lvp' | 'radixFocus' | 'select' | 'ignore';
    shiftPositions?: boolean;
    _radixDance?: boolean;
    allowPlus?: boolean;
    allowMinus?: boolean;
    repeat?: number;
    greedy?: boolean;
    showMaskOnHover?: boolean;
    showMaskOnFocus?: boolean;
    tabThrough?: boolean;
    definitions?: any;
}

export interface IOptionsPsActionButton extends IOptionsPsBaseAction {
    type?: 'button' | 'reset' | 'submit';
    iconName?: string;
    iconPosition?: 'start' | 'end' | 'icon-only';
    group: FormGroup;
}
export interface IOptionsPsSocialSharing extends IOptionsPsActionIcon {
    message: string;
    url?: string;
    subject?: string;
    files?: string[];
}
export interface IOptionsPsButtonSubmit extends IOptionsPsActionButton {
    // Submit specific properties goes here
    submitServiceUrl?: string;
    extraParams?: any;
    stepper?: MatStepper;
    stepperId?: string;
    isSave?: boolean;
    appendPreCallResult?: boolean;
    actionType?: string;
}

export interface IOptionsPsButtonSave extends IOptionsPsButtonSubmit {
    stepper?: MatStepper;
    dataSaveId?: number;
}

export interface IOptionsPsButtonApprove extends IOptionsPsButtonSubmit {
}

export interface IOptionsPsButtonReject extends IOptionsPsButtonSubmit {
}

export interface INavigationHandler {
    pageData: Array<IPageCommon>;
    routesParam?: Array<any>;
    commonParam?: any;
    currentPage: number;
    mainPage: string;
}

export interface IOptionsPsButtonReset extends IOptionsPsActionButton {
    // Reset specific properties goes here
}

export interface IOptionsPsButtonPrevious extends IOptionsPsActionButton {
    // Back specific properties goes here
    stepper?: MatStepper;
    stepperId?: string;
    floatingButton?: boolean;
}

export interface IOptionsPsButtonNext extends IOptionsPsActionButton {
    stepper?: MatStepper;
    stepperId?: string;
    floatingButton?: boolean;
}

export interface IOptionsPsButtonStandard extends IOptionsPsActionButton {
    iconName?: string;
    iconPosition?: 'start' | 'end' | 'icon-only';

}

export interface IOptionsPsButtonCancel extends IOptionsPsActionButton {
}

export interface IOptionsPsSelectCheckbox extends IOptionsPsBaseField {
    // Checkbox specific properties goes here
}


export interface IOptionsPsSelectCheckboxExposed extends IOptionsPsBaseField {
    // Checkbox specific properties goes here
}

export interface IOptionsSelectRadio extends IOptionsPsFieldSelect {
    listOfOptions: PsRadio;

}

export interface IOptionsPsInputUserName extends IOptionsPsKeyinInput {
}


export interface IOptionsPsInputPassword extends IOptionsPsKeyinInput {

}

export interface IOptionsPsBaseGroupFormExposed {
    group?: FormGroup;
    fcName?: string;
}
export interface IOptionsPsBaseExposed {
    labelKey?: string;
    psClass?: string;
    allowCust?: boolean;
    forceShowOnPreview?: boolean;
}

export interface IOptionsPsBaseFieldExposed extends IOptionsPsBaseExposed, IOptionsPsBaseGroupFormExposed {
    placeHolder?: string;
    forceTriggerChange?: boolean; // Added by Richie for #TP 1082495
}

export interface IOptionsPsFieldKeyinExposed extends IOptionsPsBaseFieldExposed {

}

export interface IOptionsPsBaseActionExposed extends IOptionsPsBaseExposed {
    executionClass?: string;
}

export interface IOptionsPsKeyinInputExposed extends IOptionsPsFieldKeyinExposed {
    iconOptions?: IOptionsPsActionIconExposed;
}

export interface IOptionsPsActionIconExposed extends IOptionsPsBaseActionExposed {
    iconName?: string;
    labelOptions?: IOptionsPsActionLabelExposed;
}

export interface IOptionsPsActionImageExposed extends IOptionsPsBaseActionExposed {
    imageName?: string;
    imageBase64Url?: string;
    labelOptions?: IOptionsPsActionLabelExposed;
}

export interface IOptionsPsInputUserNameExposed extends IOptionsPsKeyinInputExposed {
    iconOptions?: IOptionsPsActionIconExposed;
    imageOptions?: IOptionsPsActionImageExposed;
}

export interface IOptionsPsInputSearchHTMLExposed extends IOptionsPsKeyinInputExposed {
    iconOptions?: IOptionsPsActionIconExposed;
    contentReference: string;
}

export interface IOptionsPsActionLabelExposed extends IOptionsPsBaseActionExposed {

}


export interface IOptionsPsInputPasswordExposed extends IOptionsPsKeyinInputExposed {
    iconOptions?: IOptionsPsActionIconExposed;
}

export interface IPsTemplatePreviewComponent {
    key: string;
    value: any;
}

export interface IPreloginPreperation {
    privateKey: any;
    publicKey: any;
    udid: any;
}

export interface IOptionsPsActionMenuItem extends IOptionsPsBaseAction {
    anchorValue?: string;
    expandCollapseIconOptions?: IOptionsPsActionIcon;
    menuIconOptions?: IOptionsPsActionIcon;
}

export interface IOptionsPsSelectDropdown extends IOptionsPsFieldSelect {
    enableLoading?: boolean;
    selectDefaultItem?: any;
    iconOptions?: IOptionsPsActionIcon;
    imageOptions?: IOptionsPsActionImage;
    panelClass?: string | string[] | Set<string> | { // panelClass is a css class added by material on the select popup
        [key: string]: any;
    };
    forcePanelClose?: boolean;
    searchOptions?: IOptionsPsKeyinInput;
    debounceTime?: number;
    serviceRequestObj?: any;
}

export interface IOptionsPsSelectDropdownOverlay extends IOptionsPsSelectDropdown {
    parentElementRef?: ElementRef<any>;
}


export interface IOptionsPsFileUploadComponent extends IOptionsPsBaseGroupFormExposed {
    maxImgWidth?: number;
    maxImgHeight?: number;
    maxNbFiles?: number;
    multiple?: boolean;
    lableKey?: string;
    uploadIconName?: string;
    removeIconName?: string;
}
export interface IOptionsPsInputAmount extends IOptionsPsFieldKeyin {
    decimalPoints?: number;
}
export interface IOptionsPsDateFuture extends IOptionsPsKeyinInput, IOptionsPsActionIcon {
}

export interface IOptionsPsInputAmount extends IOptionsPsFieldKeyin {
    decimalPoints?: number;
}

export interface IOptionsPsKeyinTextarea extends IOptionsPsFieldKeyin {
    rows?: string;
    cols?: string;
    autoGrow?: boolean;
    maxLength?: number;
    minLength?: number;
}

export interface IOptionsPsComplexPreview {
    group: FormGroup;
}


export interface IOptionsPsDateFuture extends IOptionsPsKeyinInput, IOptionsPsActionIcon {

}

export interface IFunctionDefinition {
    func: (...param: any) => Promise<any>;
    executionClass: any;
    params?: Array<any>;

}

export interface IPrayerTime {
    id: 'Asr' | 'Dhuhr' | 'Fajr' | 'Imsak' | 'Isha' | 'Maghrib' | 'Midnight' | 'Sunrise' | 'Sunset';
    time: string;
    progress?: number;
    remaining?: string;
}

export interface IOptionsBiometricAuth {
    username: string;
}

export interface ICustomerInfoCO extends IOmniBaseVO {
    cifType?: string;
    profileID?: string;
    activationDay?: string;
    additionalReference?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    address4?: string;
    addressDesc?: string;
    appCustomerApprovalDate?: Date;
    appCustomerID?: string;
    appCustomerOmniStatus?: string;
    appCustomerRoleId?: string;
    appCustomerUsersNumber?: string;
    birthDate?: Date;
    blackListed?: number;
    blockReason?: string;
    branchBriefDesc?: string;
    branchCode?: string;
    cancelReason?: string;
    cardName?: string;
    cifStatus?: string;
    cityCode?: string;
    cityName?: string;
    area?: string;
    buildingOrHouse?: string;
    coreEmail?: string;
    country?: string;
    countryISOCode?: string;
    countryOfIssuance?: string;
    countryName?: string;
    createdDate?: Date;
    defaultAddress?: string;
    firstName?: string;
    lastName?: string;
    fax?: string;
    firstLoginDate?: Date;
    idExpiryDate?: Date;
    governmentRate?: string;
    idType?: string;
    idTypeEng?: string;
    lastAccsessTime?: Date;
    longName?: string;
    martialStatus?: string;
    fullName?: string;
    nationality?: string;
    omniEmail?: string;
    omniMaximumDailyLimit?: string;
    omniNbrHit?: string;
    organizationCode?: string;
    otherTel?: string;
    tel?: string;
    workTel?: string;
    homeTel?: string;
    passportNO?: string;
    passportExpiryDate?: Date;
    passportIssueDate?: Date;
    passportCountryCode?: string;
    pinLastModified?: Date;
    POBox?: string;
    POBoxArea?: string;
    postalCode?: string;
    priorityCode?: string;
    PWDLastModified?: Date;
    reactivationReason?: string;
    regionCode?: string;
    regionName?: string;
    remoteHost?: string;
    resetPass?: string;
    resetPin?: string;
    corporateRoleName?: string;
    sessionId?: string;
    shortName?: string;
    streetDetails?: string;
    suspensionMadeBy?: string;
    suspensionReason?: string;
    suspensionDate?: Date;
    typeOfDelivery?: string;
    typeIdNo?: string;
    userImagePath?: string;
    userApprovalDate?: Date;
    userMobileNumber?: string;
    vascoCorpMobile?: string;
    vtInd?: string;
    isExisitng?: boolean;
    socialId?: string;
    securityID?: string;
    securityAnswer?: string;
    employerName?: string;
    occupation?: string;
    dateOfJoining?: Date;
    toDate?: Date;
    employerCountry?: string;
    employerCity?: string;
    employerArea?: string;
    employerStreet?: string;
    employerpoBox?: string;
    employerOfficeTel?: string;
    employerMobileNumber?: string;
    employerFax?: string;
    employerDivision?: string;
    employerDepartment?: string;
    salary?: number;
    securityType?: string;
    securityAnswerForHistory?: string;
    idNumber?: string;
    occupationLineNumber?: number;
    addressLineNumber?: number;
}

export interface IFileUploadObject {
    status?: 'N' | 'R' | 'D'; // status of the file: N=New, R=Retrieved, D=Deleted
    file?: string;
    fileName?: string;
    fileSize?: number;
    fileExt?: string;
    isImage?: boolean;
    imageUrl?: any;
    fakePath?: string; // this attribute is for the html input field.
}

export interface IFileUpload {
    status?: 'N' | 'R' | 'D'; // status of the file: N=New, R=Retrieved, D=Deleted
    fileExt?: string;
    selectedFile?: PsFile;
    fileUrlB64?: string;
    upHttpResponse?: any;
    uploaded?: boolean;
}

export interface PsFile extends Blob {
    name?: string;
    lastModified?: number;
}

export interface IOptionsPsSelectToggle extends IOptionsPsBaseField {

}

export interface IOptionsPsActionImage extends IOptionsPsBaseAction {
    imageName?: string;
    imageBase64Url?: string;
    labelOptions?: IOptionsPsLabel;
    imagePath?: string;
}

export interface IOptionsPsImageInlineLabeled extends IOptionsPsBaseAction {
    actionImageOptions?: IOptionsPsActionImage;
    labelOptions?: IOptionsPsLabel;
}
export interface IOptionsPsInlineLabeledCamera extends IOptionsPsImageInlineLabeled, IOptionsPsBaseGroupFormExposed {

}

export interface IOptionsPsActionImageLabeled extends IOptionsPsBaseAction {
    actionImageOptions?: IOptionsPsActionImage;
    labelOptions?: IOptionsPsLabel;
}
export interface IOptionsContainerDynComponentParam {
    optionKey?: string;// the option id where we need to set the value 
    itemKey?: string;// the item id from where we need to get the value (item is 1 row from the lookup options)
}


export interface IOptionsPsActionHyperlink extends IOptionsPsBaseAction {
    anchorValue?: string; // used for native href window.location.href
    route?: string; // used for angular router
    navigationOptions?: PSNavigationOptions;
    iconOptions?: IOptionsPsActionIcon;
    imageOptions?: IOptionsPsActionImage;
    pageOptions?: {
        operId?: number,
        title?: string,
        iconName?: string
    };
    disableLoading?: boolean;
    preCallFunction?: IFunctionDefinition;
    operId?: number;
    showPrompt?: boolean;
    promptMessage?: string;
}

export interface IUsersList {
    businessProfileCode?: string;
    businessProfileDescription?: string;
    email?: string;
    mobileNumber?: string;
    newName?: string;
    statusDescription?: string;
    subProfile?: string;
    newUserName?: string;
    userStatus?: string;
    language?: string;
    allowedAccounts?: any;
    status?: string;
    dataSaveId?: any;
    alertLanguage?: string;
    onlineRegYN?: string;
    reason?: string;
    userId?: string | number;
}

export interface IOptionsPsHyperlinkAnchor extends IOptionsPsActionHyperlink {
    titleOptions?: IOptionsPsLabel;
    descriptionOptions?: IOptionsPsLabel;
}

export interface IOptionsPsHyperlinkInlineLabeled extends IOptionsPsActionHyperlink, IOptionsPsImageInlineLabeled {

}

export interface IOptionsPsLabel extends IOptionsPsFieldLabel {
    position?: 'fixed' | 'floating' | 'stacked';
    positionOption?: string;
    translate?: boolean;
    isInnerHTML?: boolean;
}

export interface IOptionsPsContainerHtmlViewer extends IOptionsPsBaseContainer {
    fileName?: string;
    htmlSrc?: string;
    parseHtmlFromFile?: boolean;
}

export interface IOptionsPsContainerList extends IOptionsPsBaseContainer {

}

export interface IOptionsPsTemplateForm extends IOptionsTemplateBase {
    submitOptions?: IOptionsPsButtonSubmitExposed;
}

export interface IOptionsPsFormStep extends IOptionsPsBaseContainer {

}
export interface IOptionsPsTemplateView extends IOptionsTemplateBase {
    disableLoading?: boolean;
}
export interface IOptionsPsFormMap extends IOptionsPsBaseContainer {
    markers?: any;
    legend?: Array<{
        name: string,
        icon: string
    }>;
}
export interface IOptionsPsButtonCall extends IOptionsPsActionButton {
    cellNumber?: string;
}
export interface IOptionsPsButtonCallExposed extends IOptionsPsActionButton {
    cellNumber?: string;
}

export interface IOptionsPsButtonDirection extends IOptionsPsActionButton {
    currentLocation?: google.maps.LatLng;
    markerLocation?: google.maps.LatLng;
    currentLocationString?: string;
    markerLocationString?: string;
}

export interface IOptionsPsSelectSegment extends IOptionsPsFieldSelect {
    segmentList?: IPsSelect[];
    defaultSegment?: IPsSelect;
    lovTypeId?: number;
}
export interface IOptionsPsBaseActionModal extends IOptionsPsBaseAction {
    component?: any;
    componentOption?: any;
    modalClassName?: string;
}


export interface IOptionsPsActionGallery extends IOptionsPsBaseAction {
    layout?: 'slider' | 'grid';
    selectedItem?: any;
    itemWidth?: number;
    itemHieght?: number;
    numberOfItemsPerPage?: number;
    mediaList?: MediaSource[];
}

export interface IOptionsPsContainerReportViewer extends IOptionsPsBaseContainer, IOptionsPsReportAction {
    serviceUrl?: string;
    selectedItem?: any;
    itemWidth?: number;
    itemHieght?: number;
    numberOfItemsPerPage?: number;
    mediaList?: MediaSource[];
    operId?: number;
    showReport?: boolean;
}



export interface IOptionsPsReportAction extends IOptionsPsActionButton {
    reportId?: number;
    reportParametersList?: any;
    commonRootParams?: any;
}

export interface IOptionsPsButtonExport extends IOptionsPsReportAction {

}

export interface IOptionsPsButtonPrint extends IOptionsPsReportAction {

}

export interface IOptionsPsTemplateReport extends IOptionsTemplateBase {
    operId?: number;
    reportParametersList?: any;
    dynamicOperId?: number;
    submitOptions?: IOptionsPsButtonSubmit;
    showReport?: boolean;
    parentOperId?: number;
}


export interface IOptionsPsSelectSegment extends IOptionsPsFieldSelect {
    segmentList?: IPsSelect[];
    lovTypeId?: number;
}


export interface IOptionsPsButtonNotification extends IOptionsPsActionButton {
    component?: any;
    componentOption?: any;
    notificationsCount?: number;

}

export interface IOptionsPsButtonNotificationExposed extends IOptionsPsActionButton {
    component?: any;
}


export interface IOptionsPsBaseActionPopOver extends IOptionsPsBaseAction {
    component?: any;
    componentOption?: any;
    event?: any;
}


export class MediaSource {
    data?: string;
    type?: 'image' | 'video' | 'html' | 'Text';
    id?: number;
    thumbnail?: string;
    description?: string;
    imageName?: string;
    fileName?: string;
}
export interface IOptionsPsButtonEmailUs extends IOptionsPsActionButton {
    toContactEmails?: string;
    ccContactEmails?: string;
    subject?: string;
}
export interface IOptionsPsButtonEmailUsExposed extends IOptionsPsActionButton {
    toContactEmails?: string;
    ccContactEmails?: string;
}


export interface IOmniCommonFileRequest {
    operId?: number;
    reportFormat?: IFileFormat;
    reportParametersList?: any;
    reportType?: string;
}

export enum IFileFormat {
    PDF = 'PDF',
    EXCEL = 'XLS',
    HTML = 'HTML'
}


export interface IOmniCommonServiceResponse {
    outputType?: string;
    outputCode?: number;
    outputNotification?: string;
}

export interface IOmniCommonFileResponse extends IOmniCommonServiceResponse {
    base64Data?: string;
    fileSize?: number;
    fileName?: string;
}

export interface IOptionsActionSheet {
    header?: string;
    subHeader?: string;
    cssClass?: string | string[];
    buttons?: (IOptionsActionSheetButton | string)[];
}

export interface IOptionsActionSheetButton {
    text?: string;
    role?: 'cancel' | 'destructive' | 'selected' | string;
    icon?: string;
    cssClass?: string | string[];
    handler?: () => boolean | void | Promise<boolean>;
}

export interface IOptionsQiblaDirection extends IOptionsPsBase {
    lblOptions?: IOptionsPsLabelInput;
    landMarkCompassOtpions?: IOptionsQiblaDirection;
}

export interface IOptionsPsIconCustomization extends IOptionsPsActionIconExposed {
    availableCustomization?: IAvailableCustomizationOptions;
    fieldNameId?: string;
    fieldNameDesc?: string;
    component?: any;
    componentOptions?: any;
    sessionVarsList?: string[];
    formGroup?: FormGroup;
}

export interface IAvailableCustomizationOptions {
    SERVICE_URL?: string;
    IS_MANDATORY?: boolean;
    IS_VISIBLE?: boolean;
    IS_READONLY?: boolean;
    ZERO_NOT_ALLOWED?: boolean;
    MAX_LENGTH?: boolean;
    MIN_LENGTH?: boolean;
    KEY_LABEL_ID?: boolean;
    PLACEHOLDER_LABEL_ID?: boolean;
    MAX_VALUE?: boolean;
    MIN_VALUE?: boolean;
    PATTERN?: boolean;
    TOOLTIP_LABEL_ID?: boolean;
    HINT_LABEL_ID?: boolean;
    ICON_NAME?: boolean;
    IMAGE_NAME?: boolean;
    FORMAT?: boolean;
    DEFAULT_VALUE?: boolean;
    SERVICE_MAPPING?: boolean;
}


export interface IMainCustomizationOptions {
    visibleFlagOptions?: IOptionsPsSelectCheckbox;
    readOnlyFlagOptions?: IOptionsPsSelectCheckbox;
    requiredFlagOptions?: IOptionsPsSelectCheckbox;
    allowZeroFlagOptions?: IOptionsPsSelectCheckbox;
    minLengthOptions?: IOptionsPsKeyinInput;
    maxLengthOptions?: IOptionsPsKeyinInput;
    patternOptions?: IOptionsPsKeyinInput;
    minValueOptions?: IOptionsPsInputAmount;
    maxValueOptions?: IOptionsPsInputAmount;
    labelKeyOptions?: IOptionsPsSelectDropdown;
    patternLabelKeyOptions?: IOptionsPsSelectDropdown;
    placeholderKeyOptions?: IOptionsPsSelectDropdown;
    dynamicComponentOptions?: IOptionsPsDynamicComponentLoaderExposed;
    defaultValueOptions?: any;
    defalutLabelOption?: IOptionsPsKeyinInput;
    defalutPlaceholderOption?: IOptionsPsKeyinInput;
}

export interface ICustomizationData {
    customizationByType?: any;
    customizationByName?: any;
}
export interface ICustomizationGroups {
    customizationByType?: FormGroup;
    customizationByName?: FormGroup;
}

export interface IOmniAccountRequest extends ICommonInterfaceRequest {
    accountNumber?: string;
    accountType?: string;
    accountCurrencyCode?: number;
    permittedGls?: string;
    blockedAmount?: string;
    dateFrom?: Date;
    dateTo?: Date;
    showAccountHistoryDetails?: number;
    showAdditionalFields?: number;
    showChargesDetails?: number;
    accGl?: number;
    availableBalance?: number;
    serialNo?: number;
    accountAllowedCurrencies?: string;
    accountAllowedTypes?: string;
    nbRec?: number;
    recToskip?: number;
    fromTo?: string;
    fromCurrency?: any;
    toCurrency?: any;
    type?: string;
}

export interface IOmniCommonCO extends IOmniBaseVO {
    compCode?: number;
    counterId?: number;
    channelId?: number;
    appId?: number;
    omniChannelName?: string;
    omniAppName?: string;
    omniAppDesc?: string;
    multipleUserApp?: string;
    omniChannelDesc?: string;
}
export interface IAccountStatementResponse extends IOmniCommonCO {
    accountNumber?: string;
    accountTypeDescription?: string;
    accountName?: string;
    accountType?: string;
    currencyDesc?: string;
    availableBalance?: number;
    currentBalance?: number;
    currencyDecimalPoints?: number;
    currencyFlag?: string;
    dateCreated?: Date;
    holdAmount?: number;
    settlementAmount?: number;
    defaultCurrencyDecimalPoint?: number;
    currencyCode?: number;
    glCode?: number;
    accountCat?: string;
    branchCode?: number;
    numberOfRecordsStillExist?: number;
}


export interface IOptionsPsCheckboxCustomization extends IOptionsPsSelectCheckbox {
    textAreaOptions?: IOptionsPsKeyinTextarea;
}

export enum IPeriodicityEnd {
    NEVER = 'Never',
    UNTIL = 'Until',
    COUNT = 'Count'
}

export enum IPeriodicity {
    ONCE = 'Single Future Date',
    WEEKLY = 'Recurring Weekly',
    MONTHLY = 'Recurring Monthly',
    YEARLY = 'Recurring Yearly',
}
export enum IPeriodicityFactor {
    DATE = 'Date',
    DAY = 'Day',
}

export interface IOptionsPsSelectAvatar extends IOptionsPsActionButton {
    imageName?: string;
    imageBase64Url?: string;
    uploadEnable?: boolean;
}

export enum AlertType {
    SUCCESS = 's',
    FATAL = 'F',
    FAILURE = 'e',
    INFO = 'i',
    UPLOAD = 'u'
}

export interface ResponseError {
    type?: 'SUCCESS' | 'FATAL' | 'FAILURE' | 'INFO';
    outputCode?: number;
    message?: string;
}

export interface IOptionsLocationInformation {
    latitude?: number;
    longitude?: number;
    timestamp?: number;
    currentCountry?: string;
    currentCity?: string;

}


export interface IOptionsAlert {
    iconName?: string;
    imageName?: string;
    title?: string;
    message?: string;
    autoHide?: boolean;
    noButtons?: boolean;
    type?: AlertType;
    displayImageOrIcon?: boolean;
    buttonsArray?: Array<IOptionsAlertButton>;
}

export interface IOptionsPsBalanceExposed extends IOptionsPsBaseFieldExposed {
    labelBalance1?: string;
    balanceValue1?: string;
    labelBalance2?: string;
    balanceValue2?: string;
}

export interface IOptionsDynamicEditExposed extends IOptionsPsBaseFieldExposed {
    itemCard?: any;
    requestMap?: Map<string, string>;
    valueMap?: string;
    formGroup?: FormGroup;
    isEditable?: boolean;
    actionUrl?: string;
    editRequestMap?: Map<string, string>;
    showButton?: boolean;
    translate?: boolean;
}

export interface IPageCommon {
    title?: string;
    component?: any;
    active?: boolean;
    hasParent?: boolean;
    param?: any;
    collapse?: boolean;
    children?: Array<IPageCommon>;
    icon?: string;
    operID?: number;
    isRoot?: boolean;
    isParent?: boolean;
    isChildLeaf?: boolean;
    hide?: boolean;
    parent?: IPageCommon;
    actionMenuOptionsItem?: IOptionsPsActionMenuItem;
    siblings?: Array<IPageCommon>;
    isMaker?: boolean;
    isChecker?: boolean;
    isSelected?: boolean;
}



export interface IOmniFindCIF extends ICommonInterfaceRequest {
    cifNumber?: string;
    cifLongName?: string;
    idNumber?: string;

}
export interface IOmniReturnPurpose extends ICommonInterfaceRequest {
    type?: string;
}

export interface IOptionsPsRecordAttachmentComponentExposed extends IOptionsPsBaseFieldExposed {
    progRef?: string;
    transactionNumber?: string;
    applicationName?: string;
    smartId?: string;
}
export interface INotification {
    udid?: string;
    isRTLDir?: number;
    nbRec?: number;
    recToskip?: number;
    status?: string;
    ocUserId?: number;
    deviceToken?: string;
    notifDeviceToekenId?: number;
    tokenCreateDate?: number;
    pushNotificationDetailList?: INotificationDetail[];
}
export interface INotificationDetail {
    isRTLDir?: number;
    nbRec?: number;
    recToskip?: number;
    status?: string;
    title?: string;
    body?: string;
    notifData?: string;
    landingPage?: string;
    pushNotificationId?: number;
    notificationDate?: number;
    notif_data?: string;
    wasTapped?: boolean;
    landing_page?: string;
}

export interface IAccountResponse extends IOmniCommonCO {
    cif?: string;
    additionalRef?: string;
    accGl?: string;
    gmiFlag?: string;
    ibanAccNo?: string;
    branch?: string;
    blockedAmount?: string;
    availableBalance?: string;
    briefNameEnglish?: string;
    savingAccount?: number;
    affectCard?: string;
    accOverDrawnYN?: string;
    balance?: string;
    bsContra?: string;
    longNameEnglish?: string;
    accSign?: string;
    accountTypeCategory?: string;
    currency?: string;
    cifShortNameEnglish?: string;
    accountSerial?: string;
    glType?: string;
    currencyFlagCtr?: string;
    briefNameArabic?: string;
    accountNumber?: string;
    currencyBriefNameEnglish?: string;
    longNameArabic?: string;
    additionalString2?: string;
    serialNo?: string;
    dateEntered?: string;
    statusDescription?: string;
    currencyDecimalPoints?: number;
    affection?: string;
    currentAccount?: string;
    generalLedgerBriefNameEng?: string;
    status?: string;
    formattedAccount?: string;
    imal?: string;
    key?: string;
    nickName?: string;
    briefName?: string;
    lookupKey?: string;
    branchDescription?: string;
}
export interface ITransactionResponse extends IOmniCommonCO {
    transferTypeOperId?: string;
    transferTypeDesc?: string;
    amount?: string;
    transactionTypeShortNameEnglish?: string;
    transactionDate?: string;
    createdBy?: string;
    cifShortName?: string;
    toTransactionAccountGl?: string;
    transactionAccountBranch?: string;
    status?: string;
    fromAccountCurrency?: string;
    currencyBriefNameEnglish?: string;
    fromAccountAdditionalRef?: string;
    transactionNo?: string;
    transactionAccountSl?: string;
    transactionAccountCif?: string;
    fromAccountAccGl?: string;
    soReference?: string;
    toAccountAdditionalRef?: string;
    valueDate?: string;
    transferType?: string;
    fromAccountCif?: string;
    toAccountCif?: string;
    //transferTypeOperId?: number;
    fromAccountSerialNo?: string;
}

export interface IOptionsPsButtonSubmitExposed {
    submitServiceUrl: string;
    extraParams?: any;
    stepper?: MatStepper;
    stepperId?: string;
    group: FormGroup;
    preCallFunction?: IFunctionDefinition;
    postCallFunction?: IFunctionDefinition;
    failureCallFunction?: IFunctionDefinition;
}

export interface ILanguage {
    language: string;
    code: string;
    direction?: 'rtl' | 'ltr';
}

export interface IOptionsAlertButton extends IOptionsPsActionButton {
    handler?: (value: any) => boolean | void | {
        [key: string]: any;
    };
}


export interface IOptionsPsButtonFabList extends IOptionsPsActionButton {
    mainProperties: IOptionsPsActionButton;
    topFabList?: Array<IOptionsPsActionButton>;
    bottomFabList?: Array<IOptionsPsActionButton>;
    startFabList?: Array<IOptionsPsActionButton>;
    endFabList?: Array<IOptionsPsActionButton>;
}

export interface IOptionsPsButtonDismiss extends IOptionsPsActionButton {
    modalId?: string;
}

export interface IOptionsCategorySubCategory extends IOptionsPsBaseGroupFormExposed {
    type?: string;
    category?: IOptionsPsSelectDropdown;
    subCategory?: IOptionsPsSelectDropdown;
    defaultLoad?: boolean;
    serviceUrl?: string;
    requestParams?: object;
    customMappring?: ICategorySubCategoryMaping;
    listOfOptions?: any[];
    requestObject?: any;
}

export interface IOptionsReturnStepControlsAsAbstractControl {
    listOfControls: Array<AbstractControl>;
    listOfInvalidControls: Array<AbstractControl>;
    listOfAllControlsDOMReferences: Array<Element>;
    listOfGroupControlsWithDOMReferences: Array<Element>;
    listOfInvalidControlsWithDOMReferences: Array<Element>;
    isValid: boolean;
    mapOfControls: { [key: string]: AbstractControl; };
    mapOfInvalidControls: { [key: string]: AbstractControl; };
    mapOfDOMReference: { [key: string]: HTMLElement; };
    numberOfInvalidControls: number;
}

export interface ICategorySubCategoryMaping {
    categoryId?: string;
    categoryDescription?: string;
    subCategoryId?: string;
    subCategoryDescription?: string;
    categoryTagName?: string;
    subCategoryTagName?: string;
}

export interface ICustUrlParams {
    pageHref?: string;
    chnlId?: any;
    appId?: any;
    operId?: any;
    pageName?: string;
    userName?: string;
    userPwd?: string;
    pageIconName?: string;
    pageParam?: any;
}

export interface IProfitRateRequest extends IOmniRequestBaseObject {
    currency?: any;
    amount?: string;
    accountType?: any;
}

export interface ICurrentCoordinates {
    longitude?: number;
    latitude?: number;
}
export interface IOptionsPsImageAvatar extends IOptionsPsActionImage {
    value?: string;
}

export interface IOptionsPsDynamicComponentLoaderExposed extends IOptionsPsBaseFieldExposed {
    component?: Type<any>;
    itemList?: any[];
    listOfOptions?: any[];
    showItemPopUp?: boolean;
    showOnlyList?: boolean;
    componentOptions?: any;
}

export interface ComponentOptions {
    options: any;
}

export interface PSNavigationOptions extends NavigationOptions {
    route?: string;
    psPage?: any;
}

export interface ICommonServiceCustomizationRequest extends IOmniRequestBaseObject {
    mappingId?: number;
}

export interface ICommonServiceCustomizationResponse extends IOmniResponseBaseObject {

}

export interface IOptionsPsFieldEntity extends IOptionsPsBaseField {
    childComponent?: any;
}

export interface IOptionsPsFieldEntityExposed extends IOptionsPsBaseFieldExposed {
    childComponent?: any;
}
export interface ICustPatternVal {
    expression: string | RegExp;
    errorMsg?: string;
}


export interface IOptionsPsEntityDropdownLanguagesExposed extends IOptionsPsFieldEntityExposed {
    asyncURL?: string;
}
