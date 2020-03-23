import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  @Input() isSignIn: boolean;
  @Output() authenticationOff = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeAuthWindow(event: MouseEvent) {
    this.authenticationOff.emit();
    console.log(event);
  }
}
