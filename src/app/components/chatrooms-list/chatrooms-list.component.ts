import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Chatroom } from 'src/app/shared/models/chatroom.model';

@Component({
  selector: 'app-chatrooms-list',
  templateUrl: './chatrooms-list.component.html',
  styleUrls: ['./chatrooms-list.component.css']
})
export class ChatroomsListComponent implements OnInit {

  chatrooms: Chatroom[];

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.chat.getChatrooms().valueChanges().subscribe(chatrooms => {
      this.chatrooms = chatrooms;
    });
  }

}
