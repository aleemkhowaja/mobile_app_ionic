import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { CommonBussinessConstant } from "src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant";
import {
  IMapKeyValue,
  IOptionsPsContainerLookupOptionComponentExposed,
} from "src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces";
import { OmniPullService } from "src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service";
import { PsBaseFieldComponent } from "src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component";
import { IOptionsPsActionHyperlink } from "src/app/commonSRC/psServices/models/ps-common-interface";
import { PsCommonService } from "src/app/commonSRC/psServices/ps-common/ps-common.service";
import { PsCommonBusinessSettings } from "../../../psServices/models/ps-commonBusiness.settings";
import { IOptionsPsOptionsCifReportExposed } from "./ps-cif-list.component.interface";

@Component({
  selector: "ps-cif-list",
  templateUrl: "./ps-cif-list.component.html",
  styleUrls: ["./ps-cif-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PsOptionCifReportListComponent extends PsBaseFieldComponent
  implements OnInit {
  @Output() reloadFct = new EventEmitter<string>();
  @Input() options: IOptionsPsOptionsCifReportExposed;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onClickCard = new EventEmitter<any>();
  cifReportLabelValuesMap = new Map<string, IMapKeyValue>();
  cifReportHeaderMap = new Map<string, IMapKeyValue>();

  constructor(
    commonProv: PsCommonService,
    private cdRef?: ChangeDetectorRef,
    private omniPull?: OmniPullService
  ) {
    super(commonProv, commonProv.logger);
  }

  ngOnInit() {
    super.ngOnInit();
    this.populateCifListMap();
    if (
      this.options.showOnlyList === null ||
      this.options.showOnlyList === undefined
    ) {
      this.options.showOnlyList = false;
    }

    if (this.options && this.options.listOfOptions) {
      this.options.itemList = this.options.listOfOptions;
    }
  }

  getContainerLookUpOptions(val) {
    return this.prepareLookUp(val);
  }

  prepareLookUp(val: any) {
    const lookupDetails: IOptionsPsContainerLookupOptionComponentExposed = {};
    lookupDetails.labelKey = this.options.labelKey;
    lookupDetails.fcName = this.options.fcName;
    lookupDetails.currencyFlag = "";
    lookupDetails.labelsValueMap = this.cifReportLabelValuesMap;
    lookupDetails.headerMap = this.cifReportHeaderMap;
    lookupDetails.formGroup = this.options.group;
    lookupDetails.isEditable = this.options.isEditable;
    lookupDetails.translateSubTitle = false;
    lookupDetails.actionDetailsOptions = [];
    lookupDetails.itemList = this.options.itemList;
    if (
      val.statusCode === null ||
      val.statusCode === "DR" ||
      val.statusCode === "I"
    ) {
      lookupDetails.actionDetailsOptions.push(
        {
          buttonIcon: "delete",
          actionUrl: PsCommonBusinessSettings.serviceUrl.deleteSubmitData,
          cssClass: "fab-edit-button",
          label: "delete_key",
          iconName: "trash",
          actionType: "Submit",
          alertMessage: "alert_delete_cif_request_key",
          alertType: "prompt",
          operId: CommonBussinessConstant.CIF_OPENING_DELETE_OPER_ID,
          detailServiceUrl: "rest/omniCorePull/returnCifInformation",
          detailServiceCallOnAction: true,
          postCallFunction: {
            func() {
              return new Promise<any>((resolve, reject) => {
                resolve(this.executionClass.reloadList());
              });
            },
            executionClass: this,
            params: [],
          },
        },
        {
          label: "edit_key",
          actionHyperlink: {
            iconOptions: {
              iconName: "paper",
            },
            route: "cif-opening",
            pageOptions: {
              operId: CommonBussinessConstant.CIF_OPENING_EDIT_OPER_ID, // END_USERS_EDIT
              iconName: "paper",
              title: "edit_key",
            },
            preCallFunction: {
              func() {
                return new Promise<any>((resolve, reject) => {
                  resolve(
                    this.executionClass.prepareCIFDetails(
                      lookupDetails.actionDetailsOptions[1].actionHyperlink
                    )
                  );
                });
              },
              executionClass: this,
              params: [],
            },
          },
        }
      );
    }
    lookupDetails.statementOptions = {};
    return lookupDetails;
  }

  reloadList() {
    this.reloadFct.emit();
  }
  private populateCifListMap() {
    let branchCodeMap: IMapKeyValue = {};
    let cifNameMap: IMapKeyValue = {};
    let cifTypeDescMap: IMapKeyValue = {};
    let dateCreationMap: IMapKeyValue = {};
    let firstNameMap: IMapKeyValue = {};
    let lastNameMap: IMapKeyValue = {};
    let mobileMap: IMapKeyValue = {};
    let statusMap: IMapKeyValue = {};
    let telMap: IMapKeyValue = {};
    let userCifNoMap: IMapKeyValue = {};

    branchCodeMap = {
      key: "branchCode",
      value: "",
    };
    cifNameMap = {
      key: "title",
      value: "cifName",
      isEdit: false,
      formGroupMap: {
        labelKey: "",
        placeHolder: "",
        fcName: "title",
      },
    };

    cifTypeDescMap = {
      key: "cifTypeDesc",
      value: "",
    };
    dateCreationMap = {
      key: "dateCreation",
      value: "",
    };
    firstNameMap = {
      key: "firstName",
      value: "",
    };
    lastNameMap = {
      key: "lastName",
      value: "",
    };
    mobileMap = {
      key: "mobile",
      value: "",
    };
    userCifNoMap = {
      key: "subTitle",
      value: "userCifNo",
      isEdit: false,
      formGroupMap: {
        labelKey: "",
        placeHolder: "",
        fcName: "subTitle",
      },
    };
    statusMap = {
      key: "status",
      value: "",
    };

    telMap = {
      key: "tel",
      value: "",
    };
    this.cifReportLabelValuesMap.set("branch_key", branchCodeMap);
    this.cifReportLabelValuesMap.set("status_key", statusMap);
    this.cifReportLabelValuesMap.set("cif_key", cifTypeDescMap);
    this.cifReportLabelValuesMap.set("creation_date_key", dateCreationMap);
    this.cifReportLabelValuesMap.set("first_name_key", firstNameMap);
    this.cifReportLabelValuesMap.set("last_name_key", lastNameMap);
    this.cifReportLabelValuesMap.set("mobile_key", mobileMap);
    this.cifReportLabelValuesMap.set("telephone_key", telMap);
    this.cifReportHeaderMap.set("title", cifNameMap);
    this.cifReportHeaderMap.set("subTitle", userCifNoMap);
  }

  public updateCard(item: any) {
    this.onClickCard.emit(this.options);
  }
  prepareCIFDetails(actionCard: IOptionsPsActionHyperlink): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const generalRequestData: any = {
        commonParametersList: {
          userCifNo: actionCard.navigationOptions.queryParams.userCifNo,
        },
      };
      this.omniPull.returnCIFDetails(generalRequestData).then((result) => {
        this.commonProv.copyObject(
          actionCard.navigationOptions.queryParams,
          result.data,
          false
        );
        const data = result.data;
        actionCard.navigationOptions.queryParams = {
          ScreenVO: { data, ...actionCard.navigationOptions.queryParams },
          ...actionCard.navigationOptions.queryParams,
        };
        delete actionCard.navigationOptions.queryParams.ScreenVO.operId;
        resolve();
      });
    });
  }
}
