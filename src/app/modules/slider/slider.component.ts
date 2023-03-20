import { Component } from '@angular/core';

import { slides } from './slides'

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  slides = slides;

  constructor() { }
}
