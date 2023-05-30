import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyappsComponent } from './myapps.component';

describe('MyappsComponent', () => {
  let component: MyappsComponent;
  let fixture: ComponentFixture<MyappsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyappsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
