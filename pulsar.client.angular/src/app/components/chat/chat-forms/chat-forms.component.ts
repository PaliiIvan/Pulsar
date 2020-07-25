import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat-forms',
  templateUrl: './chat-forms.component.html',
  styleUrls: ['./chat-forms.component.scss']
})
export class ChatFormsComponent implements OnInit {

  constructor() { }

  chatMessageForm = new FormGroup({
    message: new FormControl('')
  });

  ngOnInit(): void {

  }

  sendComment() {
    console.log(this.chatMessageForm.get('message').value);

    this.chatMessageForm.reset();
  }

}
