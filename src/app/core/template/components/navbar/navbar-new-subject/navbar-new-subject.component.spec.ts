import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarNewSubjectComponent } from './navbar-new-subject.component';

describe('NavbarNewSubjectComponent', () => {
  let component: NavbarNewSubjectComponent;
  let fixture: ComponentFixture<NavbarNewSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarNewSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarNewSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
