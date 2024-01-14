import { Component } from '@angular/core';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgIf],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  show : boolean = false
  toastMessage : string = "no response yet"

  showToast(message : string) {
    this.toastMessage = message
    this.show = true
  }

  closeToast(){
    this.show = false
  }

}
