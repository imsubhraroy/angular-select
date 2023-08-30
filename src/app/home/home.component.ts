import { Component } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  defaultValue: any = 'Subhra Roy';
  data: any[] = [
    'Subhra Roy',
    'Sandipan Kundu',
    'Rizwan Ansari',
    'Sushanto Karmakar',
    'Suman Biswas',
    'Rahul Gandhi',
    'Norandro Modi',
    'Rabindranath Tagore',
    'Netaji Subhas Chandra Bose Freedom Fighter',
    'Binoy',
    'Badal',
    'Dinesh',
  ];
  selectValue!: any;
  className: string = '';
  isReadOnly: boolean = false;
  isClear: boolean = true;
  optionLineBreack: boolean = true;
  height: string = 'h-8';
  tableData!: any;
  rowSelect: string[] = ['1','5', '15', '25'];
  isGreen: boolean = false;

  header: any[] = [
    {
      name: 'ID',
      row: 'id',
      isSort: true,
      isSearch: true,
      width: '70px'
    },
    {
      name: 'Name',
      row: 'name',
      isSort: true,
      width: '150px',
    },
    {
      name: 'Email',
      row: 'email',
      isSearch: true,
      isSort: true,
    },
    {
      name: 'Mobile',
      row: 'mobile',
      // conditionOperator: 'gt',
      // conditionValue: 89278375333,
      // className1: 'text-white bg-red-500',
      className2: 'text-white bg-blue-500'
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
  }

  ngOnInit() {
    this.getStudentList();
  }

  getStudentList() {
    console.log("y");

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
