import { inject, Injectable } from '@angular/core';
import { ProductState } from './product.state';
import { ProductListingService } from '../data-access/product-listing.service';
import { finalize, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductFacadeService {
  private readonly state = inject(ProductState);
  private readonly getAllService = inject(ProductListingService);

  public readonly products = this.state.products;
  public readonly loading = this.state.loading;
  public readonly error = this.state.error;

  public loadAllProducts(): void {
    this.getAllService
      .process()
      .pipe(
        take(1),
        tap({
          subscribe: () => this.state.loading.set(true),
          next: (products) => this.state.products.set(products),
          error: (error) => this.state.error.set(error),
        }),
        finalize(() => this.state.loading.set(false))
      )
      .subscribe();
  }
}
