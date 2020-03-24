import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Pulsar';

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (user != null) {
      this.authService.checkToken(user.token)
      .subscribe(isValidToken => {
        if (isValidToken) {
          console.log(isValidToken);
          this.authService.User.next(user);
        } else {
          this.authService.regenerateToken(user.token);
        }
      });
    }
  }

}
