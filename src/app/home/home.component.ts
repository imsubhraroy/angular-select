import {  Component } from '@angular/core';
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
  tableData: any[] = [
    {
      id: 1,
      name: "Subhra Roy"
    },
    {
      id: 7412,
      name: "Subhra Roy"
    },
    {
      id: 7812369,
      name: "Subhra Roy"
    },
    {
      id: 712369,
      name: "Subhra Roy"
    },
    {
      id: 7536,
      name: "Subhra Roy"
    },
    {
      id: 20,
      name: "Subhra Roy"
    },
    {
      id: 468,
      name: "Subhra Roy"
    },
    {
      id: 46,
      name: "Subhra Roy"
    },
    {
      id: 14,
      name: "Subhra Roy"
    },
  ];

  header: any[] = [
    {
      name: 'ID',
      row: 'id',
      width: 'w-16',
      isSort: true,
    },
    {
      name: 'Name',
      row: 'name',
      width: 'w-44'
    },
    {
      name: 'Email',
      row: 'email'
    },
    {
      name: 'Mobile',
      row: 'mobile',
      isSort: true
    },
  ];

  constructor(
    private studentService: StudentService,
  ) {}

  ngOnInit() {
    this.getStudentList();
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
    this.selectValue = value;;
  };
}
