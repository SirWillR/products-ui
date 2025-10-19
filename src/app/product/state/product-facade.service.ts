import { computed, inject, Injectable, signal } from '@angular/core';
import { initialProductState, ProductState } from './product.state';
import { ProductListingService } from '../data-access/product-listing.service';
import { finalize, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductFacadeService {
  private readonly getAllService = inject(ProductListingService);
  
  private readonly state = signal<ProductState>(initialProductState);

  public readonly products = computed(() => this.state().products);
  public readonly loading = computed(() => this.state().loading);
  public readonly error = computed(() => this.state().error);

  private updateState(partial: Partial<ProductState>): void {
    this.state.update((currentState) => ({ ...currentState, ...partial }));
  }

  public loadAllProducts(): void {
    this.getAllService
      .process()
      .pipe(
        take(1),
        tap({
          subscribe: () => this.updateState({ loading: true }),
          next: (products) => this.updateState({ products }),
          error: (error) => this.updateState({ error }),
        }),
        finalize(() => this.updateState({ loading: false }))
      )
      .subscribe();
  }
}
