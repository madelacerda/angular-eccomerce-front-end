import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { userService } from "./services/user.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: userService, private router: Router) {}

  canActivate(): any {
    if (this.authService.loggedIn()) return true;

    this.router.navigate(["/login"]);
  }
}
