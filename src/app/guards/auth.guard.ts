import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthInterceptor } from "../interceptors/auth.interceptor";
import jwt_decode from "jwt-decode";
import { inject } from "@angular/core";

export const authGuard = (allowedRoles: any): CanActivateFn => {
  //console.log('authGuard#canActivate called');

  return (ars: ActivatedRouteSnapshot, rss: RouterStateSnapshot) => {
    const route = inject(Router);
  
    const decoded: any = AuthInterceptor.accessToken
          ? jwt_decode(AuthInterceptor.accessToken)
          : undefined;
  
    const roles = decoded?.UserInfo.roles || [];
  
    if(roles.find((role: any) => allowedRoles?.includes(role))) {
      return true;
    } else {
      route.navigate(['/unauthorized']);
      return false;
    }
  }
  
  
};