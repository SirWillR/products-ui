import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductEntity } from '../model/product.entity';
import { environment } from '../../../environments/environment';
import { ProductDTO } from '../model/product.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = environment.baseUrl;
  private readonly httpClient = inject(HttpClient);

  public getAll(): Observable<ProductEntity[]> {
    return this.httpClient.get<ProductEntity[]>(`${this.baseUrl}/products`);
  }

  public getById(id: number): Observable<ProductEntity> {
    return this.httpClient.get<ProductEntity>(`${this.baseUrl}/products/${id}`);
  }

  public create(product: ProductDTO): Observable<ProductEntity> {
    return this.httpClient.post<ProductEntity>(`${this.baseUrl}/products`, product);
  }

  public update(id: number, product: ProductDTO): Observable<ProductEntity> {
    return this.httpClient.put<ProductEntity>(`${this.baseUrl}/products/${id}`, product);
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/products/${id}`);
  }
}
