import { Component, ViewChild } from '@angular/core';
import { Nav,Platform,AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import * as firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {AngularFire} from 'angularfire2'
import { HomePage } from '../pages/home/home';
import {AuthData} from '../providers/auth-data';
import{CreateaccPage} from '../pages/createacc/createacc';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
   @ViewChild(Nav) nav: Nav;
   private homepage:HomePage;
   public user;
  rootPage: any;
  isAdmin =true
  name;

  constructor(public platform: Platform, public af:AngularFire, public authData: AuthData, public alertCtrl: AlertController) {
    
      af.auth.subscribe(user => {
      if (user) {
        this.rootPage = TabsPage;
            this.af.database.object('/voda/' + firebase.auth().currentUser.uid).subscribe(account => {
      this.user = account;
      if (this.user.Admin){
        this.isAdmin=true;
      }   
      if(this.user.name ==""){
         let prompt = this.alertCtrl.create({
      title: 'Welcome! ',
      message: "Please enter your name",
      inputs: [
        {
          name: 'title',
          placeholder: "your name",
          value: this.name
        },
      ],
      buttons: [

        {
          text: 'Save',
          handler: data => {
            this.user.name= data.title;
            console.log(data);
            console.log(this.user);
             firebase.database().ref('voda/' + firebase.auth().currentUser.uid).update({
              name: this.user.name
            

            }).then((success) => {
              //Show profile updated!
             // this.img=url;
              //this.alertProvider.showProfileChangeMessage();
              console.log("saved")
            }).catch((error) => {
              //Show error
          //    this.alertProvider.showErrorMessage('auth/error-change-photo');
          console.log(error);
          //  });
          })
      }
     // this.loadingProvider.hide();
    }]
      }).present()
    }
  }
            )}
  
      else{
        this.rootPage = LoginPage;
      }
    });
    
    this.initializeApp();
  }

ngAfterViewInit() {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
      //this.user = this.homepage.user;
  }
  initializeApp(){
this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    StatusBar.styleDefault();
     this.hideSplashScreen();
})}

hideSplashScreen() {
    if (Splashscreen) {
        setTimeout(() => {
            Splashscreen.hide();
        }, 100);
    }
}

openProfile(){
this.nav.push(HomePage);
}


  logout(){

  this.authData.logout();
    this.nav.setRoot(LoginPage);
  
  }

  createUser(){
    this.nav.push(CreateaccPage);
  }
  
}
