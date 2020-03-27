import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: Observable<firebase.User>;
  oldEmail: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.oldEmail = user.email;
      }
    });    
  }

  edit(formValue: { email: string, password: string, displayName: string }) {
    this.authService.editProfile(formValue.email, formValue.password, formValue.displayName);
    this.router.navigate(['/login'])
  }

}
