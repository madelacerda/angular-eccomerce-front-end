import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { StoreService } from "src/app/services/store.service";
import { ProductEditComponent } from "../product-edit/product-edit.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-administrador-productos",
  templateUrl: `administrador-productos.component.html`,
  styleUrls: [`administrador-productos.component.css`],
})
export class AdministradorProductosComponent {
  productDetails: Product[] = [];
  displayedColumns: string[] = [
    "Id",
    "Titulo",
    "Precio",
    "Categoria",
    "Descripcion",
    "URL de la Imagen",
    "Editar",
    "Eliminar",
  ];

  constructor(
    private productService: StoreService,
    private router: Router,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (resp: Product[]) => {
        //  console.log(resp);
        this.productDetails = resp;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public deleteProduct(productId: any) {
    console.log(productId);
    this.productService.deleteProduct(productId).subscribe(
      (resp: any) => {
        console.log(resp);
        this.getAllProducts();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public editProductDetails(data: any) {
    console.log(data);
    const modal = this.dialogRef.open(ProductEditComponent);
    modal.componentInstance.product = data;
  }

  openDialog() {
    this.dialogRef.closeAll();
    this.dialogRef.open(ProductEditComponent);
  }
}
