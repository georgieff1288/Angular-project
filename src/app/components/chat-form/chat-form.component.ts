import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  @ViewChild('chatForm', {static:false}) formValue;
  chatroomId: string;

  constructor(private chatService: ChatService, private route: ActivatedRoute) { 
    this.chatroomId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
  }

  send(formValue: { message: string }) {
    this.chatService.sendMessage(formValue.message, this.chatroomId);
    this.formValue.resetForm();
  }  
}
