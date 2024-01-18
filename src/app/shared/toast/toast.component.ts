import {Component, EventEmitter, HostBinding, Input, Output, Renderer2} from '@angular/core';
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgIf,
    CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @Input() isErr = false
  @Input() message = ""
  @Input() index = -1

  @Output() removeItem = new EventEmitter<number>();

  constructor() {
  }

  showToast(message : string, type :string) {
    this.isErr = false
  }

  closeToast(index : number){
    this.removeItem.emit(index)
  }

}
