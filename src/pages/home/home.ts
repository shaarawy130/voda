import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomIconsModule } from 'ionic2-custom-icons';
import { NavController, AlertController,ItemSliding, MenuController, LoadingController} from 'ionic-angular';
import {AuthData} from '../../providers/auth-data';
import {LoadingProvider} from '../../providers/loading';
import {LoginPage} from '../../pages/login/login';
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Camera, CameraOptions } from 'ionic-native';
import { User } from '../../classes/user';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
private group= {
  messages:[],
        dateCreated:"",
        name :"",
        description:""

}

  private loading;
private profileOptions: CameraOptions = {
    targetWidth: 512,
    targetHeight: 512,
    destinationType: Camera.DestinationType.DATA_URL,
    encodingType: Camera.EncodingType.PNG,
    correctOrientation: true
  };



uid;
public user = {
  Skills:"",
  university:"",
  name:"",
  email:"",
  phone:"",
  img:"",
  type:"",
  degree:"",
  JoinDate:"",
  EndDate:""

}
item;
university;
public field = "hello";
  constructor(public navCtrl: NavController, private menu:MenuController,public loadingCtrl:LoadingController, public loadingProvider:LoadingProvider, public authData: AuthData,public alertCtrl: AlertController, public af: AngularFire) {
 this.uid=firebase.auth().currentUser.uid;
 //this.user =this.authData.getData(this.uid);
//this.item=af.database.object('/users/'+this.uid)
//this.item.subscribe(x=> {this.university=x; console.log(x)})

//  console.log(this.user)
  //this.university = this.user.university
//  console.log(this.university)

// console.log(this.items.subscribe);

  }

  logout(){

  this.authData.logout();
    this.navCtrl.setRoot(LoginPage);
  
  }
  ionViewDidLoad() {
   // this.loadingProvider.show();
    // Observe the userData on database to be used by our markup html.
    // Whenever the userData on the database is updated, it will automatically reflect on our user variable.
    console.log(firebase.auth().currentUser);
    this.af.database.object('/voda/'+ firebase.auth().currentUser.uid).subscribe(account => {
      console.log(account)
      this.user = account;
      
     // this.loadingProvider.hide();
    });
  
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(true, 'menu1');
  }

  

change(field 
//,slidingItem:ItemSliding
) {
  var x;
  if( field == "university"){
    x = this.user.university
  }
  else if(field == "skills"){
    x = this.user.Skills
  }
  else if(field == "name"){
    x = this.user.name
  }
  else if(field == "email"){
    x = this.user.email
  }
  else if(field == "phone"){
      x = this.user.phone
  }


    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: "Enter your "+ field ,
      inputs: [
        {
          name: 'title',
          placeholder: field,
          value: x
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
           // slidingItem.close();
          }
        },
        {
          text: 'Save',
          handler: data => {
            if( field == "university"){
     this.user.university = data.title;
  }
  else if(field == "skills"){
    this.user.Skills = data.title;
  }
  else if(field == "name"){
     this.user.name = data.title;
  }
  else if(field == "email"){
    this.user.email = data.title;
  }
  else if(field == "phone"){
      this.user.phone = data.title;
  }
 
  
            
            console.log(data);
            console.log(this.user);
                   this.loading = this.loadingCtrl.create({
              content: "Saving...",
          });
          this.loading.present();
             firebase.database().ref('/voda/' + this.uid).update({
              Skills: this.user.Skills,
              name:this.user.name,
              email:this.user.email,
              university:this.user.university,
             
              phone:this.user.phone

            }).then((success) => {
              this.loading.dismiss().catch(() => {})
              //Show profile updated!
             // this.img=url;
              //this.alertProvider.showProfileChangeMessage();
              console.log("profile change message")
            }).catch((error) => {
              this.loading.dismiss().catch(() => {})
              //Show error
          //    this.alertProvider.showErrorMessage('auth/error-change-photo');
          console.log(error);
          //  });
          })
            //slidingItem.close();
          }
        }
      ]
    }).present()
    
  }
  
