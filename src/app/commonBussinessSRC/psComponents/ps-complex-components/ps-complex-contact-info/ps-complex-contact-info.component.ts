import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IOptionsPscomplexContactInfoExposed } from './ps-complex-contact-info.component.interface';

@Component({
    selector: 'ps-complex-contact-info',
    templateUrl: 'ps-complex-contact-info.component.html',
    styleUrls: ['./ps-complex-contact-info.component.scss']
})
export class PscomplexContactInfoComponent extends PsBaseFieldComponent implements OnInit {
    @Input() options: IOptionsPscomplexContactInfoExposed;

    ngOnInit() {
    }

}