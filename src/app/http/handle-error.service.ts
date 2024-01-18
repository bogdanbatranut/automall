import { Injectable } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ToastsContainerComponent} from "../shared/toasts-container/toasts-container.component";

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(private t : ToastsContainerComponent ) { }

  public handleError(err: HttpErrorResponse) {
    let errMessage : string
    if (err.error instanceof ErrorEvent){
      errMessage = `ERROR: ${err.error.message}`
      t.addToast(true, errMessage)
    }else{
      errMessage = "Backend returned an unsuccessfull response"
      t.addToast(true, errMessage)
    }
  }
}
