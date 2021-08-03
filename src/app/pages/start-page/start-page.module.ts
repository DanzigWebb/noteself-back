import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartPageComponent } from './start-page.component';
import { MatListModule } from "@angular/material/list";



@NgModule({
  declarations: [StartPageComponent],
  imports: [
    CommonModule,
    MatListModule,
  ],
})
export class StartPageModule { }
