import { Component, OnInit } from '@angular/core';
import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'prayer-time',
  templateUrl: './prayer-time.page.html',
  styleUrls: ['./prayer-time.page.scss'],
})
export class PrayerTimePage extends OmniBasePage implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    super.init();
  }

}
