import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormsModule }   from '@angular/forms';

//providers
import{AuthData} from '../../providers/auth-data';

//pages
import {TabsPage} from '../../pages/tabs/tabs';
import {CreateaccPage} from '../../pages/createacc/createacc';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
submitAttempt:boolean = false;
user = {
  email: "",
  password:""
};
loading:any;


  constructor(public navCtrl: NavController, public navParams: NavParams , public authData:AuthData , 
  public alertCtrl: AlertController , public loadingCtrl:LoadingController) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

loginUser(){
  this.submitAttempt =true;
 this.loading = this.loadingCtrl.create({
        content: "Please wait...",
    });
    this.loading.present();

  this.authData.loginUser(this.user.email,this.user.password).then (authData =>{
    this.navCtrl.setRoot(TabsPage);
      this.loading.dismiss().catch(() => {})
    },error => {
     // this.loading.dismiss().catch((error) => {console.log(error); });

      this.loading.dismiss().then (()=> {
       let alert = this.alertCtrl.create({
          message : error.message,
          buttons:[{
            text: "Ok",
            role: 'cancel'
            }

          ]
        });
        alert.present();
     });
    
    });
    
  }

  createAccount(){

    this.navCtrl.push(CreateaccPage);

  }
}




