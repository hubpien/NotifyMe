import { Component } from '@angular/core';
import {Alert} from "../../models/Alerts";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {
  alerts: Alert[] = []; // tutaj przechowujemy listę alertów

  addAlert(city: string, alertType: string, value: string): void {
    const newAlert: Alert = {isEditing: false, id: this.alerts.length, city, alertType, value };
    this.alerts.push(newAlert);
  }
  startEditing(id: number): void {
    const index = this.alerts.findIndex((alert) => alert.id === id);
    if (index !== -1) {
      this.alerts[index].isEditing = true;
    }
  }

  editAlert(id: number, city: string, alertType: string, value: string): void {
    const index = this.alerts.findIndex((alert) => alert.id === id);
    if (index !== -1) {
      this.alerts[index] = {isEditing: false, id, city, alertType, value };
    }
  }

  deleteAlert(id: number): void {
    const index = this.alerts.findIndex((alert) => alert.id === id);
    if (index !== -1) {
      this.alerts.splice(index, 1);
    }
  }
}
