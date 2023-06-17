import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbActionsModule,
  NbMenuModule,
  NbButtonModule,
  NbUserModule,
  NbCardModule,
  NbListModule,
  NbTabsetModule,
  NbAccordionModule,
  NbIconModule, NbInputModule, NbSelectModule, NbToastrModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HomeComponent } from './home/home.component';
import { AlertsComponent } from './alerts/alerts.component';
import {HttpClientModule} from "@angular/common/http";
import {
  NbAuthJWTToken,
  NbAuthModule,
  NbDummyAuthStrategy,
  NbPasswordAuthStrategy,
} from '@nebular/auth';
import { NotFoundComponent } from './not-found/not-found.component';
import {FormsModule} from "@angular/forms";
import { PriceAlertsComponent } from './price-alerts/price-alerts.component';
import { OrderbookAlertsComponent } from './orderbook-alerts/orderbook-alerts.component';
import { FormsDataAlertsComponent } from './forms-data-alerts/forms-data-alerts.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CoinPriceService} from "./services/CoinPriceService";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertsComponent,
    NotFoundComponent,
    PriceAlertsComponent,
    OrderbookAlertsComponent,
    FormsDataAlertsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbSidebarModule.forRoot(),
    NbActionsModule,
    NbMenuModule.forRoot(),
    NbButtonModule,
    HttpClientModule,
    NbUserModule,
    NbAuthModule.forRoot({
      strategies: [
        NbDummyAuthStrategy.setup({
          name: 'email',
          delay: 3000,
        }),
      ],
      forms: {},
    }),
    NbCardModule,
    FormsModule,
    NbListModule,
    NbTabsetModule,
    NbAccordionModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    ReactiveFormsModule,
    NbToastrModule.forRoot({}),
  ],
  providers: [
    CoinPriceService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
