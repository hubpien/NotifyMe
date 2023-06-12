import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsDataAlertsComponent } from './forms-data-alerts.component';

describe('FormsDataAlertsComponent', () => {
  let component: FormsDataAlertsComponent;
  let fixture: ComponentFixture<FormsDataAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsDataAlertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsDataAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
