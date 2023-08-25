import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  defaultValue: any = '+91';
  data: any[] = ['+91','+38','+95','+59'];
  selectValue!: any;
  className: string = ""
  isReadOnly: boolean = true;

  setValue(value: any) {
    this.selectValue = value;
  }
}
