import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../../shared/models/chat-message.model'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  messageContent: string;
  timeStamp: Date = new Date();
  sender: any;

  constructor() { }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.sender = this.chatMessage.sender;    
  }  
}
