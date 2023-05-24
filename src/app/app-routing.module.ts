import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissingComponent } from './missing/missing.component';
import { LoungeComponent } from './lounge/lounge.component';
import { AdminComponent } from './admin/admin.component';
import { EditorComponent } from './editor/editor.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { LinkpageComponent } from './linkpage/linkpage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  {path: "login", component: LoginComponent, canActivate: [LoggedInGuard]},
  {path: "register", component: RegisterComponent, canActivate: [LoggedInGuard]},
  {path: "linkpage", component: LinkpageComponent},
  {path: "unauthorized", component: UnauthorizedComponent},
  {path: "home", canActivate: [authGuard([2001,5150])], component: HomeComponent},
  {path: "editor", canActivate: [authGuard([2001])], component: EditorComponent},
  {path: "admin", canActivate: [authGuard([5150])], component: AdminComponent},
  {path: "lounge", canActivate: [authGuard([2001, 5150])], component: LoungeComponent},
  {path: "", redirectTo: '/login', pathMatch: 'full' },
  {path: "*", component: MissingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
