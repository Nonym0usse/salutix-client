import {Component, OnInit} from '@angular/core';
import {LoginService} from "./services/login.service";
import {Router} from "@angular/router";
import {SearchService} from "./services/search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'salutix-client';
  isLogin: boolean = false;

  ngOnInit(): void {
    this.isLogin = this.loginService.isLoggedIn;
  }

  constructor(private loginService: LoginService) {
  }
  
}
