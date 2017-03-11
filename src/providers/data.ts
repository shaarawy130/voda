import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataProvider {

  constructor(public angularfire: AngularFire) {
    console.log('Hello Data Provider');
  }
   getUsers() {
    return this.angularfire.database.list('/voda', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  // Get user with username
  getUserWithUsername(username) {
    return this.angularfire.database.list('/voda', {
      query: {
        orderByChild: 'username',
        equalTo: username
      }
    });
  }

  // Get logged in user data
  getCurrentUser() {
    return this.angularfire.database.object('/voda/' + firebase.auth().currentUser.uid);
  }

  // Get user by their userId
  getUser(userId) {
    return this.angularfire.database.object('/voda/' + userId);
  }

  // Get requests given the userId.
  getRequests(userId) {
    return this.angularfire.database.object('/requests/' + userId);
  }

  // Get friend requests given the userId.
  getFriendRequests(userId) {
    return this.angularfire.database.list('/voda', {
      query: {
        orderByChild: 'receiver',
        equalTo: userId
      }
    });
  }

  // Get conversation given the conversationId.
  getConversation(conversationId) {
    return this.angularfire.database.object('/conversations/' + conversationId);
  }

  // Get conversations of the current logged in user.
  getConversations() {
    return this.angularfire.database.list('/voda/' + firebase.auth().currentUser.uid + '/conversations');
  }

  // Get messages of the conversation given the Id.
  getConversationMessages(conversationId) {
    return this.angularfire.database.object('/conversations/' + conversationId + '/messages');
  }

  // Get messages of the group given the Id.
  getGroupMessages(groupId) {
    return this.angularfire.database.object('/groups/' + groupId + '/messages/');
  }

  // Get groups of the logged in user.
  getGroups() {
    return this.angularfire.database.list('/voda/' + firebase.auth().currentUser.uid + '/groups');
  }

  // Get group info given the groupId.
  getGroup(groupId) {
    return this.angularfire.database.object('/groups/' + groupId);
  }

}
