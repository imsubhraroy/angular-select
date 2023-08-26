import { Component, Input, ElementRef, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { __values } from 'tslib';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  constructor() {}

  //For auto focus
  @ViewChild('searchInput') firstNameField!: ElementRef<HTMLInputElement>;

  // Your data source
  @Input() data: any[] = [];
  @Input() header: any[] = [];
  @Input() rowSelect: string[] = ['10','20','50'];

  //serch input
  inputText!: string;

  //Pagination
  itemsPerPage: number = 5;
  currentPage: number = 1;

  defaultValue: string = '5';
  isClear: boolean = false;
  isReadOnly: boolean = false;
  sortOn!: string;
  isFocus: boolean = true;
  tableHeading: string = "Table Heading"

  //Sorting
  sortBy: string = 'id'; // Initial sort column
  sortDirection: 'asc' | 'desc' = 'asc';

  // This is for data action
  secondData: any[] = [];

  ngOnInit() {
    setTimeout(() => {
      this.sortOn = this.header[0].row;
      this.setTableData();
    }, 1000);
  }

  setTableData() {
    this.secondData = this.data;
  }

  //To catch the seleceted row value
  setValue = (value: any) => {
    this.itemsPerPage = parseInt(value);
  };

  //TO diaplay data according item per page
  get displayedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.secondData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // To find total page number according to data and item per page
  get pageNumbers(): number[] {
    const pageCount = Math.ceil(this.secondData.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.pageNumbers.length) {
      this.currentPage = pageNumber;
    }
  }

  backBtn() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextBtn() {
    if (
      this.currentPage < Math.ceil(this.secondData.length / this.itemsPerPage)
    ) {
      this.currentPage++;
    }
  }

  //Sort the data
  sortData(data: any[], sortBy: string, sortDirection: 'asc' | 'desc'): any[] {
    return data.sort((a, b) => {
      if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
        if (sortDirection === 'asc') {
          return a[sortBy] - b[sortBy];
        } else {
          return b[sortBy] - a[sortBy];
        }
      } else {
        if (sortDirection === 'asc') {
          return a[sortBy].localeCompare(b[sortBy]);
        } else {
          return b[sortBy].localeCompare(a[sortBy]);
        }
      }
    });
  }

  toggleSort(sortBy: any) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortData(this.secondData, sortBy, this.sortDirection);
  }

  setSearchValue(column: any) {
    this.firstNameField.nativeElement.focus();
    this.sortOn = column;
  }

  //search
  setSearch() {
    this.secondData = this.data;
    if (this.inputText != '') {
      const text = this.inputText;
      const column = this.sortOn;
      this.secondData = this.secondData.filter(function (object) {
        return object[column].toString().includes(text);
      });
    } else {
      this.secondData = this.data;
    }
  }
}
