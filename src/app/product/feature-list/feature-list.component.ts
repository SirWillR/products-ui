import { Component, inject, OnInit } from '@angular/core';
import { ProductFacadeService } from '../state/product-facade.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
})
export class FeatureListComponent implements OnInit {
  private readonly productFacade = inject(ProductFacadeService);

  protected readonly products = this.productFacade.products$;
  protected readonly loading = this.productFacade.loading$;
  protected readonly error = this.productFacade.error$;

  ngOnInit(): void {
    this.productFacade.loadAllProducts();
  }
  
}
