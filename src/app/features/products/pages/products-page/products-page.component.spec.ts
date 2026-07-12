import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ProductsPageComponent } from './products-page.component';
import { ProductsService } from '../../data-access/products.service';
import { OfflineService } from '../../../../shared/services/offline.service';
import { Product } from '../../models/product.model';

declare const describe: any;
declare const beforeEach: any;
declare const it: any;
declare const expect: any;
declare const jasmine: any;

class MockProductsService {
  getProducts = jasmine.createSpy('getProducts').and.returnValue(of([{ 
    id: 1,
    name: 'Burger',
    category: 'Burgers',
    price: 10,
    rating: 4.8,
    description: 'Classic burger',
    badge: 'Best seller',
    stock: 12,
    icon: 'fa-solid fa-burger'
  }]));

  updateProductPrice = jasmine.createSpy('updateProductPrice').and.returnValue(of({}));
}

class MockOfflineService {
  online$ = new BehaviorSubject<boolean>(false);
  isOnline = jasmine.createSpy('isOnline').and.returnValue(false);
  add = jasmine.createSpy('add');
  getQueue = jasmine.createSpy('getQueue').and.returnValue([]);
}

describe('ProductsPageComponent', () => {
  let component: ProductsPageComponent;
  let fixture: ComponentFixture<ProductsPageComponent>;
  let offlineService: MockOfflineService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsPageComponent],
      providers: [
        { provide: ProductsService, useClass: MockProductsService },
        { provide: OfflineService, useClass: MockOfflineService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsPageComponent);
    component = fixture.componentInstance;
    offlineService = TestBed.inject(OfflineService) as unknown as MockOfflineService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list products by default', () => {
    expect(component.filteredProducts.length).toBeGreaterThan(0);
  });

  it('should filter by selected category', () => {
    component.selectCategory('Pizza');
    expect(component.filteredProducts.every(product => product.category === 'Pizza')).toBeTrue();
  });

  it('should queue a price update when offline', () => {
    const product: Product = {
      id: 1,
      name: 'Burger',
      category: 'Burgers',
      price: 10,
      rating: 4.8,
      description: 'Classic burger',
      badge: 'Best seller',
      stock: 12,
      icon: 'fa-solid fa-burger'
    };

    component.products = [product];
    component.selectedProduct = product;

    component.updatePrice(12);

    expect(component.products[0].price).toBe(12);
    expect(component.products[0].pending).toBeTrue();
    expect(offlineService.add).toHaveBeenCalledWith(jasmine.objectContaining({ productId: 1, price: 12 }));
  });
});
