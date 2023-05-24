import { AuthInterceptor } from "../interceptors/auth.interceptor";
import jwt_decode from "jwt-decode";

export const LoggedInGuard = (): Boolean => {

  const decoded: any = AuthInterceptor.accessToken
    ? jwt_decode(AuthInterceptor.accessToken)
    : undefined;

  if (decoded) {
    return false;
  } else {
    return true;
  }

};