import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPickerTwoComponent } from './data-picker-two.component';

describe('DataPickerTwoComponent', () => {
  let component: DataPickerTwoComponent;
  let fixture: ComponentFixture<DataPickerTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataPickerTwoComponent]
    });
    fixture = TestBed.createComponent(DataPickerTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
