import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from './../../../../psServices/ps-common/ps-common.service';
import { PsBaseContainerComponent } from './../ps-base-container.component';
import { IOptionsPsContainerComplex } from './ps-container-complex.interface';

/**
 * @author Aftab.Ali
 * @since 24/10/2019
 *
 * <p> PsContainerComplexComponent is a simple container for complex components.</p>
 */
@Component({
  selector: 'ps-container-complex',
  templateUrl: './ps-container-complex.component.html',
  styleUrls: ['./ps-container-complex.component.scss'],
})
export class PsContainerComplexComponent extends PsBaseContainerComponent implements OnInit {

  @Input() options: IOptionsPsContainerComplex = {};

  constructor(
    commonService: PsCommonService,
    logger: LoggerService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
