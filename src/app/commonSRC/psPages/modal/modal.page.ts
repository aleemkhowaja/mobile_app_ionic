import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  src: string;
  constructor(public navParams: NavParams) {}

  ngOnInit() {
    // console.log(this.navParams.get('src'));
  }

}
