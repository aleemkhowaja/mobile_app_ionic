import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { IOptionsContainerSliderExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsBaseContainerComponent } from '../ps-base-container.component';
import { Subscription } from 'rxjs';



/*
Author: G.Radwan
Date: 24Nov2019
WI: #
ps-container-slider
*/

@Component({
  selector: 'ps-container-slider',
  templateUrl: './ps-container-slider.component.html',
  styleUrls: ['./ps-container-slider.component.scss'],
})
export class PsContainerSliderComponent extends PsBaseContainerComponent implements OnInit, OnDestroy {
  @Input() options: IOptionsContainerSliderExposed;
  slides: IonSlides;
  defaultOptions: any = { // please refer to https://swiperjs.com/api/#
    autoplay: {
      delay: 5000
    },
    speed: 6000, // initialization value to be overridden by service 'getParamValOf'
    initialSlide: 1,
    loop: true,
  };

  direction;
  reload = false;
  public canLoadSlider = false;
  swiperInstance;
  subscription: Subscription;
  constructor(private commonp: PsCommonService, private loggerp: LoggerService, private omniPull: OmniPullService, @Inject(DOCUMENT) private document: Document) {
    super(commonp, loggerp);
  }

  get currentDirection() {
    return this.document.documentElement.dir || 'ltr';
  }
  get getIfReversed() {
    if (!this.direction) {
      this.direction = this.document.documentElement.dir;
    } else {
      if (this.direction != this.document.documentElement.dir) {
        this.reloadSlider();
      } else {
        this.reload = false;
      }
    }
    return this.document.documentElement.dir && this.document.documentElement.dir.toLocaleLowerCase() === 'rtl' ? true : false;
  }
  ngOnInit() {
    this.omniPull.getParamValOf('SliderSpeed').then((result) => {
      this.commonProv.copyObject(this.defaultOptions, this.options, false, false);
      if (result && result.SliderSpeed) {
        this.defaultOptions.autoplay.delay = result.SliderSpeed * 1000;
        this.defaultOptions.speed = result.SliderSpeed * 1000;
      }
      this.canLoadSlider = true;
    }).catch((err) => {
      this.canLoadSlider = true;
    });

    this.subscription = this.commonProv.checkView().subscribe((result) => {
      if (this.slides) {
        if (result && result.didEnter) {
          this.canLoadSlider = false;
          setTimeout(() => {
            this.canLoadSlider = true;
          }, 500);
        }
        if (result && result.willLeave) {
          this.slides.stopAutoplay();
        }
      }
    });
  }

  onImageClick(event, mediaIndex) {
  }

  slidesDidLoad(slides: IonSlides) {
    this.slides = slides;
    slides.startAutoplay();
    this.slides.getSwiper().then((swiper) => {
      this.swiperInstance = swiper;
    });
  }

  reloadSlider() {
    this.reload = true;
    setTimeout(() => {
      this.direction = this.document.documentElement.dir;
      this.reload = false;
    }, 300);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
