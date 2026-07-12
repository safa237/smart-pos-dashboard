import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../data-access/products.service';
import { SearchInputComponent } from '../../../../shared/components/search-input/search-input.component';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { OfflineService } from '../../../../shared/services/offline.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchInputComponent, UpdateProductComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  searchTerm = '';
  selectedCategory = 'All';
  categories = ['All', 'Burgers', 'Pizza', 'Drinks', 'Desserts'];
  products: Product[] = [];
  selectedProduct?: Product;
  showDialog = false;

  private onlineSubscription?: Subscription;
  private isSyncingQueue = false;

  constructor(
    private productsService: ProductsService,
    private offlineService: OfflineService
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    this.onlineSubscription = this.offlineService.online$.subscribe((isOnline) => {
      if (isOnline) {
        this.flushPendingUpdates();
      }
    });
  }

  ngOnDestroy(): void {
    this.onlineSubscription?.unsubscribe();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.products = products.map((product) => ({
          ...product,
          pending: false,
          syncStatus: 'synced'
        }));
      },
      error: (err) => console.error(err)
    });
  }

  get filteredProducts(): Product[] {
    const query = this.searchTerm.trim().toLowerCase();

    return this.products.filter((product) => {
      const matchesCategory =
        this.selectedCategory === 'All' ||
        product.category === this.selectedCategory;

      const matchesSearch =
        !query ||
        [product.name, product.description, product.category]
          .join(' ')
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  onSearch(value: string): void {
    this.searchTerm = value;
  }

  get productNames(): string[] {
    return this.products.map((product) => product.name);
  }

  openPriceDialog(product: Product): void {
    this.selectedProduct = product;
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  updatePrice(price: number): void {
    const product = this.selectedProduct;

    if (!product) {
      return;
    }

    const index = this.products.findIndex((item) => item.id === product.id);

    if (index === -1) {
      return;
    }

    const isOffline = !this.offlineService.isOnline();

    this.products[index] = {
      ...product,
      price,
      pending: isOffline,
      syncStatus: isOffline ? 'pending' : 'syncing'
    };

    this.products = [...this.products];

    if (isOffline) {
      this.offlineService.add({
        type: 'update-price',
        productId: product.id,
        price
      });
    } else {
      this.syncProductPrice(product.id, price);
    }

    this.closeDialog();
  }

  private syncProductPrice(productId: number, price: number, onSuccess?: () => void): void {
    const productIndex = this.products.findIndex((item) => item.id === productId);

    if (productIndex === -1) {
      onSuccess?.();
      return;
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      pending: true,
      syncStatus: 'syncing'
    };

    this.products = [...this.products];

    this.productsService.updateProductPrice(productId, price).subscribe({
      next: () => {
        this.products[productIndex] = {
          ...this.products[productIndex],
          price,
          pending: false,
          syncStatus: 'synced'
        };
        this.products = [...this.products];
        onSuccess?.();
      },
      error: (err) => {
        console.error(err);
        this.products[productIndex] = {
          ...this.products[productIndex],
          pending: true,
          syncStatus: 'pending'
        };
        this.products = [...this.products];
        onSuccess?.();
      }
    });
  }

  private flushPendingUpdates(): void {
    const queue = this.offlineService.getQueue();

    if (this.isSyncingQueue || !this.offlineService.isOnline() || queue.length === 0) {
      return;
    }

    this.isSyncingQueue = true;

    const pendingActions = [...queue];
    let completed = 0;

    pendingActions.forEach((action) => {
      this.syncProductPrice(action.productId, action.price, () => {
        completed += 1;

        if (completed === pendingActions.length) {
          this.isSyncingQueue = false;
        }
      });
    });
  }
}