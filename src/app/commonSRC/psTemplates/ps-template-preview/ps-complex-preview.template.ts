import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';

import { ConstantCommon } from '../../psServices/models/common-constant';
import { IOptionsPsComplexPreview, IPsTemplatePreviewComponent } from '../../psServices/models/ps-common-interface';
import { PsCommonService } from '../../psServices/ps-common/ps-common.service';
import { IOptionsPsContainerPanel } from './../../psServices/models/ps-common-interface';


@Component({
  selector: 'ps-complex-preview',
  templateUrl: './ps-complex-preview.template.html',
  styleUrls: ['./ps-complex-preview.template.scss'],
})
export class PsComplexPreview {

  public allData;
  private group: FormGroup;
  previewMode: boolean;
  enableTranslation: boolean;
  // TP # 888440
  colStr: string;
  // TP # 888440
  /*  @Input('group') set _group(grp: Array<FormGroup>) {
     this.group = grp;
     for (const group of this.group) {
       this.common.previewMode(group);
     }
     setTimeout(() => {
       this.selectData();
     }, 0);
   } */

  previewPanelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: this.common.translate('summary_key'),
    iconName: 'keypad',
    expanded: true
  }
  get previewData() {
    return this.allData;
  }
  @Input('data') set _data(param) {
    if (param) {
      this.enableTranslation = true; // Added for Approval List Case where I need to translate the Keys in details screen 821619
      this.allData = param;
    }
  }

  @Input('options') set options(opt: IOptionsPsComplexPreview) {
    this.group = opt.group;
    this.common.previewMode(this.group);

    setTimeout(() => {
      this.selectData();
    }, 0);
  }
  constructor(private common: PsCommonService) {
  }


  selectData() {

    this.allData = new Array<IPsTemplatePreviewComponent>();
    const delimiter = ConstantCommon.PREVIEW_COMPONENT_DELIMITER_HEX;
    const elements: NodeListOf<Element> = document.querySelectorAll('[psPreviewEngine]');
    if (elements && elements.length > 0) {
      for (let i = 0; i < elements.length; i++) {
        const component: Element = elements[i];

        const children: Array<Element> = Array.prototype.slice.call(component.children);
        const psPreviewLabel = children.find(o => o.hasAttribute('psPreviewLabel'));
        const psPreviewHTML = children.find(o => o.hasAttribute('psPreviewHTML'));
        if ((psPreviewLabel && psPreviewLabel.textContent
          && !CommonUtils.isEmptyString(psPreviewLabel.textContent.replace(/ /g, ''))) || psPreviewHTML) {
          this.allData.push({ key: psPreviewLabel ? psPreviewLabel.textContent : '', value: psPreviewHTML ? psPreviewHTML.outerHTML : '' });
        } else {
          const text = component.textContent;
          if (text.indexOf(delimiter) == -1) {
            continue;
          }
          let splited, key, value;

          splited = text.trim().split(delimiter);
          key = splited[0];
          value = splited[1];

          if (value == undefined && /\d/.test(splited[0])) {
            value = splited[0].replace(/[^0-9]/g, '');
          }
          if (!key || !value) {
            continue;
          }
          this.allData.push({ key: key.trim(), value: value.trim() });
        }
      }
      // TP # 888440
      if (this.allData.length == 1) {
        this.colStr = 'col-12';
      } else {
        this.colStr = 'col-6';
      }
      // TP # 888440
    }
  }

  ngOnDestroy() {
    this.common.editMode(this.group);
  }
}
