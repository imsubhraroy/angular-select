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
  tableData: any[] = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
    {
      id: 9,
    },
    {
      id: 10,
    },
    {
      id: 11,
    },
    {
      id: 12,
    },
    {
      id: 13,
    },
    {
      id: 14,
    },
    {
      id: 15,
    },
    {
      id: 16,
    },
    {
      id: 17,
    },
  ];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    // this.getStudentList();
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

  setValue(value: any) {
    this.selectValue = value;
  }
}
