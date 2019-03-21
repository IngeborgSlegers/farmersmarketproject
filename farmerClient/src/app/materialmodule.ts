import {
  MatToolbarModule,
  MatButtonModule,
  MatCardModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule
  ],

  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class MaterialModule{}