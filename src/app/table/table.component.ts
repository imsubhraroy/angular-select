import { Component, Input } from '@angular/core';
import { __values } from 'tslib';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {

  constructor() {}

  // Your data source
  @Input() data: any[] = [];

  secondData: any[] = [];

  ngOnInit(){
    this.secondData = this.data;
  }

  //serch input
  inputText!: string

  //Pagination
  itemsPerPage: number = 5;
  currentPage: number = 1;

  //For row Select
  selectData: any[] = ['1', '10', '20', '30', '40', '50', '60', '80', '100'];
  defaultValue: string = '5';
  isClear: boolean = false;
  isReadOnly: boolean = false;

  //Sorting
  sortBy: string = 'id'; // Initial sort column
  sortDirection: 'asc' | 'desc' = 'asc';

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
    if (this.currentPage < Math.ceil(this.secondData.length / this.itemsPerPage)) {
      this.currentPage++;
    }
  }

  //Sort the data
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
    this.sortData(this.secondData, this.sortBy, this.sortDirection);
  }

  //search
  setSearch(){
    console.log(this.inputText);

    if(this.inputText != ''){
      const text = this.inputText;
      this.secondData = this.secondData.filter(function (object){
        return object.id.toString().includes(text);
      })
    } else{
      this.secondData = this.data;
    }

  }

}
