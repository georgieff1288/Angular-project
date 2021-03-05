import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  @ViewChild('chatForm') formValue;
  chatroomId: string;

  constructor(private chatService: ChatService, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.chatroomId = this.route.snapshot.params['id'];
  }

  async send(formValue: { message: string }) {
    this.formValue.resetForm();
    await this.chatService.sendMessage(formValue.message, this.chatroomId);    
  }  
}
