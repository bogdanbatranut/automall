import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {JsonPipe, NgClass, NgFor} from "@angular/common";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    JsonPipe
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  @Input() pag = ""

  @Input() selectedPage : number = 1
  @Input() totalPages : number = 1

  @Output() selectedPageEvent = new EventEmitter<number>();
  pages : number[] = []


  prevPageEnabled : boolean = false
  nextPageEnabled : boolean = true

  constructor() {
    if (this.selectedPage == this.totalPages) {
      this.nextPageEnabled = false
    }
    if (this.selectedPage == 1) {
      this.prevPageEnabled = false
    }
    this.initPagesArr()
  }

  ngOnChanges(changes : SimpleChanges ){
    this.selectedPage = changes['selectedPage'].currentValue
    this.totalPages = changes['totalPages'].currentValue
    this.initPagesArr()
    this.selectedPageEvent.emit(this.selectedPage)
  }


  pageSelected(page : number){
    this.selectedPage = page;
    this.initPagesArr()
    this.selectedPageEvent.emit(page)
  }

  toLastPage() {
    this.selectedPage = this.totalPages

    this.initPagesArr()
    this.selectedPageEvent.emit(this.selectedPage)
  }

  prevPageClicked(){
    this.selectedPage = this.selectedPage -1
    this.initPagesArr()
    this.selectedPageEvent.emit(this.selectedPage)
  }

  nextPageClicked(){
    this.selectedPage = this.selectedPage + 1
    this.initPagesArr()
    this.selectedPageEvent.emit(this.selectedPage)
  }

  initPagesArr(){
    if (this.totalPages < 3){
      if (this.selectedPage == 1){
        this.prevPageEnabled = false
        return
      }else{
        this.nextPageEnabled = false
        this.pages = [this.selectedPage, this.selectedPage+1, this.selectedPage+2]
      }
    }else{
      if (this.selectedPage < this.totalPages && this.selectedPage > 1){
        this.nextPageEnabled = true
        this.prevPageEnabled = true
        this.pages = [this.selectedPage-1, this.selectedPage, this.selectedPage+1]
        return
      }
      if (this.selectedPage == 1) {
        this.prevPageEnabled = false
        this.nextPageEnabled = true
        this.pages = [this.selectedPage, this.selectedPage+1, this.selectedPage+2]
      }
      if (this.selectedPage == this.totalPages) {
        this.prevPageEnabled = true
        this.nextPageEnabled = false
        this.pages = [this.selectedPage-2, this.selectedPage-1, this.selectedPage]
      }

    }

  }
}
