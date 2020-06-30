import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFormsComponent } from './chat-forms.component';

describe('ChatFormsComponent', () => {
  let component: ChatFormsComponent;
  let fixture: ComponentFixture<ChatFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
