import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { DataformComponent } from './dataform/dataform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GraphcontrolsComponent } from './graphcontrols/graphcontrols.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    DataformComponent,
    GraphcontrolsComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
