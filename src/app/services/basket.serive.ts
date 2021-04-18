import {Injectable} from '@angular/core';
import {CarModel} from '../models/car.model';

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
    this.grandTotal = this.grandTotal + currentCar.price;
  }

  removeCar(i: number): void {
    this.grandTotal = this.grandTotal - this.selectedCars[i].price;
    if (i > -1) {
      this.selectedCars.splice(i, 1);
    }
  }

}
