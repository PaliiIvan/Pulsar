import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.reducer';
import * as fromemailVerification from '../../components/email-verification/_store/email-verification.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router: ActivatedRoute, private store: Store<AppState>) { }
  isEmailConfirmationMessage = false;

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      const message = params.get('msg');

      if (message === 'confirm-email') {
        this.isEmailConfirmationMessage = true;
        const userId = this.router.snapshot.queryParamMap.get('id');
        const emailToken = this.router.snapshot.queryParamMap.get('token');
        this.store.dispatch(fromemailVerification.confirmEmail({ userId, emailToken }));
      }


    });
  }

  startStream() {

  }
}
