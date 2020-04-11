import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[];
  chatroom: any;
  chatroomId: string;

  constructor(private chatService: ChatService, 
    private route: ActivatedRoute, 
    private router: Router) {   }  

  ngOnInit(){
    this.chatService.getUsers().valueChanges().subscribe(users => {
      this.users = users});
    this.chatroomId = this.route.snapshot.params['id'];
    this.chatService.getChatroomById(this.chatroomId)
      .valueChanges().subscribe(chatroom => {if(chatroom){
        this.chatroom = chatroom}else{          
          this.router.navigate(['/chatrooms']).then((
          )=> window.alert('Chatroom was deleted'))          
        }});
  }
}
