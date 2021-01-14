import { Component, Input, OnInit } from '@angular/core';

import { IOptionsPsContainerList, IOptionsPsLabelHeader } from './../../../../psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../psServices/ps-common/ps-common.service';
import { PsBaseContainerComponent } from './../ps-base-container.component';

@Component({
  selector: 'ps-container-list',
  templateUrl: './ps-container-list.component.html',
  styleUrls: ['./ps-container-list.component.scss'],
})
export class PsContainerListComponent extends PsBaseContainerComponent implements OnInit {

  @Input() options: IOptionsPsContainerList;
  headerLabelOptions: IOptionsPsLabelHeader = {};

  constructor(commonProv: PsCommonService) {
    super(commonProv, commonProv.logger);
  }

  ngOnInit() {
    this.headerLabelOptions.labelKey = this.options.labelKey;
  }

}
