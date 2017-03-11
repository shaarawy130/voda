import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {AngularFireModule, AngularFire, AuthMethods, AuthProviders} from 'angularfire2';
import { FormsModule } from '@angular/forms';
import { CustomIconsModule } from 'ionic2-custom-icons';
import * as admin from "firebase-admin";
import * as serviceAccount from '../servAcc/serviceAccountKey.json'



//Providers
import {AuthData} from '../providers/auth-data';
import { LogoutProvider } from '../providers/logout';
import { ImageProvider } from '../providers/image';
import { DataProvider } from '../providers/data';
import { LoadingProvider } from '../providers/loading';
import { AlertProvider } from '../providers/alert';

//Pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {CreateaccPage} from '../pages/createacc/createacc';
import {ProfilesPage} from '../pages/profiles/profiles';
import {WelcomePage} from '../pages/welcome/welcome';
import {GroupchatPage} from '../pages/groupchat/groupchat';
import {ImageModalPage} from '../pages/image-modal/image-modal';



export const firebaseConfig ={

   apiKey: "AIzaSyDvpUAZE1EdrJQw4I081TRwCBC0Xi_lICI",
    authDomain: "test-c6478.firebaseapp.com",
    databaseURL: "https://test-c6478.firebaseio.com",
    storageBucket: "test-c6478.appspot.com",
    messagingSenderId: "864144432964"
}
//var secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");

const myFirebaseAuthConfig = {
  provider : AuthProviders.Password,
  method : AuthMethods.Password
}


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CreateaccPage,
    ProfilesPage,
    WelcomePage,
    GroupchatPage,
    ImageModalPage
  ],
  imports: [
    IonicModule.forRoot(MyApp), AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig), FormsModule, CustomIconsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CreateaccPage,
    ProfilesPage,
    WelcomePage,
    GroupchatPage,
    ImageModalPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthData, DataProvider,LoadingProvider, LogoutProvider, AlertProvider, ImageProvider]
})
export class AppModule {}
