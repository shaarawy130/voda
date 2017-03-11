import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormsModule }   from '@angular/forms';
import { ToastController } from 'ionic-angular';

//providers
import{AuthData} from '../../providers/auth-data';

//pages
import {TabsPage} from '../../pages/tabs/tabs';

/*
  Generated class for the Createacc page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-createacc',
  templateUrl: 'createacc.html'
})
export class CreateaccPage {

  user ={
    email:"",
    password:"",
    img:"assets/img/user.png",
    DateJoin:"",
    DateEnd:"",
    name:"New Member"
   
  };
  loading :any;

   constructor(public navCtrl: NavController, public navParams: NavParams , public authData:AuthData , 
  public alertCtrl: AlertController , public loadingCtrl:LoadingController, public toastCtrl: ToastController) {


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateaccPage');
  }

CreateAcc(){

   this.loading = this.loadingCtrl.create({
        content: "Creating User...",
    });
    this.loading.present();

  this.authData.createUser(this.user.email,this.user.password,this.user.img,this.user.DateJoin,this.user.DateEnd,this.user.name).then (authData =>{
    
      this.loading.dismiss().catch(() => {})
       let toast = this.toastCtrl.create({
    message: 'User has been created',
    duration: 2000,
    position: 'middle'
  });


  toast.present();

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



}
