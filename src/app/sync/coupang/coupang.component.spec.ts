import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupangComponent } from './coupang.component';

describe('CoupangComponent', () => {
  let component: CoupangComponent;
  let fixture: ComponentFixture<CoupangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoupangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoupangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
