import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ProductListingService } from './product-listing.service';
import { ProductEntity } from '../model/product.entity';
import { environment } from '../../../environments/environment';

describe('ProductListingService', () => {
  let service: ProductListingService;
  let httpMock: HttpTestingController;

  const mockProducts: ProductEntity[] = [
    {
      id: 1,
      title: 'Test Product 1',
      description: 'Test description 1',
      price: 29.99,
      category: 'electronics',
      image: 'https://example.com/image1.jpg',
    },
    {
      id: 2,
      title: 'Test Product 2',
      description: 'Test description 2',
      price: 49.99,
      category: 'clothing',
      image: 'https://example.com/image2.jpg',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ProductListingService],
    });
    service = TestBed.inject(ProductListingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('process', () => {
    it('should return an Observable<ProductEntity[]>', () => {
      service.process().subscribe((products) => {
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
});
