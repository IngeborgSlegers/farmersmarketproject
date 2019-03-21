import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './signup/signup.component';
import { AccountComponent } from './account/account.component';
import { MarketComponent } from './market/market.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: "", redirectTo: "/markets", pathMatch: "full" },
  // { path: "home", component: HomeComponent },
  { path: "markets", component: MarketComponent},
  { path: "auth", component: AuthComponent },
  { path: "account", component: AccountComponent },
  { path: "signup", component: SignupComponent },
  // { path: "login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
