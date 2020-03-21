import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-create-charoom',
  templateUrl: './create-charoom.component.html',
  styleUrls: ['./create-charoom.component.css']
})
export class CreateCharoomComponent implements OnInit {

  chatRoomName: string;

  constructor(private chat: ChatService) { }

  ngOnInit() {
  }

  create(){
    this.chat.createChatroom(this.chatRoomName);
    this.chatRoomName = '';
  }

}
