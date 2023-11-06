import { Component } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  defaultValue: any = [
    {
      label: 'Subhra Roy',
      value: 1,
    },
  ];

  data: any[] = [
    {
      label: 'Subhra',
      value: 1,
    },
    {
      label: 'Sushanto',
      value: 1,
    },
    {
      label: 'Rizwan',
      value: 1,
    },
    {
      label: 'Sandipan',
      value: 1,
    },
  ];

  selectValue!: any;
  className: string = '';
  isReadOnly: boolean = false;
  isClear: boolean = true;
  optionLineBreack: boolean = true;
  height: string = 'h-8';
  tableData: any = [
    {
      id: 1,
      name: 'subh',
      email: 'khhk',
      mobile: 7895366,
      status: 0,
    },
    {
      id: 1,
      name: 'subh',
      email: null,
      mobile: 7895366,
      status: 1,
    },
    {
      id: 1,
      name: 'subh',
      email: 'khhk',
      mobile: 5566,
      status: 0,
    },
    {
      id: 1,
      name: 'subh',
      email: 'khhk',
      mobile: 7895366,
      status: 0,
    },
  ];
  rowSelect: any[] = [
    {
      label: '1',
      value: 1,
    },
  ];
  isGreen: boolean = false;

  tableColumns = [
    {
      name: '#',
      selector: (row: any) => row.id,
      isSort: true,
    },
    {
      name: 'Status',
      selector: (row: any) => (row.status === 1 ? 'Active' : 'Deactive'),
      classCondition: (row: any) =>
        row.status === 1 ? 'bg-red-500 text-white' : 'bg-blue-500 text-blact',
    },
  ];

  header: any[] = [
    {
      name: '#',
      selector: (row: any) => row.id,
      isSort: true,
      sortColumn: 'id',
      width: '40px'
    },
    {
      name: 'Status',
      selector: (row: any) => (row.status === 1 ? 'Active' : 'Deactive'),
      classCondition: (row: any) =>
        row.status === 1 ? 'bg-red-500 text-white' : 'bg-blue-500 text-blact',
    },
    {
      type: 'action',
      name: 'Action',
      actions: [
        {
          label: 'Edit',
          class: 'text-blue-500 border-b-2 border-blue-500',
          action: this.handleEdit.bind(this),
          row: 'id',
          isIcon: true,
          icon: 'bootstrapThreeDotsVertical',
        },
        {
          label: 'Delete',
          class: 'text-red-500 border-b-2 border-red-500',
          action: this.handleDelete.bind(this),
          row: 'id',
        },
        {
          label: 'View',
          class: 'text-green-500 border-b-2 border-green-500',
          action: this.handleView.bind(this),
          row: 'id',
        },
      ],
    },
  ];

  constructor(private studentService: StudentService) {
    // this.getStudentList();
    if (this.tableData && this.tableData.length) {
      // Update this.tableDataData state with mapped values
      const updatedthistableDataData = this.tableData?.length
        ? this.tableData?.map(function (currentValue: any, Index: number) {
            return { ...currentValue, ...{ id: Index + 1 } };
          })
        : '';
      // Set updatedCategoryData to categoryData state
      this.tableData = updatedthistableDataData;
    } else {
      // Set an empty array to categoryData state
      this.tableData = [];
    }
  }

  ngOnInit() {
    // this.getStudentList();/
  }

  getStudentList() {
    this.studentService.getStudentList().subscribe({
      next: (res: any) => {
        this.tableData = res.data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  setValue = (value: any) => {
    console.log(value);

    this.selectValue = value;
  };

  handleEdit(id: any) {
    console.log('Edit ', id);
  }
  handleView(id: any) {
    console.log('View ', id);
  }
  handleDelete(id: any) {
    console.log('Delete ', id);
  }
}
