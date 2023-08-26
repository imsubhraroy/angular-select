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
        "id": 2,
        "name": "Bitan Kundu",
        "mobile": 9564430901,
        "dob": "2023-08-19",
        "email": "bita@gmail.com",
        "image": null,
        "document": null,
        "created_at": "2023-08-19T14:12:46.000000Z",
        "updated_at": "2023-08-19T14:12:46.000000Z"
    },
    {
        "id": 6,
        "name": "hhjbd",
        "mobile": 5589998,
        "dob": "2023-08-19",
        "email": "bbbhjbj@gmail.com",
        "image": null,
        "document": null,
        "created_at": null,
        "updated_at": null
    },
    {
        "id": 12,
        "name": "hhjbd",
        "mobile": 5589798,
        "dob": "2023-08-19",
        "email": "bbbhjbj1@gmail.com",
        "image": null,
        "document": null,
        "created_at": null,
        "updated_at": null
    },
    {
        "id": 13,
        "name": "hhjbd",
        "mobile": 55897981,
        "dob": "2023-08-19",
        "email": "bbbhjbj41@gmail.com",
        "image": null,
        "document": null,
        "created_at": null,
        "updated_at": null
    },
    {
        "id": 14,
        "name": "hhjbd",
        "mobile": 558979812,
        "dob": "2023-08-19",
        "email": "bbbhjbj412@gmail.com",
        "image": null,
        "document": null,
        "created_at": null,
        "updated_at": null
    },
    {
        "id": 15,
        "name": "hhjbd",
        "mobile": 5589798123,
        "dob": "2023-08-19",
        "email": "bbbhjbj4123@gmail.com",
        "image": null,
        "document": null,
        "created_at": null,
        "updated_at": null
    },
    {
        "id": 16,
        "name": "hhjbd",
        "mobile": 55899985,
        "dob": "2023-08-19",
        "email": "bbbhjbj5@gmail.com",
        "image": null,
        "document": null,
        "created_at": null,
        "updated_at": null
    },
    {
        "id": 3,
        "name": "rizwan Ansari bjkkkkkkkkkkkkkkkkkkkkkkkkkk",
        "mobile": 854213691236,
        "dob": "2023-08-19",
        "email": "rizwan@gmail.com",
        "image": null,
        "document": null,
        "created_at": "2023-08-19T14:13:49.000000Z",
        "updated_at": "2023-08-19T14:13:49.000000Z"
    },
    {
        "id": 5,
        "name": "Sandipan",
        "mobile": 8952369899,
        "dob": "2023-08-19",
        "email": "sandipan@email.com",
        "image": null,
        "document": null,
        "created_at": "2023-08-26T06:35:33.000000Z",
        "updated_at": "2023-08-26T06:35:33.000000Z"
    },
    {
        "id": 1,
        "name": "Subhra Roy",
        "mobile": 8927837533,
        "dob": "2023-08-19",
        "email": "subhraroy@gmail.com",
        "image": null,
        "document": null,
        "created_at": "2023-08-19T13:42:29.000000Z",
        "updated_at": "2023-08-19T13:42:29.000000Z"
    }
];

  header: any[] = [
    {
      name: 'ID',
      row: 'id',
      width: 'w-10',
      isSort: true,
    },
    {
      name: 'Name',
      row: 'name',
      width: 'w-20'
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

  setValue = (value: any) => {
    this.selectValue = value;;
  };
}
