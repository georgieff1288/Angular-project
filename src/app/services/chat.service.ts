import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject, Subscription, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ChatMessage } from '../shared/models/chat-message.model'
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: any;
  chatMessages: AngularFirestoreCollection;
  chatMessage: ChatMessage;
  userName: Observable<string>;

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    //this.afAuth.authState.subscribe(auth => {
    //  if (auth !== undefined && auth !== null) {
    //    this.user = auth;
    //  }
    //});
   }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    //const email = this.user.email;
    const email = 'test@abv.bg';
    this.chatMessages = this.getMessages();
     this.chatMessages.add({
      message: msg,
      timeSent: timestamp,
      //userName: this.userName,
      userName: 'ivan',
      email: email });
  }
  
  getMessages(){
       return this.db.collection('messages', ref => ref.limitToLast(25).orderBy('timeSent'));          
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
