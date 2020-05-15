import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { IUser } from '../shared/types/user.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public loggedIn$: Observable<boolean>;
  public user$: Observable<IUser>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$;
    this.loggedIn$ = this.authService.loggedIn$;
  }

  public logout(): void {
    this.authService
      .signOut()
      .then((res) => {
        console.log('LOGOUT SUCCESS');
      })
      .catch((err) => {
        console.log('LOGOUT ERR');
      });
  }
}
