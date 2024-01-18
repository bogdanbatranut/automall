import { HttpInterceptorFn } from '@angular/common/http';
import {catchError, throwError} from "rxjs";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log("IN functional interceptor")
  // return next(req);
  return next(req).pipe(
    catchError(
      (error) => {
        // console.log("Error IN functional interceptor: ")
        return throwError(() => error)
      }
    )
  )
};
