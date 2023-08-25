import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  defaultValue: any = '+91';
  data: any[] = ['+91','+96','+63','+35','+695'];
  selectValue!: any;
  className: string = "";
  isReadOnly: boolean = false;
  isClear: boolean = true;

  setValue(value: any) {
    this.selectValue = value;
  }
}
