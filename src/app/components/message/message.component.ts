import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../../shared/models/chat-message.model'
import { AuthService } from 'src/app/services/auth.service';

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
  userEmail: string;

  constructor(private authService: AuthService) { }

  ngOnInit(chatMessage = this.chatMessage) {
    this.authService.authUser().subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    });
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.sender = this.chatMessage.sender; 
  }  
}
