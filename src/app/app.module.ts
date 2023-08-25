import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SelectComponent } from './select/select.component';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapCaretDownFill, bootstrapX, bootstrapCaretUpFill } from '@ng-icons/bootstrap-icons';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgIconsModule.withIcons({ bootstrapCaretDownFill, bootstrapX, bootstrapCaretUpFill })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
