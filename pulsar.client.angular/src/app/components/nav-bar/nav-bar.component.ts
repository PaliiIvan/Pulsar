import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user: User;
  isAuth = false;
  isSignIn: boolean;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.User.subscribe(user => {
      this.user = user;
      this.closeAuthModal();
    });
  }

  authProcessStarted(isSignIn: boolean) {
    this.isAuth = true;
    this.isSignIn = isSignIn;
  }

  closeAuthModal() {
    this.isAuth = false;
  }
}
