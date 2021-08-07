import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartPageComponent } from './start-page.component';
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { DragColumnModule } from "@components/drag-column/drag-column.module";
import { EditorAreaComponent } from './editor-area/editor-area.component';



@NgModule({
  declarations: [StartPageComponent, EditorAreaComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    DragColumnModule,
  ]
})
export class StartPageModule { }
