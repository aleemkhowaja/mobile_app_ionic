import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { FileService } from 'src/app/commonSRC/psServices/Files/file.Service';
import { IOptionsPsButtonFabList } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsActionButtonComponent } from '../ps-action-button.component';


@Component({
  selector: 'ps-button-fab-list',
  templateUrl: './ps-button-fab-list.component.html',
  styleUrls: ['./ps-button-fab-list.component.scss'],
})
export class PsButtonFabListComponent extends PsActionButtonComponent implements OnInit {

  @Input() options: IOptionsPsButtonFabList;
  @Output() public isOpened: EventEmitter<any> = new EventEmitter<any>();
  @Output() public isClosed: EventEmitter<any> = new EventEmitter<any>();
  isFabExpanded = false;
  @ViewChild('fabListSelector', { read: ElementRef, static: false }) fabListSelector: ElementRef;
  clickSubscription: Subscription;
  constructor(private commonService: PsCommonService, private fileService: FileService, private eRef?: ElementRef) {
    super(commonService, commonService.logger);
  }

  ngOnInit() {
    super.init();
    this.clickSubscription = fromEvent(document, 'click').subscribe((element) => {
      if (!this.eRef.nativeElement.contains(element.target)) {
        // try {
        //   element.stopPropagation();
        //   element.preventDefault();
        // } catch (err) {
        //   this.logger.error(err);
        // }
        this.isClosedClicked();
      }
    });
  }

  isOpenedClicked() {
    if (this.isFabExpanded) {
      this.isClosedClicked();
    } else {
      this.isFabExpanded = true;
      this.isOpened.emit();
    }
  }
  isClosedClicked() {
    this.isFabExpanded = false;
    const fabs = this.fabListSelector.nativeElement.querySelectorAll('ion-fab');
    for (const fab of fabs) {
      fab.activated = false;
    }
    this.isClosed.emit();
  }

  onFabClicked(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  ngOnDestroy() {
    this.clickSubscription.unsubscribe();
  }
}
