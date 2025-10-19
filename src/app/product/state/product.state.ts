import { Injectable, signal } from '@angular/core';
import { ProductEntity } from '../model/product.entity';

@Injectable({
  providedIn: 'root',
})
export class ProductState {
  public readonly products = signal<ProductEntity[]>([]);
  public readonly loading = signal<boolean>(false);
  public readonly error = signal<string>('');
}
