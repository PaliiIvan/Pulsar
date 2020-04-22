import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamSettingsComponent } from './stream-settings.component';

describe('StreamSettingsComponent', () => {
  let component: StreamSettingsComponent;
  let fixture: ComponentFixture<StreamSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
