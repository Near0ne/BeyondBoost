import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import UserCredential = firebase.auth.UserCredential;
import { IUser } from './shared/types/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

  public loggedIn$: Observable<boolean> = this.loggedIn.asObservable();
  public user$: Observable<IUser> = this.user.asObservable();

  constructor(public afStore: AngularFirestore, public ngFireAuth: AngularFireAuth, public router: Router) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        JSON.parse(localStorage.getItem('user'));
        this.user.next(user);
        this.loggedIn.next(true);
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
        this.user.next(null);
        this.loggedIn.next(false);
      }
    });
  }

  // Login in with email/password
  signIn(email, password): Promise<UserCredential> {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  registerUser(email, password): Promise<UserCredential> {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  // get user(): IUser {
  //   return JSON.parse(localStorage.getItem('user'));
  // }

  // Sign-out
  signOut(): Promise<void> {
    return this.ngFireAuth.signOut();
    // .then(() => {
    //   localStorage.removeItem('user');
    // });
  }
}
