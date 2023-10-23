import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SelectComponent } from './select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import {
  bootstrapCaretDownFill,
  bootstrapX,
  bootstrapCaretUpFill,
  bootstrapSearch,
  bootstrapPencilSquare,
  bootstrapThreeDotsVertical,
  bootstrapChevronLeft,
  bootstrapChevronRight,
  bootstrapChevronDoubleLeft,
  bootstrapChevronDoubleRight
} from '@ng-icons/bootstrap-icons';
import { TableComponent } from './table/table.component';
import { TableTwoComponent } from './table-two/table-two.component';
import { DataPickerComponent } from './data-picker/data-picker.component';
import { DataPickerTwoComponent } from './data-picker-two/data-picker-two.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, HomeComponent, SelectComponent, TableComponent, TableTwoComponent, DataPickerComponent, DataPickerTwoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    NgIconsModule.withIcons({
      bootstrapCaretDownFill,
      bootstrapX,
      bootstrapCaretUpFill,
      bootstrapSearch,
      bootstrapPencilSquare,
      bootstrapChevronLeft,
      bootstrapThreeDotsVertical,
      bootstrapChevronRight,
      bootstrapChevronDoubleLeft,
      bootstrapChevronDoubleRight
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
