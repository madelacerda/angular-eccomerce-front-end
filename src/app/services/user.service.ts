import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { Login } from "../models/jwt-response";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

const STORE_BASE_URL =
  "https://backend-eccomerce-production.up.railway.app/user/";

@Injectable({
  providedIn: "root",
})
export class userService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  getAllUser(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(`${STORE_BASE_URL}`);
  }

  public addUser(user: User) {
    this._snackBar.open("Usuario registrado exitosamente", "ok", {
      duration: 3000,
    });
    return this.httpClient.post<User>(`${STORE_BASE_URL}`, user);
  }

  public loginUser(login: Login) {
    console.log(login);
    return this.httpClient.post<any>(`${STORE_BASE_URL}login`, login);
  }

  public loggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  public loggedOut() {
    localStorage.removeItem("token");
    this.router.navigate(["/home"]);
  }
}
