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
  tableData: any[] = [];
  rowSelect: string[] = ['5','15','25']

  header: any[] = [
    {
      name: 'ID',
      row: 'id',
      isSort: true,
      isSearch: true
    },
    {
      name: 'Name',
      row: 'name',
      isSort: true,
      width: '150px'
    },
    {
      name: 'Email',
      row: 'email',
      isSearch: true,
      isSort: true
    },
    {
      name: 'Mobile',
      row: 'mobile',
    },
    {
      type: 'action',
      name: 'Action',
      row: '<div class="text-blue-500">Edit</div><div class="text-red-500">Delete</div><div class="text-red-500">View</div>',
      action: this.handleClick,
      column: 'id',
      showAction: false
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

  handleClick(row: string, id: any){
    console.log(id);

  }

  actionHandle: any = this.handleClick




  handleEdit(id: number){
    console.log("Delete " , id);

  }
  handleDelete(id: number){
    console.log("Delete " , id);

  }

  setValue = (value: any) => {
    this.selectValue = value;;
  };
}
