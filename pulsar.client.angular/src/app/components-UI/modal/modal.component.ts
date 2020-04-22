import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() modalOff = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeAuthWindow(event: MouseEvent) {
    this.modalOff.emit();
  }

}
