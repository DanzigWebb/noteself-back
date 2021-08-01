import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageModule } from "@pages/login-page/login-page.module";
import { StateModule } from "@state/state.module";
import { HttpClientModule } from "@angular/common/http";
import { TemplateModule } from "@core/template/template.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Core
    TemplateModule,
    // Pages
    LoginPageModule,

    // State
    StateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
