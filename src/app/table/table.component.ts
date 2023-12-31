import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  // Your data source
  @Input() data: any[] = [];
  @Input() className!: any;
  @Input() header: any[] = [];
  @Input() rowSelect: any[] = [
    {
      label: '10',
      value: '10',
    },
    {
      label: '20',
      value: '20',
    },
    {
      label: '30',
      value: '30',
    },
  ];
  @Input() tableHeading: string = 'Table Heading';

  //serch input
  inputText!: string;
  screenWidth!: number;

  //Pagination
  itemsPerPage: number = 10;
  currentPage: number = 1;

  defaultValue: any = [
    {
      label: '10',
      value: '10',
    },
  ];
  isClear: boolean = false;
  isReadOnly: boolean = false;
  isFocus: boolean = true;
  tableAction: string = 'none';

  //Sorting
  sortBy: string = 'id'; // Initial sort column

  // This is for data action
  secondData: any[] = [];

  constructor(private cdRef: ChangeDetectorRef, private renderer: Renderer2) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit() {
    setTimeout(() => {
      this.setTableData();
    }, 3000);
  }

  getDynamicWidth(): string {
    if (this.screenWidth >= 1024) {
      // Large screen: screenWidth - 260px
      return `calc(${this.screenWidth}px - 330px)`;
    } else {
      // Small screen: screenWidth - 20px
      return `calc(${this.screenWidth}px - 100px)`;
    }
  }

  setTableData() {
    this.secondData = this.data.map((item) => ({
      ...item,
      showAction: false,
      sortDirection: 'asc',
    }));
  }

  //To catch the seleceted row value
  setValue = (value: any) => {
    this.itemsPerPage = parseInt(value.value);
  };

  //TO diaplay data according item per page
  get displayedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.secondData.slice(startIndex, endIndex);
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

  firstPage() {
    this.currentPage = 1;
  }

  lastPage() {
    this.currentPage = this.pageNumbers.length;
  }

  get visiblePageNumbers(): number[] {
    const pageCount = Math.ceil(this.secondData.length / this.itemsPerPage);
    const maxVisiblePages = 5; // Adjust this value as needed

    if (pageCount <= maxVisiblePages) {
      return this.pageNumbers;
    }

    const middlePage = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, this.currentPage - middlePage);
    const endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
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
          return a[sortBy]?.localeCompare(b[sortBy]);
        } else {
          return b[sortBy]?.localeCompare(a[sortBy]);
        }
      }
    });
  }

  toggleSort(column: any) {
    column.sortDirection = column.sortDirection === 'asc' ? 'desc' : 'asc';

    this.sortData(this.secondData, column.sortColumn, column.sortDirection);
  }

  //search
  setSearch() {
    // this.secondData = this.data;
    // if (this.inputText != '') {
    //   const text = this.inputText;
    //   const column = this.sortOn;
    //   this.secondData = this.secondData.filter(function (object) {
    //     return object[column].toString().includes(text);
    //   });
    // } else {
    //   this.secondData = this.data;
    // }
    this.secondData = this.data;
    if (this.inputText !== '') {
      const text = this.inputText.toString().toLowerCase();
      // Convert input text to lowercase for case-insensitive search

      // Filter the data based on each column
      this.secondData = this.secondData.filter(function (object: any) {
        for (const column in object) {
          if (Object.prototype.hasOwnProperty.call(object, column)) {
            if (
              object[column] !== undefined &&
              object[column] !== null &&
              object[column]?.toString().toLowerCase().includes(text)
            ) {
              return true; // If any field matches, return true to keep the object
            }
          }
        }
        return false; // If no field matches, return false to filter out the object
      });
    }
  }

  //To View table action
  handleTableAction(row: any, showAction: boolean) {
    this.displayedData.forEach((item) => {
      item.showAction = item === row;
    });

    row.showAction = !showAction;
  }
}
