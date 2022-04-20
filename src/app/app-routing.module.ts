import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ListComponent} from "./products/list/list.component";
import {AuthGuard} from "./shared/guard/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CreateComponent} from "./products/create/create.component";
import {CoupangComponent} from "./sync/coupang/coupang.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'products/list', component: ListComponent, canActivate: [AuthGuard]  },
  { path: 'products/create', component: CreateComponent, canActivate: [AuthGuard]  },
  { path: 'products/modify/:id', component: ListComponent, canActivate: [AuthGuard]  },
  { path: 'coupang/add-product', component: CoupangComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
