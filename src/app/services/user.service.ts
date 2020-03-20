import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) { }

  // get(uid: string): Observable<User> {
  //   return this.db.doc<User>('/users/' + uid).valueChanges();
  // }

  // getUsers() {
  //   const path = '/users';
  //   return this.db.doc(path);
  // }

  // getUser(uid:string) {
  //   const userId = uid;
  //   const path = `/users/${userId}`;
  //   return this.db.doc(path);
  // }

  get(uid: string): Observable<User> {
    return this.db.object<User>('/users/' + uid).valueChanges();
  }

  updateCurrentUser(displayName){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: displayName
      }).then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }
}

