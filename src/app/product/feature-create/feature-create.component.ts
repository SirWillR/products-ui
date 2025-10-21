import { Component, effect, inject, input, signal } from '@angular/core';
import { ProductFacadeService } from '../state/product-facade.service';
import { CardContainerComponent } from '../../shared/ui/card-container.component';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ProductFormComponent } from '../ui/product-form.component';
import { ProductEntity } from '../model/product.entity';
import { ProductDTO } from '../model/product.dto';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-feature-create',
  imports: [CardContainerComponent, ButtonModule, ProductFormComponent, ProgressSpinnerModule],
  templateUrl: './feature-create.component.html',
})
export class FeatureCreateComponent {
  private readonly productFacade = inject(ProductFacadeService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  protected readonly id = input<number>();
  protected readonly isEditMode = signal<boolean>(false);

  protected currentProduct = this.productFacade.currentProduct;
  protected loading = this.productFacade.loading;
  protected error = this.productFacade.error;

  constructor() {
    effect(() => {
      if (this.id()) {
        this.isEditMode.set(true);
        this.productFacade.loadProductById(this.id() as number);
      }
    });
  }

  protected onBack(): void {
    this.router.navigate(['/products']);
  }

  protected onSubmitProduct(productData: Partial<ProductEntity>): void {
    if (this.isEditMode()) {
      this.updateProduct(this.id() as number, productData);
    } else {
      this.createProduct(productData);
    }
  }

  private buildProductData(productData: Partial<ProductEntity>): ProductDTO {
    return {
      title: String(productData.title),
      description: String(productData.description),
      price: Number(productData.price),
      category: String(productData.category),
      image: String(productData.image),
    };
  }

  private updateProduct(productId: number, productData: Partial<ProductEntity>): void {
    const updatedProductData = this.buildProductData(productData);
    this.productFacade.updateProduct(productId, updatedProductData);
    this.messageService.add({
      severity: 'success',
      summary: 'Confirmado',
      detail: 'Produto atualizado',
    });
    this.onBack();
  }

  private createProduct(productData: Partial<ProductEntity>): void {
    const updatedProductData = this.buildProductData(productData);
    this.productFacade.createProduct(updatedProductData);
    this.messageService.add({
      severity: 'success',
      summary: 'Confirmado',
      detail: 'Produto criado',
    });
    this.onBack();
  }

  protected onDeleteProduct(product: ProductEntity): void {
    this.productFacade.deleteProduct(product.id);
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmado',
      detail: 'Produto excluído',
    });
    this.onBack();
  }
}
