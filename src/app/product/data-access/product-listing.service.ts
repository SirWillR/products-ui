import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductEntity } from '../model/product.entity';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductListingService {
  private readonly baseUrl = environment.baseUrl;
  private readonly httpClient = inject(HttpClient);

  public process(): Observable<ProductEntity[]> {
    return this.httpClient.get<ProductEntity[]>(`${this.baseUrl}/products`);
  }
}
