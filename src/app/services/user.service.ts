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

  constructor(private firestore: AngularFirestore,
    private db: AngularFireDatabase, 
    public afAuth: AngularFireAuth) { }

  getUsers(){
    return this.firestore.collection('users', ref => ref); 
  }
}

