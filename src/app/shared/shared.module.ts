import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DropdownDirective
  ],
  exports: [
    CommonModule, // angular CLI auto imports this one on creation. just listing here as an example of exporting 'shared' modules
    DropdownDirective
  ]
})
export class SharedModule { }
