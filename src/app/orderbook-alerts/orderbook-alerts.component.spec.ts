import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderbookAlertsComponent } from './orderbook-alerts.component';

describe('OrderbookAlertsComponent', () => {
  let component: OrderbookAlertsComponent;
  let fixture: ComponentFixture<OrderbookAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderbookAlertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderbookAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
