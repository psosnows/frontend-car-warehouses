import {Component, OnInit} from '@angular/core';
import {CarModel} from '../../models/car.model';
import {BackendQueryService} from '../../services/backend-query.service';
import {WarehouseModel} from '../../models/warehouse.model';
import {BasketService} from '../../services/basket.serive';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: CarModel[] = [];
  currentCar?: CarModel;
  currentCarsWarehouse?: WarehouseModel;

  selectionText = 'Select a car';
  currentIndex = -1;

  page = 0;
  count = 5;
  pageSize = 5;
  pageSizes = [5, 10, 15];


  constructor(private backendQueryService: BackendQueryService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.retrieveCars();
  }

  getRequestParams(page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveCars(): void {
    const params = this.getRequestParams(this.page, this.pageSize);

    this.backendQueryService.getAllCarsSorted(params)
      .subscribe(
        response => {
          const { cars, totalItems } = response;
          this.cars = cars;
          this.count = totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveCars();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveCars();
  }

  retrieveWarehouse(id): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};
    params[`id`] = id;
    this.backendQueryService.getWarehouseById(params)
      .subscribe(
        response => {
          console.log(response);
          return response;
        },
        error => {
          console.log(error);
        });
  }

  setActiveCar(car: CarModel): void {
    if (car.is_licensed) {
      this.currentCar = car;
      this.currentCarsWarehouse = this.retrieveWarehouse(car.warehouse_id);
      this.selectionText = 'Selected car:';
    } else {
      this.currentCar = null;
      this.currentCarsWarehouse = null;
      this.selectionText = 'This car is not licensed for sale.';
    }
  }

  addToBasket(currentCar: CarModel): void {
    this.basketService.addToBaseket(currentCar);
  }
}
