import { computed, inject, Injectable, signal } from '@angular/core';
import { initialProductState, ProductState } from './product.state';
import { ProductService } from '../data-access/product.service';
import { finalize, Observable, take, tap } from 'rxjs';
import { ProductEntity } from '../model/product.entity';
import { ProductDTO } from '../model/product.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductFacadeService {
  private readonly getAllService = inject(ProductService);

  private readonly state = signal<ProductState>(initialProductState);

  public readonly products = computed(() => this.state().products);
  public readonly loading = computed(() => this.state().loading);
  public readonly error = computed(() => this.state().error);

  public readonly currentProduct = signal<ProductEntity | null>(null);

  private updateState(partial: Partial<ProductState>): void {
    this.state.update((currentState) => ({ ...currentState, ...partial }));
  }

  public loadAllProducts(): void {
    this.getAllService
      .getAll()
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

  public loadProductById(id: number): void {
    this.getAllService
      .getById(id)
      .pipe(
        take(1),
        tap({
          subscribe: () => this.updateState({ loading: true }),
          next: (product) => this.currentProduct.set(product),
          error: (error) => this.updateState({ error }),
        }),
        finalize(() => this.updateState({ loading: false }))
      )
      .subscribe();
  }

  public createProduct(product: ProductDTO): void {
    this.getAllService
      .create(product)
      .pipe(
        take(1),
        tap({
          subscribe: () => this.updateState({ loading: true }),
          next: (newProduct) => {
            this.updateState({ products: [...this.products(), newProduct] });
            this.currentProduct.set(newProduct);
          },
          error: (error) => this.updateState({ error }),
        }),
        finalize(() => this.updateState({ loading: false }))
      )
      .subscribe();
  }

  public updateProduct(id: number, product: ProductDTO): void {
    this.getAllService
      .update(id, product)
      .pipe(
        take(1),
        tap({
          subscribe: () => this.updateState({ loading: true }),
          next: (updatedProduct) => {
            this.updateState({
              products: this.products().map((p) => (p.id === id ? updatedProduct : p)),
            });
            this.currentProduct.set(updatedProduct);
          },
          error: (error) => this.updateState({ error }),
        }),
        finalize(() => this.updateState({ loading: false }))
      )
      .subscribe();
  }

  public deleteProduct(id: number): void {
    this.getAllService
      .delete(id)
      .pipe(
        take(1),
        tap({
          subscribe: () => this.updateState({ loading: true }),
          next: () => this.updateState({ products: this.products().filter((p) => p.id !== id) }),
          error: (error) => this.updateState({ error }),
        }),
        finalize(() => this.updateState({ loading: false }))
      )
      .subscribe();
  }
}
