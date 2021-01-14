import { Component, Input, OnInit } from '@angular/core';
import { IOptionsPsComplexReportFilterCriteriaComponent } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-report-filter-criteria/ps-complex-report-filter-criteria.component.interfaces';

import { IOptionsPsButtonCancel, IOptionsPsButtonExport, IOptionsPsButtonPrint, IOptionsPsContainerReportViewer, IOptionsPsInputSearchHTMLExposed, IOptionsPsTemplateReport } from './../../psServices/models/ps-common-interface';
import { PsTemplateBasePage } from './../ps-template-base/ps-template-base.page';

@Component({
  selector: 'ps-template-report',
  templateUrl: './ps-template-report.template.html',
  styleUrls: ['./ps-template-report.template.scss'],
})
export class PsTemplateReport extends PsTemplateBasePage implements OnInit {

  @Input() options: IOptionsPsTemplateReport;

  reportViewerOptions: IOptionsPsContainerReportViewer = {
    group: this.options.group,
  };
  reportFilterOptions: IOptionsPsComplexReportFilterCriteriaComponent = {};
  searchOptions: IOptionsPsInputSearchHTMLExposed = {
    contentReference: 'div-content'
  };

  cancelOptions: IOptionsPsButtonCancel = {
    group: this.options.group
  };
  printOptions: IOptionsPsButtonPrint = {
    group: this.options.group
  };
  exportOptions: IOptionsPsButtonExport = {
    group: this.options.group
  };

  displayDiv = true;
  filteredData = {};
  constructor() {
    super();
  }

  listOfFields: Array<any> = [this.reportViewerOptions, this.printOptions, this.exportOptions];


  ngOnInit() {
    this.init();
  }

  init() {
    this.listOfFields.forEach((field) => {
      field.operId = this.options ? this.options.operId : 1;
      field.reportParametersList = { ...this.options.reportParametersList, ...this.filteredData };
    });
    this.displayDiv = true;
    this.reportViewerOptions.showReport = this.options.showReport;
    if (this.options && this.options.parentOperId) {
      this.exportOptions.reportId = this.options.parentOperId;
    }
  }

  filterCriteria(filterData) {
    this.filteredData = filterData;
    this.refreshReport();
  }

  refreshReport() {
    this.displayDiv = false;
    this.options.showReport = true;
    setTimeout(() => {
      this.init();
    }, 500);
  }
}
