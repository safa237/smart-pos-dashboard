import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private api = 'http://localhost:3000/products';

  

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api).pipe(
    );
  }

  updateProductPrice(id: number, price: number) {
  return this.http.patch<Product>(
    `${this.api}/${id}`,
    {
      price
    }
  );
}

private productsSubject = new BehaviorSubject<Product[]>([]);
products$ = this.productsSubject.asObservable();
}