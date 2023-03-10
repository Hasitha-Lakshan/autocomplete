import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AutocompleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AutocompleteComponent
  ]
})
export class SharedModule { }
