import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../shared/models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  private authState: any;

  constructor(private afAuth: AngularFireAuth, 
    private db: AngularFireDatabase,
    private firestore: AngularFirestore,
    private router: Router,
    private userService: UserService) {
      this.user = afAuth.authState;
     }
    
     authUser() {
      return this.user;
    }

     get currentUserId(): string {      
      return this.authState !== null ? this.authState.user.uid : '';
    }

    // get userData(): Observable<User> {

    //   return this.user.pipe(
    //     switchMap(user => {
    //       if (user)
    //         return this.userService.get(user.uid);
    //       else
    //         return of(null);
    //     })
    //   )
    // }

    logout() {
      this.afAuth.auth.signOut();
      this.router.navigate(['']);
    }

    login(email: string, password: string) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user;
          this.setUserStatus('online');
          this.router.navigate(['chat']);
        });
    }
        
    signUp(email: string, password: string, displayName: string) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
              .then((user) => {
                this.authState = user;
                const status = 'online';
                this.setUserData(email, displayName, status);
              }).catch(error => console.log(error));
    }

    setUserData(email: string, displayName: string, status: string): void {
      const path = `users/${this.currentUserId}`;
      const data = {
        email: email,
        displayName: displayName,
        status: status
      };
      
      const userRef : AngularFirestoreDocument<User> = this.firestore.doc(path);
      userRef.set(data, { merge: true });
      //this.db.doc(path).update(data)
      //.catch(error => console.log(error));
    }
    

    // setUserData(email: string, displayName: string, status: string): void {
    //   const path = `users/${this.currentUserId}`;
    //   const data = {
    //     email: email,
    //     displayName: displayName,
    //     status: status
    //   };
    //   this.db.object(path).update(data)
    //     .catch(error => console.log(error));
    //   //const userRef : AngularFirestoreDocument<User> = this.db.doc(path);
    //   //userRef.set(data, { merge: true });
    //   //this.db.doc(path).update(data)
    //   //.catch(error => console.log(error));
    // }

    

    setUserStatus(status: string): void {
      const path = `users/${this.currentUserId}`;

      const data = {
        status: status
      };

      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }

    get getUser(): Observable<User> {

      return this.user.pipe(
        switchMap(user => {
          if (user)
            return this.userService.get(user.uid);
          else
            return of(null);
        })
      )
    }
}
