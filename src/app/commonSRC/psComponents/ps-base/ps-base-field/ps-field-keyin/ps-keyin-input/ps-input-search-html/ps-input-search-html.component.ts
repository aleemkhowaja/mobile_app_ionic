import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoggerService } from './../../../../../../psServices/logger/logger.service';
import { IOptionsPsInputSearchHTMLExposed, IOptionsPsKeyinInput } from './../../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../../../psServices/ps-common/ps-common.service';
import { PsKeyinInputComponent } from './../ps-keyin-input.component';


@Component({
  selector: 'ps-input-search-html',
  templateUrl: './ps-input-search-html.component.html',
  styleUrls: ['./ps-input-search-html.component.scss'],
})
export class PsInputSearchHtmlComponent extends PsKeyinInputComponent implements OnInit {

  @Input() public options: IOptionsPsInputSearchHTMLExposed;
  searchGroup = new FormGroup({});
  defaultConf: IOptionsPsKeyinInput = {
    iconOptions: {
      iconName: 'search'
    },
    placeHolder: 'search_data_here_key',
    type: 'text',
    group: this.searchGroup,
    fcName: 'searchHtml'
  };
  enteredText = '';
  counter = 0;
  initialDOM;

  constructor(commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    super.init();
    this.commonProv.copyObject(this.defaultConf, this.options, false, false);
  }

  onCharEntered() {
    const divId = /* '#' + */ this.options.contentReference;
    let inputText;
    if (this.counter === 0) {
      this.initialDOM = document.getElementById(this.options.contentReference).innerHTML;
      this.counter++;
    } else {
      document.getElementById(this.options.contentReference).innerHTML = this.initialDOM;
    }
    inputText = document.getElementById(this.options.contentReference);
    const word = this.defaultConf.group.controls[this.defaultConf.fcName].value;
    if (word === '') {
      return;
    }
    let i = 0;
    document.querySelectorAll('td span').forEach((element: HTMLElement, index) => {
      if (element.innerText.length !== 0 && element.innerText.includes(word)) {
        const htmlString = element.innerHTML;
        element.innerHTML = (htmlString.replace(word, `<span class="highlight" id='searchable-word-${index}'>` + word + '</span>'));
        if (i === 0) {
          i = 1;
          const elmnt = document.getElementById('searchable-word-' + index);
          elmnt.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

  }

}
