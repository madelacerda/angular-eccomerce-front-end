import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";

@Component({
  selector: "app-cart",
  templateUrl: `./cart.component.html`,
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        nombre: "Anillo de Oro",
        precio: 3000,
        cantidad: 1,
        id: 1,
      },
      {
        product: "https://via.placeholder.com/150",
        nombre: "Collar de Oro",
        precio: 5000,
        cantidad: 2,
        id: 2,
      },
    ],
  };
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    "product",
    "nombre",
    "precio",
    "cantidad",
    "total",
    "action",
  ];

  ngOnInit(): void {
    this.dataSource = this.cart.items;
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.precio * item.cantidad)
      .reduce((prev, current) => prev + current, 0);
  }
}
