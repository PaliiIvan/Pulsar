import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamDescriptionComponent } from './stream-description.component';

describe('StreamDescriptionComponent', () => {
  let component: StreamDescriptionComponent;
  let fixture: ComponentFixture<StreamDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
