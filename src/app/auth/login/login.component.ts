import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { filter, Subject, take, takeUntil } from "rxjs";
import { User } from "src/app/models/user";
import { userService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  user: User = {
    usuario: "",
    email: "",
    password: "",
  };

  mostrarPerfil = false;

  constructor(private userService: userService, private router: Router) {}

  userPost() {
    this.userService.loginUser(this.user).subscribe(
      (res) => {
        localStorage.setItem("token", res.token), this.router.navigate(["/"]);
      },
      (error) => console.log(error)
    );
  }
}
