import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ListComponent} from "./products/list/list.component";
import {AuthGuard} from "./shared/guard/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CreateComponent} from "./products/create/create.component";
import {CoupangComponent} from "./sync/coupang/coupang.component";
import {SecureInnerPagesGuard} from "./shared/secure-inner-pages.guard";
import {ModifyComponent} from "./products/modify/modify.component";
import {SettingsComponent} from "./settings/settings.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'products/list', component: ListComponent, canActivate: [AuthGuard]  },
  { path: 'products/create', component: CreateComponent, canActivate: [AuthGuard]  },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]  },
  { path: 'products/modify/:id', component: ModifyComponent, canActivate: [AuthGuard]  },
  { path: 'products/coupang/sync', component: CoupangComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
