import { Component, inject, OnInit } from '@angular/core';
import { ProductFacadeService } from '../state/product-facade.service';
import { ProductTableComponent } from '../ui/product-table.component';
import { ProductEntity } from '../model/product.entity';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-feature-list',
  imports: [ProductTableComponent, ButtonModule],
  templateUrl: './feature-list.component.html',
})
export class FeatureListComponent implements OnInit {
  private readonly productFacade = inject(ProductFacadeService);

  protected readonly products = this.productFacade.products;
  protected readonly loading = this.productFacade.loading;
  protected readonly error = this.productFacade.error;

  ngOnInit(): void {
    this.productFacade.loadAllProducts();
  }

  protected onAdd(): void {
    console.log('Add product');
  }

  protected onEdit(product: ProductEntity): void {
    console.log('Edit product', product);
  }

  protected onDelete(product: ProductEntity): void {
    console.log('Delete product', product);
  }
}
