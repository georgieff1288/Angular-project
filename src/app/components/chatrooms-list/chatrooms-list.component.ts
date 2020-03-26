import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chatrooms-list',
  templateUrl: './chatrooms-list.component.html',
  styleUrls: ['./chatrooms-list.component.css']
})
export class ChatroomsListComponent implements OnInit {

  chatrooms: any;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getChatrooms().valueChanges({ idField: 'chatId' }).subscribe(chatrooms => {
      this.chatrooms = chatrooms;
    });
  }
}
