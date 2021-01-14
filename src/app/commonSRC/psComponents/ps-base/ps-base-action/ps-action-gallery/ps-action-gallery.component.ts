import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsActionGallery, IOptionsPsLabel } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsBaseActionComponent } from '../ps-base-action.component';
import { FormGroup } from '@angular/forms';
/*
  Author: Islam, Ghada
  Date: 21-10-2019
  TP WI: 913214
  */
@Component({
  selector: 'ps-action-gallery',
  templateUrl: './ps-action-gallery.component.html',
  styleUrls: ['./ps-action-gallery.component.scss'],
})
export class PsActionGalleryComponent extends PsBaseActionComponent implements OnInit {

  @Input() options: IOptionsPsActionGallery;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSelectItem: EventEmitter<any> = new EventEmitter<any>();
  mygroup: FormGroup = new FormGroup({});

  defaultOptions: IOptionsPsActionGallery = {
    layout: 'grid',
  };

  selectedImage: any;

  labelOptions: IOptionsPsLabel = {
		labelKey: '',
		previewMode: true,
		group: this.mygroup,
	};

  constructor(common: PsCommonService, logger: LoggerService,
    public modalController: ModalController, public omniPullProvider: OmniPullService) {
    super(common, logger);
  }

  ngOnInit() {
   this.labelOptions.labelKey = this.options.labelKey;
  }

  changeLayout(layout: 'grid' | 'slider') {
    this.options.layout = layout;
  }

  public onImageClick(event, imageIndex) {
    this.selectedImage = imageIndex;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.options.mediaList.length; i++) {
      // eslint-disable-next-line no-shadow
      const divEl: HTMLElement = document.getElementById('ps-gallery-image-' + this.options.mediaList[i].id);
      if (divEl) {
        divEl.classList.remove('selected-image');
        divEl.classList.add('un-selected-image');
      }
    }
    event.target.classList.remove('un-selected-image');
    event.target.classList.add('selected-image');

    this.onSelectItem.emit(imageIndex);
  }
}
