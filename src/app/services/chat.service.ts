import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
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
  sender: any;
  users: User[];

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser().valueChanges().subscribe(user => this.sender = user);
    });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.firestore.doc(path);
  }

  getUsers(){
    return this.firestore.collection('users', ref => ref); 
  }

  sendMessage(msg: string, chatroomId: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    const name = email.match(/^([^@]*)@/)[1];
    this.chatMessages = this.getMessages(chatroomId);
    this.chatMessages.add({
      message: msg,
      timeSent: timestamp,
      sender: this.sender
     });
  }
  
  getMessages(chatroomId: string){ 
    return this.firestore.collection('chatrooms')
      .doc(chatroomId)
      .collection('messages', ref => ref.limitToLast(25).orderBy('timeSent', 'asc'));           
  }

  getChatroomById(id: string){
    return this.firestore.collection('chatrooms').doc(id);
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
    const time = (now.getUTCHours() + 2) + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);
  }

}
