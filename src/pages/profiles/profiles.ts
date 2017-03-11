import { Component } from '@angular/core';
import { NavController, NavParams, ModalController} from 'ionic-angular';
import { ImageModalPage } from '../image-modal/image-modal';

/*
  Generated class for the Profiles page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profiles',
  templateUrl: 'profiles.html'
})
export class ProfilesPage {
user;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
this.user = this.navParams.get('user');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilesPage');
  }


    enlargeImage(img) {
    let imageModal = this.modalCtrl.create(ImageModalPage, { img: img });
    imageModal.present();
  }

}
