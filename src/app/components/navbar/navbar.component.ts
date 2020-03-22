import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';
import {User} from 'src/app/shared/models/user.model'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;
  userEmail: string;
  username: string;

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    });
    
  }

  logout() {
    this.authService.logout();
  }
}
