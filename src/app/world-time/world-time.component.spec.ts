import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldTimeComponent } from './world-time.component';

describe('WorldTimeComponent', () => {
  let component: WorldTimeComponent;
  let fixture: ComponentFixture<WorldTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
