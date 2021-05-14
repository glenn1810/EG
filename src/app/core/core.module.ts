import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule
  ],
  exports: [
   
  ],
  providers: [
    UserService
  ]
})
export class CoreModule { }
