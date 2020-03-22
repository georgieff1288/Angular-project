import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent  {

  users: User[];

  constructor(private userService: UserService) { 
    this.userService.getUsers().valueChanges().subscribe(users => {
      this.users = users;
    });
  }  
}
