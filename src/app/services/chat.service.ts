import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ChatMessage } from '../shared/models/chat-message.model'
import * as firebase from 'firebase/app';
import { User } from '../shared/models/user.model';
import { Chatroom } from '../shared/models/chatroom.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: firebase.User;
  chatMessages: AngularFirestoreCollection;
  chatMessage: ChatMessage;
  chatrooms: AngularFirestoreCollection;
  chatroom: Chatroom
  userName: Observable<string>;
  users: User[];

  constructor(
    private firestore: AngularFirestore,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }

      // this.getUser().subscribe(a => {
      //   this.userName = a.displayName;
      // });            
      
    });
  }

  // getUser() {
  //   const userId = this.user.uid;
  //   const path = `/users/${userId}`;
  //   console.log(userId)
  //   return this.db.object(path);
  // }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    //return this.firestore.doc(path);
    console.log(userId)
     const userRef: AngularFirestoreDocument<User> = this.firestore.doc(path);
     return userRef;
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    var name = email.match(/^([^@]*)@/)[1];
    this.chatMessages = this.getMessages();
    this.chatMessages.add({
      message: msg,
      timeSent: timestamp,
      //userName: this.userName,
      userName:name,
      email: email });
  }
  
  getMessages(){
       return this.firestore.collection('messages', ref => ref.limitToLast(25).orderBy('timeSent'));          
  }

  getChatrooms(){
    return this.firestore.collection('chatrooms', ref => ref.orderBy('name'));          
  }

  createChatroom(chatroomName: string){    
    this.chatrooms = this.getChatrooms();
    this.chatrooms.add({name: chatroomName});
    this.router.navigate(['chatrooms']);
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);
  }

}
