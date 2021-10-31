import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TokensComponent} from "./pages/tokens/tokens.component";
import {AuthGuard} from "./core/auth/auth.guard";
import {AuthComponent} from "./pages/auth/auth.component";

const routes: Routes = [
  { path: 'tokens', component: TokensComponent, canActivate: [AuthGuard]},
  { path: 'auth', component: AuthComponent},
  { path: '', redirectTo: 'tokens', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
