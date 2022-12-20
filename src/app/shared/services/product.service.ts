import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndpoint } from '../end-points/api-end-points';
import { ProductResponse } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = apiEndpoint;

  constructor(private http: HttpClient) { }

  /**
   * To get the all product from the API
   * @returns : ProductResponse[] type Observable
   */
  getAllProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.baseUrl.allProducts);
  }

  /**
   * To get the all product from the API using product title
   * @param name 
   * @returns : ProductResponse[] type Observable
   */
  getAllProductsByName(name: string): Observable<ProductResponse[]> {
    const url = this.baseUrl.productsByTitle + name;
    return this.http.get<ProductResponse[]>(url);
  }

}
