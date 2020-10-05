import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishStreamModalComponent } from './finish-stream-modal.component';

describe('FinishStreamModalComponent', () => {
  let component: FinishStreamModalComponent;
  let fixture: ComponentFixture<FinishStreamModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishStreamModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishStreamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
