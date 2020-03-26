import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Chatroom } from 'src/app/shared/models/chatroom.model';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-chatrooms-list',
  templateUrl: './chatrooms-list.component.html',
  styleUrls: ['./chatrooms-list.component.css']
})
export class ChatroomsListComponent implements OnInit {

  chatrooms: any;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.chat.getChatrooms().valueChanges({ idField: 'chatId' }).subscribe(chatrooms => {
      this.chatrooms = chatrooms;
    });
  }

}
