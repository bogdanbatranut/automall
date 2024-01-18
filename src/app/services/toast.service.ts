import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastEvents : Observable<{ type: boolean, message : string }>;
  private _toastEvents = new Subject<{type: boolean, message: string }>();

  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
  }

  showToast(type: boolean, message: string){
    this._toastEvents.next({
      type: type,
      message: message
    })
  }

}
