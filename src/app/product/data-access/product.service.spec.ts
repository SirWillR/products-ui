import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { ProductEntity } from '../model/product.entity';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: ProductEntity[] = [
    {
      id: 1,
      title: 'Test Product 1',
      description: 'Test description 1',
      price: 29.99,
      category: 'electronics',
      image: 'https://example.com/image1.jpg',
      rating: { rate: 4.5, count: 10 },
    },
    {
      id: 2,
      title: 'Test Product 2',
      description: 'Test description 2',
      price: 49.99,
      category: 'clothing',
      image: 'https://example.com/image2.jpg',
      rating: { rate: 3.8, count: 5 },
    },
  ];

  const mockProductDTO = {
    title: 'New Product',
    description: 'New description',
    price: 19.99,
    category: 'electronics',
    image: 'https://example.com/new-image.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return an Observable<ProductEntity[]>', () => {
      service.getAll().subscribe((products: ProductEntity[]) => {
        expect(products).toEqual(mockProducts);
        expect(products.length).toBe(2);
        expect(products[0].id).toBe(1);
        expect(products[0].title).toBe('Test Product 1');
        expect(products[1].id).toBe(2);
        expect(products[1].title).toBe('Test Product 2');
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/products`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProducts);
    });
  });

  describe('getById', () => {
    it('should return an Observable<ProductEntity>', () => {
      const productId = 1;
      const expectedProduct = mockProducts[0];

      service.getById(productId).subscribe((product: ProductEntity) => {
        expect(product).toEqual(expectedProduct);
        expect(product.id).toBe(productId);
        expect(product.title).toBe('Test Product 1');
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/products/${productId}`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedProduct);
    });
  });

  describe('create', () => {
    it('should create a new product and return Observable<ProductEntity>', () => {
      const newProduct = {
        id: 3,
        title: 'New Product',
        description: 'New description',
        price: 19.99,
        category: 'electronics',
        image: 'https://example.com/new-image.jpg',
        rating: { rate: 0, count: 0 },
      };

      service.create(mockProductDTO).subscribe((product: ProductEntity) => {
        expect(product).toEqual(newProduct);
        expect(product.id).toBe(3);
        expect(product.title).toBe('New Product');
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/products`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockProductDTO);
      req.flush(newProduct);
    });
  });

  describe('update', () => {
    it('should update a product and return Observable<ProductEntity>', () => {
      const productId = 1;
      const updatedProduct = {
        ...mockProducts[0],
        title: 'Updated Product',
        price: 39.99,
      };

      service.update(productId, mockProductDTO).subscribe((product: ProductEntity) => {
        expect(product).toEqual(updatedProduct);
        expect(product.id).toBe(productId);
        expect(product.title).toBe('Updated Product');
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/products/${productId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockProductDTO);
      req.flush(updatedProduct);
    });
  });

  describe('delete', () => {
    it('should delete a product and return Observable<void>', () => {
      const productId = 1;

      service.delete(productId).subscribe((response) => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/products/${productId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
