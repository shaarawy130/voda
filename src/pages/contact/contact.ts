import { Component,OnInit, OnDestroy } from '@angular/core';

import { NavController, reorderArray  } from 'ionic-angular';
import {AuthData} from '../../providers/auth-data';
import { User } from '../../classes/user';
import { ProfilesPage } from '../profiles/profiles';
import { Observable } from 'rxjs/Observable';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import * as firebase from 'firebase';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

public totalUsers=[];
public users;
private subscription;
public list
public helper;
public selection="current";
public test;

  constructor(public navCtrl: NavController, public authData:AuthData) {

   
    

  }

  ionViewDidLoad() {

  // this.list=this.authData.getList()
   //this.af.database.list('/users/')
    this.subscription=this.authData.getList().subscribe(item=>{
      
      this.totalUsers=item;
      console.log(this.users);
      this.updateUserData();
    })
    //.subscribe(item=> {

        
      //console.log(item)
  //  this.users=item
    
  // this.unique(this.helper)
    //console.log(this.helper)
//})
  //for ( var i=0, len=this.helper.length; i < len; i++ ){
   // console.log(this.helper[i])
    //  if(!this.users[this.helper[i]]){
    ////    this.users.push(this.helper[i])
    //  }
  //}
  }
 //this.subscription= this.authData.getList().subscribe(res => {   (nice method to learnm also we had to unsubscribe but now users 
   //is firebase observable, it does all automatically but we have to put |async)
    //  this.users=res,
      //console.log(this.users)});
  

  //ngOnDestroy(){
   // this.subscription.unsubscribe();
  //}

  click(user){
    console.log(user);
    this.navCtrl.push(ProfilesPage, {user:user})
  }
   reorderItems(indexes) {
   this.users = reorderArray(this.users, indexes);
  }

 // unique(helper){
 // for ( var i=0, len=helper.length; i < len; i++ ){
 //    console.log(helper[i])
 //    console.log(this.users.indexOf(helper[i]))
 // if(this.users.indexOf(helper[i]) == -1){
 //   console.log(this.users)
 //   this.users.push(helper[i])
 // }

updateUserData(){

  this.users= this.totalUsers.filter(user=> user.situation==this.selection)
  console.log(this.users)
}
  
    
  }
    //console.log(this.helper[i])
     // if(!this.users[this.helper[i]]){
      //  this.users.push(this.helper[i])
     // }
  //}
  //helper.map(user=> {
  //  console.log("user",user)
  //  if (!this.users[user]){
  //    console.log(this.users)
  //      this.users.push(user)
  //      console.log(this.users)
  //  }
 // })
  //.forEach(user=> this.users.push(user))
  


