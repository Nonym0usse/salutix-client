import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false;
  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLogin = this.loginService.isLoggedIn;
  }

  logout(){
    this.loginService.SignOut().then(() => {
      localStorage.removeItem('user')
      this.router.navigate(['login'])
    }).catch((err) => console.log(err))
  }

}
