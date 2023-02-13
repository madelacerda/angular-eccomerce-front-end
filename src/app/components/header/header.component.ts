import { Component, Input } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";
import { Router } from "@angular/router";
import { userService } from "src/app/services/user.service";
import { AuthGuard } from "../../auth.guard";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  constructor(
    private cartService: CartService,
    private router: Router,
    private AuthGuard: AuthGuard,
    private userservice: userService
  ) {}

  ngOnInit() {}

  getGuard() {
    let token = localStorage.getItem("token");
    let activate: boolean = false;

    if (token) {
      activate = true;
    }
    return activate;
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  UserService = this.userservice;
  logOut() {
    this.userservice.loggedOut();
  }
}
