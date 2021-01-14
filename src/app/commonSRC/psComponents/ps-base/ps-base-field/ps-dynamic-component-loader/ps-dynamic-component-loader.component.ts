import { AfterViewInit, Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { PsBaseFieldComponent } from '../ps-base-field.component';
import { IOptionsPsDynamicComponentLoaderExposed, ComponentOptions } from './../../../../psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../psServices/ps-common/ps-common.service';
import { LoggerService } from './../../../../psServices/logger/logger.service';

/**
 * @author Aftab.Ali
 * @since 31/12/2019
 *
 * <p> PsDynamicComponentLoaderComponent </p>
 */
@Component({
  selector: 'ps-dynamic-component-loader',
  templateUrl: './ps-dynamic-component-loader.component.html',
  styleUrls: ['./ps-dynamic-component-loader.component.scss'],
})
export class PsDynamicComponentLoaderComponent extends PsBaseFieldComponent implements OnInit, AfterViewInit {

  @Input() options: IOptionsPsDynamicComponentLoaderExposed = {};
  @ViewChild('dynamicComponent', { static: true, read: ViewContainerRef }) dynamicComponentRef;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onClickCard = new EventEmitter<any>();

  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
    private componentFactoryResolver?: ComponentFactoryResolver
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    if (this.options && this.options.component) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(this.options.component);
      const ref = this.dynamicComponentRef.createComponent(factory);
      if (this.options.componentOptions !== undefined) {
        (ref.instance as ComponentOptions).options = this.options.componentOptions;
      } else {
        (ref.instance as ComponentOptions).options = this.options;
      }
      ref.instance.onClickCard = this.onClickCard;
      ref.changeDetectorRef.detectChanges();
    }
  }

}
