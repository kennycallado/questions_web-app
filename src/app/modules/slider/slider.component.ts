import { Component } from '@angular/core';

import { slidesList } from './slides'

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  slidesList = slidesList;

  constructor() { }
}
