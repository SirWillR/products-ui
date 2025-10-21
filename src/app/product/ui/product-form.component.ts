import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductEntity } from '../model/product.entity';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ConfirmationService, MessageService } from 'primeng/api';

type ProductForm = {
  title: AbstractControl<string | null>;
  price: AbstractControl<number | null>;
  description: AbstractControl<string | null>;
  category: AbstractControl<string | null>;
  image: AbstractControl<string | null>;
};

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    FluidModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    ButtonModule,
    MessageModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="submitForm()">
      <div class="grid grid-cols-2 gap-4 items-baseline">
        <!-- Product Name -->
        <div class="col-span-1">
          <p-floatlabel variant="in">
            <input pInputText id="in_title" formControlName="title" autocomplete="off" fluid />
            <label for="in_title">Nome</label>
          </p-floatlabel>
          @if(form.controls['title'].invalid && (form.controls['title'].touched ||
          form.controls['title'].dirty)) {
          <p-message severity="error" variant="simple" size="small"> Nome é obrigatório </p-message>
          }
        </div>

        <!-- Product Price -->
        <div class="col-span-1">
          <p-floatlabel variant="in">
            <p-inputnumber
              inputId="in_price"
              formControlName="price"
              autocomplete="off"
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              [min]="0"
              fluid
            />
            <label for="in_price">Preço</label>
          </p-floatlabel>
          @if(form.controls['price'].invalid && (form.controls['price'].touched ||
          form.controls['price'].dirty)) {
          <p-message severity="error" variant="simple" size="small">
            Preço é obrigatório
          </p-message>
          }
        </div>

        <!-- Product Category -->
        <div class="col-span-1">
          <p-floatlabel variant="in">
            <p-select
              formControlName="category"
              inputId="in_category"
              [options]="categories"
              fluid
            />
            <label for="in_category">Categoria</label>
          </p-floatlabel>
          @if(form.controls['category'].invalid && (form.controls['category'].touched ||
          form.controls['category'].dirty)) {
          <p-message severity="error" variant="simple" size="small">
            Categoria é obrigatória
          </p-message>
          }
        </div>

        <!-- Product Image -->
        <div class="col-span-1">
          <p-floatlabel variant="in">
            <input pInputText id="in_image" formControlName="image" autocomplete="off" fluid />
            <label for="in_image">URL da Imagem</label>
          </p-floatlabel>
          @if(form.controls['image'].invalid && (form.controls['image'].touched ||
          form.controls['image'].dirty)) {
          <p-message severity="error" variant="simple" size="small">
            URL da Imagem é obrigatória
          </p-message>
          }
        </div>

        <!-- Product Description -->
        <div class="col-span-2">
          <p-floatlabel variant="in">
            <input
              pInputText
              id="in_description"
              formControlName="description"
              autocomplete="off"
              fluid
            />
            <label for="in_description">Descrição</label>
          </p-floatlabel>
          @if(form.controls['description'].invalid && (form.controls['description'].touched ||
          form.controls['description'].dirty)) {
          <p-message severity="error" variant="simple" size="small">
            Descrição é obrigatória
          </p-message>
          }
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-between">
        @if(selectedProduct()) {
        <p-button
          label="Excluir"
          class="mt-4 mr-2"
          severity="danger"
          (onClick)="confirmDeleteProduct($event)"
        ></p-button>
        }
        <div class="flex gap-2 w-full justify-end">
          <p-button
            label="Limpar"
            class="mt-4"
            severity="secondary"
            (onClick)="form.reset()"
          ></p-button>
          <p-button label="Salvar" class="mt-4" type="submit"></p-button>
        </div>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly confirmationService = inject(ConfirmationService);
  protected form: FormGroup<ProductForm> = {} as FormGroup<ProductForm>;

  public selectedProduct = input<ProductEntity | null>();
  public submitProduct = output<Partial<ProductEntity>>();
  public deleteProduct = output<ProductEntity>();

  protected categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];

  ngOnInit(): void {
    this.createForm();
    this.populateForm(this.selectedProduct());
  }

  private createForm() {
    this.form = this.fb.group<ProductForm>({
      title: this.fb.control<string | null>(null, [Validators.required]),
      price: this.fb.control<number | null>(null, [Validators.min(0), Validators.required]),
      description: this.fb.control<string | null>(null, [
        Validators.maxLength(500),
        Validators.required,
      ]),
      category: this.fb.control<string | null>(null, [Validators.required]),
      image: this.fb.control<string | null>(null, [Validators.required]),
    });
  }

  private populateForm(product?: ProductEntity | null) {
    if (!product) {
      return;
    }

    this.form.patchValue({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    });
  }

  private buildProductData(): Partial<ProductEntity> {
    const formValue = this.form.value;
    return {
      id: this.selectedProduct()?.id ?? 0,
      title: String(formValue.title),
      price: Number(formValue.price),
      description: String(formValue.description),
      category: String(formValue.category),
      image: String(formValue.image),
    };
  }

  public submitForm() {
    if (this.form.invalid) {
      for (const control of Object.values(this.form.controls)) {
        control.markAsTouched();
        control.markAsDirty();
      }
      return;
    }

    const productData = this.buildProductData();
    this.submitProduct.emit(productData);
  }

  confirmDeleteProduct(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
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
        const currentProduct = this.selectedProduct();
        if (currentProduct) {
          this.deleteProduct.emit(currentProduct);
        }
      },
    });
  }
}
