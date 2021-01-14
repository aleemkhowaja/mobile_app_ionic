import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
    selector: 'ps-autocomplete-search-modal',
    templateUrl:'ps-autocomplete-search-modal.page.html',
    styleUrls: ['ps-autocomplete-search-modal.page.scss']
})
export class PsAutoCompleteSearchModalPage implements OnInit {
    searchresults = [];
    constructor(public navParams: NavParams, private modalCtrl: ModalController) {}

    ngOnInit() {
        if (this.navParams && this.navParams.data) {
            Object.keys(this.navParams.data.list).forEach(key => {
                    this.searchresults.push(this.navParams.data.list[key]);
            });
        }
    }

    onElementChoosen(elementChosen) {
        this.modalCtrl.dismiss(elementChosen);
    }

}
