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

  getUserDisplayName(userUid){
    return this.firestore.collection('users').doc(userUid)
  }

  logout() {      
    this.setUserStatus('offline');
    this.afAuth.auth.signOut();
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

  async editProfile(email: string, password: string, displayName: string){
    const user = this.afAuth.auth.currentUser;
    const status = 'offline';
    this.setUserData(email, displayName, status);      
    await user.updatePassword(password).catch((error) => {
      window.alert(error.message)});
    await user.updateEmail(email).catch((error) => {
      window.alert(error.message)})
    this.logout();
    this.router.navigate(['/login']);
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
