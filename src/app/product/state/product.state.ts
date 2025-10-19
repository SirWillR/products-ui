import { Injectable } from '@angular/core';
import { ProductEntity } from '../model/product.entity';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductState {
  public readonly products$ = new BehaviorSubject<ProductEntity[]>([]);
  public readonly loading$ = new BehaviorSubject<boolean>(false);
  public readonly error$ = new BehaviorSubject<string>('');
}