click(){
  
  this.alertCtrl.create({
      title: 'Set Profile Photo',
      message: 'Do you want to choose a photo from your photo gallery?',
      buttons: [
      
        {
          text: 'Choose from Gallery',
          handler: () => {
            //Open gallery and process selected photo
            this.profileOptions.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
            Camera.getPicture(this.profileOptions).then((imageData) => {
             // this.user.img1= imageData
       
              this.processImage(imageData);
            }, (error) => {
              //Show error
             // this.alertProvider.showErrorMessage('picture/picture-failed');
             console.log(error)
            });
          }
    },{
       text: 'Take a Photo',
          handler: () => {
            //Open gallery and process selected photo
            this.profileOptions.sourceType = Camera.PictureSourceType.CAMERA;
            Camera.getPicture(this.profileOptions).then((imageData) => {
             // this.user.img1= imageData
       
              this.processImage(imageData);
            }, (error) => {
              //Show error
             // this.alertProvider.showErrorMessage('picture/picture-failed');
             console.log(error)
            });
          }
    },  {
          text: 'Cancel',
          handler: () => { }
        }
    ]
  }).present()
}

processImage(imageData) {
  this.uid = firebase.auth().currentUser.uid;
    let imgURI = "data:image/png;base64," + imageData;
    let imgBlob = this.imgURItoBlob(imgURI);
    let metadata = {
      'contentType': imgBlob.type
    };
     this.loading = this.loadingCtrl.create({
              content: "Saving your image...",
          });
          this.loading.present();
    //this.loadingProvider.show();
    //Upload file to Firebase Storage
    firebase.storage().ref().child('voda/' + firebase.auth().currentUser.uid + '/1/') .put(imgBlob,metadata)
      .then((snapshot) => {
        //Delete previous profile photo
       // if (this.user.getImg() != 'assets/img/profile.png') {
         // var fileName = this.user.getImg().substring(this.user.getImg().lastIndexOf('%2F') + 3, this.user.getImg().lastIndexOf('?'));
          //firebase.storage().ref().child('images/' + this.user.getUserId() + '/' + fileName).delete().then(() => { }).catch((error) => { });
      //  }
        var url = snapshot.metadata.downloadURLs[0];
        let profile = {
          displayName: "hamada",
          photoURL: url
        };
        this.user.img= url;
             firebase.database().ref('voda/'+firebase.auth().currentUser.uid+'/').update({
                 
                  img: snapshot.metadata.downloadURLs[0]
                 
                  
                
                }).then((success) => {
                  this.loading.dismiss().catch(() => {})
               console.log("tamam")
                });
    
    
    

    
        //Update Firebase profile
      //  firebase.auth().currentUser.updateProfile(profile)
        //  .then((success) => {
            //Update user data on database
         //   firebase.database().ref('accounts/' + this.uid).update({
           //   img1: this.user.img1,
             // img2: this.user.img2,
              //img3: this.user.img3,
              //img4: this.user.img4,

    //        }).then((success) => {
              //Show profile updated!
         //     this.loadingProvider.hide();
             // this.img=url;
              //this.alertProvider.showProfileChangeMessage();
        //      console.log("profile change message")
          //  }).catch((error) => {
              //Show error
          //    this.alertProvider.showErrorMessage('auth/error-change-photo');
          //console.log(error);
          //  });
         // })
       //     .catch((error) => {
              //Show error
         //     this.loadingProvider.hide();
           //   let code = error["code"];
          //   this.alertProvider.showErrorMessage(code);
           // });
      }).catch((error) => {
        this.loading.dismiss().catch(() => {})
        //Show error
      //  this.alertProvider.showErrorMessage('upload/upload-failed');
      console.log(error)
      });
  }
  imgURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: mimeString
    });
  }
  doing(){
      var internship;
      var thesis;
    if(this.user.type ==""){
      internship = true;
      thesis = false;
    }
    else if(this.user.type=="Internship"){
      internship = true;
      thesis = false;
    }
    else{
      internship = false;
      thesis = true;
    }
    let alert = this.alertCtrl.create();
    alert.setTitle('What are you doint at the InnoGarage?');

    alert.addInput({
      type: 'radio',
      label: 'Internship',
      value: 'Internship',
      checked: internship
    });
        alert.addInput({
      type: 'radio',
      label: 'Thesis',
      value: 'Thesis',
      checked: thesis
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Save',
      handler: data => {
      console.log(data)
      this.user.type=data;

     // console.log(data.title)
         firebase.database().ref('voda/' + this.uid).update({
              type:this.user.type

            }).then((success) => {
              
              //Show profile updated!
             // this.img=url;
              //this.alertProvider.showProfileChangeMessage();
             
            }).catch((error) => {
              
              //Show error
          //    this.alertProvider.showErrorMessage('auth/error-change-photo');
          console.log(error);
          //  });
          })
          //  slidingItem.close();

      }
    });
    alert.present();
  }

  degree(){
      var bachelor;
      var master;
    if(this.user.type ==""){
      bachelor = true;
      master = false;
    }
    else if(this.user.type=="Bachelor"){
      bachelor = true;
      master = false;
    }
    else{
      bachelor = false;
      master = true;
    }
    let alert = this.alertCtrl.create();
    alert.setTitle('What degree are you making?');

    alert.addInput({
      type: 'radio',
      label: 'Bachelor',
      value: 'Bachelor',
      checked: bachelor
    });
        alert.addInput({
      type: 'radio',
      label: 'Master',
      value: 'Master',
      checked: master
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Save',
      handler: data => {
      console.log(data)
      this.user.degree=data;

     // console.log(data.title)
         firebase.database().ref('voda/' + this.uid).update({
              degree:this.user.degree

            }).then((success) => {
              
              //Show profile updated!
             // this.img=url;
              //this.alertProvider.showProfileChangeMessage();
             
            }).catch((error) => {
              
              //Show error
          //    this.alertProvider.showErrorMessage('auth/error-change-photo');
          console.log(error);
          //  });
          })
          //  slidingItem.close();

      }
    });
    alert.present();
  }

  done() {
    this.loadingProvider.show();
    var messages = [];
    // Add system message that group is created.
    messages.push({
      date: new Date().toString(),
      sender: firebase.auth().currentUser.uid,
      type: 'system',
      message: 'This group has been created.',
      icon: 'md-chatbubbles'
    });
    // Add members of the group.
    var members = [];
 //   for (var i = 0; i < this.groupMembers.length; i++) {
 //     members.push(this.groupMembers[i].$key);
  //  }
    // Add group info and date.
    this.group.dateCreated = new Date().toString();
    console.log(this.group.dateCreated)
    this.group.messages = messages;
   // this.group.members = members;
    this.group.name = "InnoChat";
    this.group.description = "Chat for the members";
    // Add group to database.
    this.af.database.object('groups/InnoChat/').update({
        messages: this.group.messages,
        dateCreated: this.group.dateCreated,
        name :this.group.name,
        description:this.group.description
    })
      
      // Add group reference to users.
   //   this.af.database.object('/accounts/' + this.groupMembers[0].$key + '/groups/' + groupId).update({
   //     messagesRead: 1
    //  });
    //  for (var i = 1; i < this.groupMembers.length; i++) {
    //    this.af.database.object('/accounts/' + this.groupMembers[i].$key + '/groups/' + groupId).update({
     //     messagesRead: 0
    //    });
      }
      // Open the group chat of the just created group.
    //  this.navCtrl.popToRoot().then(() => {
    //    this.loadingProvider.hide();
    //    this.app.getRootNav().push(GroupPage, { groupId: groupId });
    //  });
   // });
//  }
 // }

}

