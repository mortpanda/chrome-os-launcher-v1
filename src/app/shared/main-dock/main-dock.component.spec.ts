import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDockComponent } from './main-dock.component';

describe('MainDockComponent', () => {
  let component: MainDockComponent;
  let fixture: ComponentFixture<MainDockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
