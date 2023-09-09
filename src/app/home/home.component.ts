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
    }
  ];

  data: any[] = [
    {
      label: 'Subhra',
      value: 1
    }
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
  rowSelect: string[] = ['1', '5', '15', '25'];
  isGreen: boolean = false;

  header: any[] = [
    {
      name: 'ID',
      row: 'id',
      isSort: true,
      isSearch: true,
      width: '70px',
    },
    {
      name: 'Name',
      row: 'name',
      isSort: true,
      width: '150px',
    },
    {
      name: 'Status',
      row: 'status',
      conditionOperator: 'eq',
      conditionValue: 1,
      onTrue: "Active",
      onFalse: "Deactive",
      width: '150px',
    },
    {
      name: 'Email',
      row: 'email',
      conditionOperator: 'eq',
      conditionValue: null,
      onTrue: "-",
      onFalse: 'row',
      isSort: true,
    },
    {
      name: 'Mobile',
      row: 'mobile',
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
    this.getStudentList();
    if (this.tableData && this.tableData.length) {
      // Update this.tableDataData state with mapped values
      const updatedthistableDataData = this.tableData?.length
        ? this.tableData?.map(function (currentValue : any, Index: number) {
          return { ...currentValue, ...{ id: Index + 1 } };
        })
        : "";
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
