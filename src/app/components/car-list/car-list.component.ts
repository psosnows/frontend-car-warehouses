import {Component, OnInit} from '@angular/core';
import {CarModel} from '../../models/car.model';
import {BackendQueryService} from '../../services/backend-query.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: CarModel[] = [];
  currentCar?: CarModel;

  title = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];


  constructor(private backendQueryService: BackendQueryService) { }

  ngOnInit(): void {
    this.retrieveCars();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveCars(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

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
}
