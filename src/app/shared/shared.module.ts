import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';



@NgModule({
  declarations: [
    AutocompleteComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutocompleteComponent
  ]
})
export class SharedModule { }
