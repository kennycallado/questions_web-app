import { register } from 'swiper/element/bundle'

import {AfterViewInit, Component, Input, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { DEFAULT_PICTURE } from 'src/app/providers/constants';

import { Slide, slidesList } from '../../slides';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./slide.component.scss'],
  imports: [CommonModule, InputComponent],
})
export class SlideComponent implements AfterViewInit {

  @Input() slides: Slide[] = [];

  slide: Slide | undefined;
  answer?: string;

  timeStamp: number = Date.now();
  DEFAULT_PICTURE: string = DEFAULT_PICTURE;

  constructor(private route: ActivatedRoute) { }

  submit() {
    if (!this.answer) {
      alert('Debes introducir un valor para poder continuar');
    }
    // Save to continue
  }

  changeAnswer(answer: string) {
    switch (answer) {
      case '0':
        this.answer = 'Nada';
        break;
      case '1':
        this.answer = 'Poco';
        break;
      case '2':
        this.answer = 'Medio';
        break;
      case '3':
        this.answer = 'Bastante';
        break;
      case '4':
        this.answer = 'Mucho';
        break;
      case '5':
        this.answer = 'Totalmente';
        break;
    }
  }

  next() {
    let index = this.slides.indexOf(this.slide!);

    if (index < this.slides.length - 1) {
      this.slide = this.slides[index + 1];
    }

    this.setLinkPicture(this.DEFAULT_PICTURE);
  }

  prev() {
    let index = this.slides.indexOf(this.slide!);

    if (index > 0) {
      this.slide = this.slides[index - 1];
    }

    this.setLinkPicture(this.DEFAULT_PICTURE);
  }

  getLinkPicture() {
    if (this.slide!.image) {
      return this.slide!.image;
    }

    return this.DEFAULT_PICTURE + '?' + this.timeStamp;
  }

  setLinkPicture(url: string) {
    this.DEFAULT_PICTURE = url;
    this.timeStamp = (new Date()).getTime();
  }

  ngAfterViewInit() {
    register();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id')!);

      this.slides = slidesList.slidesGroup.find(sg => sg.id === id)!.slides;
      this.slide = this.slides[0];
    });
  }
}
