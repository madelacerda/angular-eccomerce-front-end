import { Component, Input, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Product } from "src/app/models/product.model";
import { StoreService } from "src/app/services/store.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-product-edit",
  templateUrl: `product-edit.component.html`,
  styles: [],
})
export class ProductEditComponent {
  productDetails: Product[] = [];
  constructor(private productService: StoreService) {}
  product = {
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  };
  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  //   this.product = data.product;
  // }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (resp: Product[]) => {
        console.log(resp);
        this.productDetails = resp;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public updateProduct(productId: any) {
    console.log("hola", productId.value);
    this.productService.editProduct(this.product).subscribe(
      (response) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
