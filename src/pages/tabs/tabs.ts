import { Component} from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { WelcomePage } from '../welcome/welcome';
import { GroupchatPage } from '../groupchat/groupchat';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { DataProvider } from '../../providers/data';
import * as firebase from 'firebase';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  unreadGroupMessagesCount;
  groupsInfo;
  groupList;
  tab;
  
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = WelcomePage;
  tab2Root: any = ContactPage;
  tab3Root: any = GroupchatPage;

  constructor(public navCtrl: NavController,public af: AngularFire, public dataProvider:DataProvider) {

  }

ionViewDidLoad() {

 this.dataProvider.getGroups().subscribe((groupIds) => {
      if (groupIds.length > 0) {
        this.groupsInfo = groupIds;
      //  if (this.groupList && this.groupList.length > groupIds.length) {
          // User left/deleted a group, clear the list and add or update each group again.
     //     this.groupList = null;
    //    }
       groupIds.forEach((groupId) => {
          this.dataProvider.getGroup(groupId.$key).subscribe((group) => {
           if (group.$exists()) {
             this.addOrUpdateGroup(group);
            }
         });
        });
      } else {
        this.unreadGroupMessagesCount = null;
        this.groupsInfo = null;
        this.groupList = null;
      }
    });
  
}

getUnreadGroupMessagesCount() {
 // console.log(this.navCtrl.getActive())
 if(this.tab != 2){
 // if (this.navCtrl.getActive().component.name != 'GroupchatPage') {
     if (this.unreadGroupMessagesCount) {
      if (this.unreadGroupMessagesCount > 0) {
        return this.unreadGroupMessagesCount;
      }
    }
    return null;
  }
}
//}

 tabSelected(event) {
   
   this.tab=event.index
  console.log(event.index);
}  

addOrUpdateGroup(group) {
  
    if (!this.groupList) {
      this.groupList = [group];
    } else {
      var index = -1;
      for (var i = 0; i < this.groupList.length; i++) {
        if (this.groupList[i].$key == group.$key) {
          index = i;
        }
      }
      if (index > -1) {
        this.groupList[index] = group;
      } else {
        this.groupList.push(group);
      }
    }
    this.computeUnreadGroupMessagesCount();
  }
  computeUnreadGroupMessagesCount() {
    this.unreadGroupMessagesCount = 0;
    if (this.groupList) {
      for (var i = 0; i < this.groupList.length; i++) {
        if (this.groupList[i].messages) {
          this.unreadGroupMessagesCount += this.groupList[i].messages.length - this.groupsInfo[i].messagesRead;
        }
        if (this.unreadGroupMessagesCount == 0) {
          this.unreadGroupMessagesCount = null;
        }
      }
    }
  }
}
