import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-product-add",
  templateUrl: `product-add.component.html`,
  styleUrls: [`product-add.component.css`],
})
export class ProductAddComponent {
  product: Product = {
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "",
  };

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data["product"];
  }

  constructor(
    private productService: StoreService,
    private activatedRoute: ActivatedRoute
  ) {}

  addProduct(productForm: NgForm) {
    this.productService.addProduct(this.product).subscribe(
      (response: Product) => {
        console.log(response);
        productForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
