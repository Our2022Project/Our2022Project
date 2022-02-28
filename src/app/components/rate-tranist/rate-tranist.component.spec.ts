import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTranistComponent } from './rate-tranist.component';

describe('RateTranistComponent', () => {
  let component: RateTranistComponent;
  let fixture: ComponentFixture<RateTranistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RateTranistComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateTranistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
