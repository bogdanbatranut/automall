import { Component } from '@angular/core';
import {ToastComponent} from "../toast/toast.component";
import {JsonPipe, NgFor} from "@angular/common";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-toasts-container',
  standalone: true,
  imports: [
    ToastComponent,
    NgFor,
    JsonPipe
  ],
  templateUrl: './toasts-container.component.html',
  styleUrl: './toasts-container.component.css'
})
export class ToastsContainerComponent {

  toasts :{isErr:boolean, message:string}[] = []

  constructor(private toasterService : ToastService) {
  }

  ngOnInit(){
    this.toasterService.toastEvents.subscribe(value => {
      this.addToast(value.type, value.message)
    })
  }

  addToast(isErr:boolean, message:string){
    this.toasts.push({isErr : isErr, message : message})
  }

  removeToast(idx : number){
    if (idx > -1) {
      this.toasts.splice(idx, 1);
    }
  }

}
