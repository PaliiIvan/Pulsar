import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamPreviewComponent } from './stream-preview.component';

describe('StreamPreviewComponent', () => {
  let component: StreamPreviewComponent;
  let fixture: ComponentFixture<StreamPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
