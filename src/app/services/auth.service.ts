import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  private authState: any;

  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) {
      this.user = afAuth.authState;
     }
    
     authUser():Observable<firebase.User> {
      return this.user;
    }

    get isLogged() { 
      if(firebase.auth().currentUser == null){
        return false
      } 
      return true
    }

     get currentUserId(): string {      
      return this.authState !== null ? this.authState.user.uid : '';
    }

    logout() {
      this.afAuth.auth.signOut();
      this.setUserStatus('offline');
      this.router.navigate(['/home']);
    }

    login(email: string, password: string) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user;
          this.setUserStatus('online');
          this.router.navigate(['']);
        }).catch((error) => {
          window.alert(error.message)
        })
    }
        
    signUp(email: string, password: string, displayName: string) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
              .then((user) => {
                this.authState = user;
                const status = 'online';
                this.setUserData(email, displayName, status);
              }).then(resolve => this.router.navigate(['']))
              .catch((error) => {
                window.alert(error.message)
              })
    }

    setUserData(email: string, displayName: string, status: string) {
      const path = `users/${this.currentUserId}`;
      const data = {
        email: email,
        displayName: displayName,
        status: status
    };
      
      const userRef : AngularFirestoreDocument<User> = this.firestore.doc(path);
      userRef.set(data, { merge: true });
    }
    

    editProfile(email: string, password: string, displayName: string){
      const user = this.afAuth.auth.currentUser;
      const status = 'online';
      user.updatePassword(password);
      user.updateEmail(email);
      this.setUserData(email, displayName, status);
      this.logout();      
      this.router.navigate(['/home']).catch((error) => {
        window.alert(error.message)
      })
    }

    setUserStatus(status: string) {
      const path = `users/${this.currentUserId}`;

      const data = {
        status: status
      };
      
      const userRef : AngularFirestoreDocument<User> = this.firestore.doc(path);
      userRef.set(data, { merge: true });
    }
    
}
