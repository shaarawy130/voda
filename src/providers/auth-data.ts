import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFire} from 'angularfire2'
import * as firebase from 'firebase';

/*
  Generated class for the AuthData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthData {

fireAuth:any;
  firebaseConfig ={

   apiKey: "AIzaSyDvpUAZE1EdrJQw4I081TRwCBC0Xi_lICI",
    authDomain: "test-c6478.firebaseapp.com",
    databaseURL: "https://test-c6478.firebaseio.com",
    storageBucket: "test-c6478.appspot.com",
    messagingSenderId: "864144432964"
}
secondaryApp;
  constructor(public af: AngularFire) {
    af.auth.subscribe( user => {
      if (user){
        this.fireAuth = user.auth;
        console.log(user);
      }
    })
  }


  loginUser( userEmail :string, userPassword :string) :any {

    return this.af.auth.login({email:userEmail, password:userPassword})
  }


logout(): any {
  this.af.auth.logout()
}

createUser(userEmail:string, userPassword:string, img, dateJoin,dateEnd,name){
return this.af.auth.createUser({email:userEmail, password:userPassword}).then((authState:any)  => {
  this.af.database.object('/voda/'+authState.uid).update({ 
      email : userEmail
    , password:userPassword,
  img:img,
JoinDate:dateJoin,
EndDate:dateEnd,
name:name,
phone:"",
type:"",
degree:"",
university:"",
Skills:""}).then( a=> this.af.auth.login({ email: 'mostafa.shaarawy@vodafone.com', password: '123456' }))

//this.secondaryApp = firebase.initializeApp(this.firebaseConfig, "Secondary");
//console.log(userEmail,userPassword);
//return this.secondaryApp.auth().createUserWithEmailAndPassword({email:userEmail , password:userPassword}).then((authState:any)  => {
  //this.af.database.object('/users/'+authState.uid).update({ email : userEmail, password:userPassword}).then(this.secondaryApp.auth().signOut())})
//}
})}


logoutSecond(){
  return this.secondaryApp.auth().signOut(); 
}


getData(uid){
  console.log(this.af.database.object('/voda/'+uid+'/'));
return this.af.database.object('/voda/'+uid+'/');

}

getList(){
  return this.af.database.list('/voda/');
}

}
