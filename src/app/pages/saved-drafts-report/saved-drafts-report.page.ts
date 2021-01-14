import { Component, OnInit } from '@angular/core';

import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'saved-drafts-report',
  templateUrl: './saved-drafts-report.page.html',
  styleUrls: ['./saved-drafts-report.page.scss'],
})
export class SavedDraftsReportPage extends OmniBasePage implements OnInit {

  constructor() {
    super();
  }
}
