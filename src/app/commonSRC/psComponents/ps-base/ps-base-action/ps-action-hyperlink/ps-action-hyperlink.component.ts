import { Component, Input, OnInit } from '@angular/core';
import { IOptionsPsActionHyperlink, IPageCommon } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsBaseActionComponent } from '../ps-base-action.component';



@Component({
  selector: 'ps-action-hyperlink',
  templateUrl: './ps-action-hyperlink.component.html',
  styleUrls: ['./ps-action-hyperlink.component.scss'],
})

export class PsActionHyperlinkComponent extends PsBaseActionComponent implements OnInit {
  @Input() options: IOptionsPsActionHyperlink;
  constructor(public commonService: PsCommonService, public nav: PsNavigatorService) {
    super(commonService, commonService.logger);
  }

  // Commented by Richie for #BUG 1038273
  // ngOnInit() {
  //   super.ngOnInit();
  //   if (this.options.labelKey && this.screenDispElt && this.screenDispElt.KEY_LABEL_CODE) {
  //     this.options.iconOptions.labelOptions.labelKey = this.options.labelKey;
  //   }
  // }
  // End Richie

  onButtonClick(event) {
    this.handleClickEvent(event);
  }

  preCallChecking(event) {
    if (this.options.preCallFunction && this.options.preCallFunction.executionClass) {
      this.preCallFunctionCall().then(() => {
        this.openPage(event);
      }).catch((error) => {
        this.openPage(event);
      });
    } else {
      this.openPage(event);
    }

  }

  handleClickEvent(event) {
    this.preCallChecking(event);
  }

  openPage(event) {
    if (this.options) {
      const page: IPageCommon = {
        operID: this.options.pageOptions && this.options.pageOptions.operId ? this.options.pageOptions.operId : null,
        title: this.options.pageOptions && this.options.pageOptions.title ? this.options.pageOptions.title : this.options.labelKey,
        icon: this.options.pageOptions && this.options.pageOptions.iconName ? this.options.pageOptions.iconName : (this.options.iconOptions && this.options.iconOptions.iconName ? this.options.iconOptions.iconName : null),
        component: this.options.route ? this.options.route : null,
        param: this.options.navigationOptions ? this.options.navigationOptions.queryParams : null
      };
      if (page.component) {
        this.nav.openPage(page);
      } else
        if (this.options.anchorValue) {
          window.location.href = this.options.anchorValue;
        }
      this.onClick.emit(event);
    }
  }

}
