import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenteditableDirective } from './contenteditable.directive';



@NgModule({
  declarations: [
    ContenteditableDirective,
  ],
  exports: [
    ContenteditableDirective,
  ],
  imports: [
    CommonModule,
  ],
})
export class ContenteditableModule { }
