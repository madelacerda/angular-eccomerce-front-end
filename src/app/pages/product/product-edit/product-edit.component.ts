import { Component, Input, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "src/app/models/product.model";
import { StoreService } from "src/app/services/store.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-product-edit",
  templateUrl: `product-edit.component.html`,
  styles: [],
})
export class ProductEditComponent {
  productDetails: Product[] = [];
  constructor(
    private productService: StoreService,
    private dialogRef: MatDialog
  ) {}
  product = {
    _id: "",
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

  public updateProduct(productForm: NgForm) {
    console.log(productForm);
    this.productService.editProduct(this.product._id, this.product).subscribe(
      (response) => {
        console.log(response);
        this.dialogRef.closeAll();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
