import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbsComponent } from './components/bread-crumbs/bread-crumbs.component';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    BreadCrumbsComponent
  ],
  imports: [
    BrowserModule,
    CoreModule
  ],
  exports: [
    BreadCrumbsComponent
  ]
})
export class BreadCrumbsModule { }
