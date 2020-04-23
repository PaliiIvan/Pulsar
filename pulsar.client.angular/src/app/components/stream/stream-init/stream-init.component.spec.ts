import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamInitComponent } from './stream-init.component';

describe('StreamInitComponent', () => {
  let component: StreamInitComponent;
  let fixture: ComponentFixture<StreamInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
