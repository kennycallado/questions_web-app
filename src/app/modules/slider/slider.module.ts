import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliderRoutingModule } from './slider-routing.module';
import { SliderComponent } from './slider.component';
// import { SlideComponent } from './components/slide/slide.component';


@NgModule({
  declarations: [
    SliderComponent,
    // SlideComponent,
  ],
  imports: [
    CommonModule,
    SliderRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderModule { }
