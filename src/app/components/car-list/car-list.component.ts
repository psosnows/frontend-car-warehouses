import {Component, OnInit} from '@angular/core';
import {CarModel} from '../../models/car.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './components/car-list.component.html',
  styleUrls: ['./components/car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: CarModel[] = [];
  currentCar?: CarModel;

  ngOnInit(): void {
  }
}
