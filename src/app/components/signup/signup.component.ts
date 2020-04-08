import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {

  constructor(private authService: AuthService) {  }

  signUp(formValue: { email: string, password: string, displayName: string }) {
    this.authService.signUp(formValue.email, formValue.password, formValue.displayName);
  }
}
