import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";

const STORE_BASE_URL =
  "https://backend-eccomerce-production.up.railway.app/product/";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${STORE_BASE_URL}`);
  }

  public addProduct(product: Product) {
    return this.httpClient.post<Product>(`${STORE_BASE_URL}`, product);
  }

  public editProduct(productId: any, body: any) {
    return this.httpClient.put(`${STORE_BASE_URL}` + productId, body);
  }

  public deleteProduct(productId: any) {
    return this.httpClient.delete(`${STORE_BASE_URL}` + productId, productId);
  }

  public getProductDetailsById(id: any) {
    return this.httpClient.get<Product>(`${STORE_BASE_URL}/id/` + id);
  }
}
