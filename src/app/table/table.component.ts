import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  links!: HTMLCollectionOf<Element>;
  currentValue: number = 1;

  constructor() {}

  ngAfterViewInit() {
    this.links = document.getElementsByClassName("link");
  }

  activeLink(event: Event) {
    for (const l of Array.from(this.links)) {
      l.classList.remove("active");
    }
    (event.target as Element).classList.add("active");
    this.currentValue = Number((event.target as HTMLInputElement).getAttribute('value'));
  }

  backBtn() {
    if (this.currentValue > 1) {
      for (const l of Array.from(this.links)) {
        l.classList.remove("active");
      }
      this.currentValue--;
      this.links[this.currentValue - 1].classList.add("active");
    }
  }

  nextBtn() {
    if (this.currentValue < 6) {
      for (const l of Array.from(this.links)) {
        l.classList.remove("active");
      }
      this.currentValue++;
      this.links[this.currentValue - 1].classList.add("active");
    }
  }

}
