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
    this.authService.User.next(user);
  }

}
