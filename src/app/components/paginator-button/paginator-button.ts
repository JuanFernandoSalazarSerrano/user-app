import { Component, Input } from '@angular/core';

@Component({
  selector: 'paginator-button',
  imports: [],
  templateUrl: './paginator-button.html',
})
export class PaginatorButton {

  @Input() pageNumber!: Number;

}
