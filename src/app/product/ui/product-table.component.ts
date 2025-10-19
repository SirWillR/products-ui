import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { ProductEntity } from '../model/product.entity';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-products-table',
  imports: [TableModule, ButtonModule, RatingModule, CurrencyPipe, FormsModule, TagModule],
  template: `
    <p-table [value]="products()" [tableStyle]="{ 'min-width': '60rem' }">
      <ng-template #header>
        <tr>
          <th>Nome</th>
          <th>Imagem</th>
          <th>Preço</th>
          <th>Categoria</th>
          <th>Avaliações</th>
          <th>Ações</th>
        </tr>
      </ng-template>
      <ng-template #body let-product>
        <tr>
          <td>{{ product.title }}</td>
          <td>
            <img [src]="product.image" [alt]="product.title" class="w-3rem border-circle" />
          </td>
          <td>{{ product.price | currency : 'BRL' }}</td>
          <td>{{ product.category }}</td>
          <td><p-rating [(ngModel)]="product.rating.rate" [readonly]="true" /></td>
          <td>
            <div class="flex gap-2">
              <p-button icon="pi pi-pencil" rounded (onClick)="edit.emit(product)"></p-button>
              <p-button icon="pi pi-trash" rounded (onClick)="delete.emit(product)" severity="danger"></p-button>
            </div>
          </td>
        </tr>
      </ng-template>
      <ng-template #footer>
        <tr>
          <td colspan="6">{{ products() ? products().length : 0 }} produtos carregados.</td>
        </tr>
      </ng-template>
    </p-table>
  `,
})
export class ProductTableComponent {
  public readonly products = input.required<ProductEntity[]>();
  public readonly delete = output<ProductEntity>();
  public readonly edit = output<ProductEntity>();
}
