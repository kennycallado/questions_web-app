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
  // answer: string = '';
  answerText: string = '';

  timeStamp: number = Date.now();
  DEFAULT_PICTURE: string = DEFAULT_PICTURE;

  constructor(private route: ActivatedRoute) { }

  submit() {
    // if (!this.slide!.answer && this.slide!.answer === '') {
    console.log(this.slide!.answer);
    if (!this.slide!.answer || this.slide!.answer === '') {
      alert('Debes introducir un valor para poder continuar');
    } else {
      // Save to continue
      // Inject next group of slides
    }
    return ;
  }

  changeAnswer(answer: string) {
    switch (answer) {
      case '0':
        this.answerText = 'N/C';
        break;
      case '1':
        this.answerText = 'Nada';
        break;
      case '2':
        this.answerText = 'Poco';
        break;
      case '3':
        this.answerText = 'Medio';
        break;
      case '4':
        this.answerText = 'Bastante';
        break;
      case '5':
        this.answerText = 'Mucho';
        break;
      case '6':
        this.answerText = 'Totalmente';
        break;
    }

    if (answer === '0') {
      this.slide!.answer = '';
      return ;
    }

    this.slide!.answer = answer;
    return ;
  }

  next(event?: string) {
    // Prevent to run twice
    if (!event) {
      return ;
    }

    // Clear the answer text
    this.answerText = '';

    // Determinete the next slide
    let index = this.slides.indexOf(this.slide!);
    if (index < this.slides.length - 1) {
      this.slide = this.slides[index + 1];
    }

    // If the slide has an answer, set it
    if (this.slide!.answer && this.slide!.answer !== '') {
      this.changeAnswer(this.slide!.answer);
    }

    this.setLinkPicture(this.DEFAULT_PICTURE);
  }

  prev(event?: string) {
    // Prevent to run twice
    if (!event) { 
      return ;
    }

    // Clear the answer text
    this.answerText = '';

    // Determinete the prev slide
    let index = this.slides.indexOf(this.slide!);
    if (index > 0) {
      this.slide = this.slides[index - 1];
    }

    // If the slide has an answer, set it
    if (this.slide!.answer && this.slide!.answer !== '') {
      this.changeAnswer(this.slide!.answer);
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
