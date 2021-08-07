import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragColumnComponent } from './drag-column.component';


@NgModule({
  declarations: [
    DragColumnComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DragColumnComponent,
  ],
})
export class DragColumnModule {
}
