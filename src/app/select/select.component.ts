import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  @Input() defaultValue: any;
  @Input() data: any[] = [];
  @Input() className!: string;
  @Input() isReadOnly: boolean = false;
  @Input() isClear: boolean = true;
  @Input() height!: string;
  @Input() labelText!: string;
  @Input() mandatory: boolean = false;
  @Input() optionLineBreack: boolean = true;
  @Input() isDisabled: boolean = false;
  @Input() setValue!: (parameter: any) => void;
  @ViewChild('targetDiv') targetDiv!: ElementRef;
  @ViewChild('containerDiv') containerDiv!: ElementRef;

  isDropDown: boolean = false;
  searchVisible = false;
  inputText = '';
  inputValue!: string;

  ngOnInit() {
    if (this.defaultValue !== undefined) {
      this.inputValue = this.defaultValue[0].label;
      // this.setValue(this.defaultValue);
    }
  }

  //To close the dic outside click
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (
      !this.containerDiv.nativeElement.contains(event.target) &&
      this.targetDiv.nativeElement.style.display !== 'none'
    ) {
      this.searchVisible = false;
      this.isDropDown = this.searchVisible;
    }
  }

  setSearch() {
    this.inputText = this.inputValue;
    this.searchVisible = true;
  }

  hasFilteredItems() {
    return this.data.some((item: any) =>
      item.label?.toUpperCase().includes(this.inputText.toUpperCase())
    );
  }

  show() {
    this.searchVisible = !this.searchVisible;
    this.isDropDown = !this.isDropDown;
  }

  clearValue() {
    this.inputText = '';
    this.inputValue = '';
    this.isDropDown = !this.isDropDown;
    this.searchVisible = !this.searchVisible;
  }

  setData(value: any) {
    this.inputValue = value.label.trim();
    this.inputText = '';
    this.setValue(value);
    this.searchVisible = false;
    this.isDropDown = false;
  }
}
