import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { CartComponent } from "./pages/cart/cart.component";
import { HomeComponent } from "./pages/home/home.component";
import { AdministradorProductosComponent } from "./pages/product/administrador-productos/administrador-productos.component";
import { ProductAddComponent } from "./pages/product/product-add/product-add.component";
import { ProductListComponentComponent } from "./pages/product/product-list.component/product-list.component.component";
import { ProductResolveService } from "./services/product-resolve.service";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "productos",
    component: ProductListComponentComponent,
  },
  {
    path: "agregar-producto",
    component: ProductAddComponent,
    resolve: {
      product: ProductResolveService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: "listado-producto",
    component: AdministradorProductosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
