import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  defaultValue: any = 'Subhra Roy';
  data: any[] = ["Subhra Roy", "Sandipan Kundu","Rizwan Ansari","Sushanto Karmakar","Suman Biswas","Rahul Gandhi","Norandro Modi","Rabindranath Tagore","Netaji Subhas Chandra Bose","Binoy","Badal","Dinesh"];
  selectValue!: any;
  className: string = "";
  isReadOnly: boolean = false;
  isClear: boolean = true;

  setValue(value: any) {
    this.selectValue = value;
  }
}
