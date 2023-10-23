import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTwoComponent } from './table-two.component';

describe('TableTwoComponent', () => {
  let component: TableTwoComponent;
  let fixture: ComponentFixture<TableTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableTwoComponent]
    });
    fixture = TestBed.createComponent(TableTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
