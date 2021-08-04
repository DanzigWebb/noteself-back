import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartPageComponent } from './start-page.component';
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";



@NgModule({
  declarations: [StartPageComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
  ],
})
export class StartPageModule { }
