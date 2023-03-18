import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';

import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
