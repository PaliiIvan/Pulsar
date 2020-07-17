import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthenticationService } from './services/authentication/authentication.service';
import { User } from './models/user.model';
import { AppState } from './store/app.reducer';

import * as fromAuthActions from './components/authentication/_store/authentication.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Pulsar';
  constructor(private authService: AuthenticationService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(fromAuthActions.loadUserFromStore());
  }

}
