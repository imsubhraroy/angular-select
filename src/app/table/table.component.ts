import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  // Your data source
  @Input() data: any[] = [];

  //Pagination
  itemsPerPage: number = 5;
  currentPage: number = 1;

  selectData: any[] = ['5','10', '20', '30', '40', '50', '60', '80', '100'];
  defaultValue: string = '5';
  isClear: boolean = false;
  isReadOnly: boolean = false;


  //Sorting
  sortBy: string = 'id'; // Initial sort column
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor() {}


  setValue =(value: any)=> {
    this.itemsPerPage = parseInt(value);
  }

  get displayedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pageCount = Math.ceil(this.data.length / this.itemsPerPage);
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
    if (this.currentPage < Math.ceil(this.data.length / this.itemsPerPage)) {
      this.currentPage++;
    }
  }

  sortData(data: any[], sortBy: string, sortDirection: 'asc' | 'desc'): any[] {
    return data.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });
  }

  toggleSort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortData(this.data, this.sortBy, this.sortDirection);
  }
}
