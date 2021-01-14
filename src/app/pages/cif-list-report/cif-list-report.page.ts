import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
  ICifReportListReponse,
  IOptionsPsOptionsCifReportExposed
} from "src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-cif-list/ps-cif-list.component.interface";
import { OmniPullService } from "src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service";
import { PsDateFormatPipe } from "src/app/commonSRC/psPipes/ps-date-format/ps-date-format.pipe";
import { ConstantCommon } from "src/app/commonSRC/psServices/models/common-constant";
import {
  IOptionsPsLabel,
  IOptionsPsTemplateView
} from "src/app/commonSRC/psServices/models/ps-common-interface";
import { PsNavigatorService } from "src/app/commonSRC/psServices/navigator/ps-navigator.service";
import { PsCommonService } from "src/app/commonSRC/psServices/ps-common/ps-common.service";
import { OmniBasePage } from "../omni-base/omni-base.page";

@Component({
  selector: "cif-list-report",
  templateUrl: "./cif-list-report.page.html",
  styleUrls: ["./cif-list-report.page.scss"],
})
export class ReportCIFListPage extends OmniBasePage implements OnInit {
  private formGroup = new FormGroup({});
  public templateViewOptions: IOptionsPsTemplateView = {
    group: this.formGroup,
  };
  cifReportListOptions: IOptionsPsOptionsCifReportExposed;
  psDatePipe = new PsDateFormatPipe();
  requestWasSent = true;
  public noRecordFoundOptions: IOptionsPsLabel = {
    labelKey: "no_cif-openings_found_key",
    previewMode: false,
  };
  noCifListFound = false;

  constructor(
    public commonService: PsCommonService,
    private omniPull: OmniPullService,
    public navService?: PsNavigatorService,
  ) {
    super();
  }

  ionViewWillEnter() {
    super.init();
    super.viewWillEnter();
    this.cifReportListOptions = {
      isEditable: true,
    };
    this.loadCifOpeningList();
  }

  async loadCifOpeningList() {
    const populatedCifList: ICifReportListReponse[] = [];
    this.requestWasSent = true;
    const result = await this.omniPull.returnCIFList({}).catch((error) => {
      this.commonProv.logger.error(
        "Error: While fetching returnCIFList in cif-list-report page :",
        error
      );
    });
    this.requestWasSent = false;
    if (result && result.gridModel.length > 0) {
      for (const iterator of result.gridModel) {
        const cifList: ICifReportListReponse = {
          branchCode: iterator.branchCode ? iterator.branchCode : "",
          cifName: iterator.cifName ? iterator.cifName : "",
          cifTypeDesc: iterator.cifTypeDesc ? iterator.cifTypeDesc : "",
          dateCreation: iterator.dateCreation
            ? this.psDatePipe.transform(
              iterator.dateCreation,
              ConstantCommon.PREV_DATE_FORMAT
            )
            : "--/--/----",
          firstName: iterator.firstName ? iterator.firstName : "",
          lastName: iterator.lastName ? iterator.lastName : "",
          mobile: iterator.mobile ? iterator.mobile : "",
          status: iterator.status ? iterator.status : "",
          tel: iterator.tel ? iterator.tel : "",
          userCifNo: iterator.userCifNo ? iterator.userCifNo : "",
          statusCode: iterator.statusCode ? iterator.statusCode : null,
        };
        populatedCifList.push(cifList);
      }
    } else {
      this.noCifListFound = true;
      this.omniPull.omniCommon.presentInfoAlert(
        this.omniPull.omniCommon.common.translate("no_cif_found_key")
      );
    }
    this.cifReportListOptions.listOfOptions = populatedCifList;
  }
}
