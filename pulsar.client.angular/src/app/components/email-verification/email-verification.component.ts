import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class VerifyEmailMessageComponent implements OnInit {

  isEmailChecking: Observable<boolean>;
  isEmailConfirmationSucces: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.isEmailChecking = this.store.select(state => state.emailVerification.isChecking);
    this.isEmailConfirmationSucces = this.store.select(state => state.emailVerification.isSucces);

    this.isEmailConfirmationSucces.subscribe(res => {
      if (res) {
        setTimeout(() => {
          this.router.navigate(['']);
        }, 3000);
      }
    });
  }

  closeAuthWindow(event: MouseEvent) {
    console.log('Email window closed');
  }

}
