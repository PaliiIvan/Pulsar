import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedStreamPageComponent } from './saved-stream-page.component';

describe('SavedStreamPageComponent', () => {
  let component: SavedStreamPageComponent;
  let fixture: ComponentFixture<SavedStreamPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedStreamPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedStreamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
