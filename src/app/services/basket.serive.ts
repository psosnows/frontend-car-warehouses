import {Injectable} from '@angular/core';
import {CarModel} from '../models/car.model';

function round(value: number, decimals: number): number {
  return Number((value).toFixed(decimals));
}

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  selectedCars: CarModel[] = [];
  lastCarIndex = -1;
  grandTotal = 0.0;

  addToBaseket(currentCar: CarModel): void {
    this.lastCarIndex = this.selectedCars.length;
    this.selectedCars.push(currentCar);
    this.grandTotal = round(this.grandTotal + currentCar.price, 2);
  }

  removeCar(i: number): void {
    this.grandTotal = round(this.grandTotal - this.selectedCars[i].price, 2);
    if (i > -1) {
      this.selectedCars.splice(i, 1);
    }
  }

}
