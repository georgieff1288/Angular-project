import { Component } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent  {

  users: User[];

  constructor(private chatService: ChatService) { 
    this.chatService.getUsers().valueChanges().subscribe(users => {
      this.users = users;
    });
  }  
}
