import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chatrooms-list',
  templateUrl: './chatrooms-list.component.html',
  styleUrls: ['./chatrooms-list.component.css']
})
export class ChatroomsListComponent implements OnInit {

  chatrooms: any;
  userUid: string;

  constructor(private chatService: ChatService, private authService: AuthService) {  }

  ngOnInit() {
    this.userUid = this.authService.currentUserId;
    this.chatService.getChatrooms().valueChanges({ idField: 'chatId' }).subscribe(chatrooms => {
      this.chatrooms = chatrooms;
    });
  }

  deleteChatroom(chatroomId){
    this.chatService.deleteChatroom(chatroomId);
  }
}
