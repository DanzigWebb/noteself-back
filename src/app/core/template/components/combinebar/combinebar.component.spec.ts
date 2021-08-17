import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinebarComponent } from './combinebar.component';

describe('CombinebarComponent', () => {
  let component: CombinebarComponent;
  let fixture: ComponentFixture<CombinebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombinebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
