import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { User } from "src/app/models/user";
import { userService } from "src/app/services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: `register.component.html`,
  styleUrls: [`register.component.css`],
})
export class RegisterComponent {
  user: User = {
    usuario: "",
    email: "",
    password: "",
  };

  constructor(private userService: userService, private router: Router) {}

  addUser(userForm: NgForm) {
    this.userService.addUser(this.user).subscribe(
      (response: User) => {
        console.log(response);
        userForm.reset();
        this.router.navigate(["/home"]);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
