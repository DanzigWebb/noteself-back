import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { HeaderComponent } from "@core/template/components/header/header.component";
import { NavbarComponent } from "@core/template/components/navbar/navbar.component";
import { RouterModule } from "@angular/router";
import { MatListModule } from "@angular/material/list";
import { DragColumnModule } from "@components/drag-column/drag-column.module";
import { NotebarComponent } from './components/notebar/notebar.component';
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    NavbarComponent,
    NotebarComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatListModule,
    DragColumnModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  exports: [
    MainComponent,
    HeaderComponent,
  ],
})
export class TemplateModule {
}
