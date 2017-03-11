import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, ModalController, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data';
import { ImageProvider } from '../../providers/image';
import * as firebase from 'firebase';
//import { UserInfoPage } from '../user-info/user-info';
//import { GroupInfoPage } from '../group-info/group-info';
//import { ImageModalPage } from '../image-modal/image-modal';
import { AngularFire } from 'angularfire2';
import { Camera, Keyboard } from 'ionic-native';

/*
  Generated class for the Groupchat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-groupchat',
  templateUrl: 'groupchat.html'
})
export class GroupchatPage {

  @ViewChild(Content) content: Content;
  private title: any;
  private groupId: any;
  private message: any;
  private messages: any;
  private alert: any;
  private updateDateTime: any;
  private subscription: any;
  // GroupPage
  // This is the page where the user can chat with other group members and view group info.
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider,
    public modalCtrl: ModalController, public angularfire: AngularFire, public alertCtrl: AlertController,
    public imageProvider: ImageProvider) { }

  ionViewDidLoad() {
    // Get group details
    this.groupId = "InnoChat";
    this.subscription = this.dataProvider.getGroup(this.groupId).subscribe((group) => {
      console.log(group)
      if (group.$exists()) {
        this.title = group.name;
        // Get group messages
        this.dataProvider.getGroupMessages(group.$key).subscribe((messages) => {
          if (this.messages) {
            console.log("la2aha", messages)
            // Just append newly added messages to the bottom of the view.
            if (messages.length > this.messages.length) {
              let message = messages[messages.length - 1];
              this.dataProvider.getUser(message.sender).subscribe((user) => {
                message.avatar = user.img;
              });
              this.messages.push(message);
            }
          } else {
             console.log("mal2ahash", messages)
            // Fetch all group messages for the first time.
            this.messages = [];
            messages.forEach((message) => {
              this.dataProvider.getUser(message.sender).subscribe((user) => {
                message.avatar = user.img;
              });
              this.messages.push(message);
            });
            console.log(this.messages)
          }
        });
      }
    });

    // Update messages' date time elapsed every minute based on Moment.js.
    var that = this;
    if (!that.updateDateTime) {
      that.updateDateTime = setInterval(function() {
        if (that.messages) {
          that.messages.forEach((message) => {
            let date = message.date;
            message.date = new Date(date);
          });
        }
      }, 60000);
    }
  }

  // Update messagesRead when user lefts this page.
  ionViewWillLeave() {
    if(this.messages)
      this.setMessagesRead(this.messages);
  }

  // Check if currentPage is active, then update user's messagesRead.
  setMessagesRead(messages) {
    if (this.navCtrl.getActive().component.name == 'GroupchatPage') {
      // Update user's messagesRead on database.
      this.angularfire.database.object('/voda/' + firebase.auth().currentUser.uid + '/groups/' + this.groupId).update({
        messagesRead: this.messages.length
      });
    }
  }

  // Check if 'return' button is pressed and send the message.
  onType(keyCode) {
    if (keyCode == 13) {
      Keyboard.close();
      this.send();
    }
  }

  // Back
  back() {
    this.subscription.unsubscribe();
    this.navCtrl.pop();
  }

  // Scroll to bottom of page after a short delay.
  scrollBottom() {
    var that = this;
    setTimeout(function() {
      that.content.scrollToBottom();
    }, 300);
  }

  // Check if the user is the sender of the message.
  isSender(message) {
    if (message.sender == firebase.auth().currentUser.uid) {
      return true;
    } else {
      return false;
    }
  }

  // Check if the message is a system message.
  isSystemMessage(message) {
    if (message.type == 'system') {
      return true;
    } else {
      return false;
    }
  }

  // View user info
  viewUser(userId) {
   // this.navCtrl.push(UserInfoPage, { userId: userId });
  }

  // Send text message to the group.
  send() {
    // Clone an instance of messages object so it will not directly be updated.
    // The messages object should be updated by our observer declared on ionViewDidLoad.
    let messages = JSON.parse(JSON.stringify(this.messages));
    messages.push({
      date: new Date().toString(),
      sender: firebase.auth().currentUser.uid,
      type: 'text',
      message: this.message
    });
    // Update group messages.
    this.dataProvider.getGroup(this.groupId).update({
      messages: messages
    });
    // Clear messagebox.
    this.message = '';
  }

  // Enlarge image messages.
  enlargeImage(img) {
    //let imageModal = this.modalCtrl.create(ImageModalPage, { img: img });
    //imageModal.present();
  }

  // Send photoMessage.
  sendPhoto() {
    // Ask user if they want to take photo or choose from gallery.
    this.alert = this.alertCtrl.create({
      title: 'Send Photo Message',
      message: 'Do you want to take a photo or choose from your photo gallery?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Choose from Gallery',
          handler: () => {
            // Upload the image and return promise.
            this.imageProvider.uploadGroupPhotoMessage(this.groupId, Camera.PictureSourceType.PHOTOLIBRARY).then((url) => {
              // Process photoMessage on database.
              this.sendPhotoMessage(url);
            });
          }
        },
        {
          text: 'Take Photo',
          handler: () => {
            // Upload the image and return promise.
            this.imageProvider.uploadGroupPhotoMessage(this.groupId, Camera.PictureSourceType.CAMERA).then((url) => {
              // Process photoMessage on database.
              this.sendPhotoMessage(url);
            });
          }
        }
      ]
    }).present();
  }

  // Process photoMessage on database.
  sendPhotoMessage(url) {
    let messages = JSON.parse(JSON.stringify(this.messages));
    messages.push({
      date: new Date().toString(),
      sender: firebase.auth().currentUser.uid,
      type: 'image',
      url: url
    });
    this.dataProvider.getGroup(this.groupId).update({
      messages: messages
    });
    this.message = '';
  }

  // View group info.
  groupInfo() {
 //   this.navCtrl.push(GroupInfoPage, { groupId: this.groupId });
  }

}



