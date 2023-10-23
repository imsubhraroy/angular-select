import { Component } from '@angular/core';

@Component({
  selector: 'app-data-picker-two',
  templateUrl: './data-picker-two.component.html',
  styleUrls: ['./data-picker-two.component.css']
})
export class DataPickerTwoComponent {
  currentYear: number = new Date().getFullYear();
  yearRange: number[] = [];

  constructor() {
    this.initializeYearRange();
  }

  initializeYearRange() {
    const startYear = this.currentYear - 10;
    const endYear = this.currentYear + 10;
    for (let year = startYear; year <= endYear; year++) {
      this.yearRange.push(year);
    }
  }

  previousYearRange() {
    this.currentYear -= 10;
    this.yearRange = this.generateYearRange();
  }

  nextYearRange() {
    this.currentYear += 10;
    this.yearRange = this.generateYearRange();
  }

  generateYearRange() {
    const startYear = this.currentYear - 10;
    const endYear = this.currentYear + 10;
    const range = [];
    for (let year = startYear; year <= endYear; year++) {
      range.push(year);
    }
    return range;
  }

}
