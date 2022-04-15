import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string | undefined;
  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(email: string, password: string){
    this.loginService.SignIn(email, password).then(() => {
      this.router.navigate(['dashboard']);
    }).catch((err) => {
      this.error = err;
    });
  }
}
