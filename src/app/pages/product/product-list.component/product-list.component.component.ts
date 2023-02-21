import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { Subscription, timeout } from "rxjs";
import { StoreService } from "src/app/services/store.service";
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 355, 4: 350 };

@Component({
  selector: "app-product-list.component",
  templateUrl: `product-list.component.component.html`,
  styles: [],
})
export class ProductListComponentComponent {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = "desc";
  count = "1";
  productsSubscription: Subscription | undefined;
  productStorage: Array<Product> | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts()
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }
  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      _id: product._id,
    });
  }

  reloadArray() {
    this.getProducts();
  }
  async onItemsCountChange(newCount: number) {
    this.count = newCount.toString();
    this.getProducts;
    this.products = this.products?.slice(0, newCount);
    if (newCount != this.products?.length) {
      this.reloadArray();
      setTimeout(() => {
        this.products = this.products?.slice(0, newCount);
      }, 350);
    }
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts;
    const productos = this.products;
    newSort === "desc"
      ? productos?.sort((a, b) => a.price - b.price)
      : productos?.sort((b, a) => a.price - b.price);
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
