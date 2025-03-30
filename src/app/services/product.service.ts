import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient : HttpClient) { }
  private apiUrl = environment.apiUrl;

  getAllProducts() : Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.apiUrl}/product`);
  }

  getProductById(id : number) : Observable<Product>{
    return this.httpClient.get<Product>(`${this.apiUrl}/product/getbyid/${id}`);
  }
}
