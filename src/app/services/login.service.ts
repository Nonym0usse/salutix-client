import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {User} from "../interfaces/user";
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
   return  new Promise((resolve, reject) => {
     this.afAuth
       .signInWithEmailAndPassword(email, password)
       .then((result) => {
         resolve(result);
       })
       .catch((error) => {
         reject(error);
       });
    });
  }


  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  // Sign out
  SignOut() {
    return  new Promise((resolve, reject) => {
      return this.afAuth.signOut().then(() => {
        resolve('success');
      }).catch((error) => {
        reject(error);
      })
    });
  }

}
