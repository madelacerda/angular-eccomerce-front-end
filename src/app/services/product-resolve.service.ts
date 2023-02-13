import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { Product } from "../models/product.model";
import { StoreService } from "./store.service";

@Injectable({
  providedIn: "root",
})
export class ProductResolveService implements Resolve<Product> {
  constructor(private productService: StoreService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    const id = route.paramMap.get("productId");

    if (id) {
      return this.productService.getProductDetailsById(id);
      //llamar detalles del producto
    } else {
      //devolver producto vacio
      return of(this.getProductDetails());
    }
  }

  getProductDetails() {
    return {
      title: "",
      price: 0,
      description: "",
      image: "",
      category: "",
    };
  }
}
