import { Component, inject, OnInit } from '@angular/core';
import { ProductFacadeService } from '../state/product-facade.service';
import { ProductTableComponent } from '../ui/product-table.component';
import { ProductEntity } from '../model/product.entity';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CardContainerComponent } from '../../shared/ui/card-container.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-feature-list',
  imports: [CardContainerComponent, ProductTableComponent, ButtonModule, ProgressSpinnerModule],
  templateUrl: './feature-list.component.html',
})
export class FeatureListComponent implements OnInit {
  private readonly productFacade = inject(ProductFacadeService);
  private readonly router = inject(Router);
    private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  protected readonly products = this.productFacade.products;
  protected readonly loading = this.productFacade.loading;
  protected readonly error = this.productFacade.error;

  ngOnInit(): void {
    this.productFacade.loadAllProducts();
  }

  protected onAdd(): void {
    this.router.navigate(['/products', 'create']);
  }

  protected onEdit(product: ProductEntity): void {
    this.router.navigate(['/products', 'edit', product.id]);
  }

  protected onDelete(product: ProductEntity): void {
    this.confirmDeleteProduct(product);
  }

  private confirmDeleteProduct(product: ProductEntity): void {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir este produto?',
      header: 'Atenção',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Excluir',
        severity: 'danger',
      },
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmado',
          detail: 'Produto excluído',
        });
        this.productFacade.deleteProduct(product.id);
      },
    });
  }
}
