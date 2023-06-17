import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoinPriceService } from '../services/CoinPriceService';
import { OrderBookService } from '../services/OrderBookService';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-price-alerts',
  templateUrl: './price-alerts.component.html',
  styleUrls: ['./price-alerts.component.scss']
})
export class PriceAlertsComponent {
  notificationForm: FormGroup;
  private index: number = 0;
  positions = NbGlobalPhysicalPosition;
  
  constructor(
    private formBuilder: FormBuilder,
    private coinPriceService: CoinPriceService,
    private orderBookService: OrderBookService,
    private toastrService: NbToastrService
  ) {
    this.notificationForm = this.formBuilder.group({
      sendMethod: ['', Validators.required],
      coinType: ['', Validators.required],
      condition: ['', Validators.required],
      exchange: ['', Validators.required],
      targetPrice: ['', Validators.required]
    });
  }
  submitForm(): void {
    console.log("submitForm");
    console.log(this.notificationForm.value);
    console.log(this.notificationForm.valid);

    if (this.notificationForm.valid) {
      const formData = this.notificationForm.value;
      console.log(this.notificationForm.value);
      console.log(formData);
      console.log(formData.targetPrice);

      if (formData.coinType === 'btc') {
        this.coinPriceService.getData(formData.targetPrice, formData.condition).subscribe(order => {
          console.log(order);
          if (order !== undefined && order !== null ) {
            this.showToast(order, this.positions.BOTTOM_RIGHT, 'success');
          }
        });
      } else {
        //this.coinPriceService.someMethod(formData);
      }
    }
  }
  showToast(order: any , position: NbGlobalPosition, status: NbComponentStatus) {
    this.index += 1;
    this.toastrService.show(status, `${order}`, { position, status });
  }
}
