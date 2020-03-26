import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message: string;  
  chatroomId: string;

  constructor(private chat: ChatService, private route: ActivatedRoute) { 
    this.chatroomId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
  }

  send() {
    this.chat.sendMessage(this.message, this.chatroomId);
    this.message = '';
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
