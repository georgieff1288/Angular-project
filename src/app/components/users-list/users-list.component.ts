import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[];
  chatroom: any;
  chatroomId: string;

  constructor(private chatService: ChatService,private route: ActivatedRoute) { 
    this.chatService.getUsers().valueChanges().subscribe(users => {
       this.users = users});
    this.chatroomId = this.route.snapshot.params['id'];
;
  }  

  ngOnInit(){
    this.chatService.getChatroomById(this.chatroomId)
      .valueChanges().subscribe(chatroom => {this.chatroom = chatroom});
  }
}
