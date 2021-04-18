import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class BackendQueryService {
  constructor(private http: HttpClient) {  }

  getAllCarsSorted(params: any): Observable<any> {
    return this.http.get<any>(baseUrl.concat('cars_sorted'), { params });
  }

  getWarehouseById(params: any): Observable<any> {
    return this.http.get<any>(baseUrl.concat('warehouse'), {params});
  }
}
