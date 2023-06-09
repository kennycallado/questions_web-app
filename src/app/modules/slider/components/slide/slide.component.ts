import { register } from 'swiper/element/bundle'

import { AfterViewInit, Component, Input, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { DEFAULT_PICTURE_URL } from 'src/app/providers/constants';

import { Slide, slidesList } from '../../slides';

import { InputComponent } from '../input/input.component';
import { MediaComponent } from '../media/media.component';

@Component({
  standalone: true,
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, InputComponent, MediaComponent],
})
export class SlideComponent implements AfterViewInit {

  @Input() slides: Slide[] = [];

  slide: Slide | undefined;
  answerText: string = '';

  timeStamp: number = Date.now();
  DEFAULT_PICTURE: string = DEFAULT_PICTURE_URL;

  allowSlideNext: boolean = true;

  isCompleted: boolean = false;
  reachedEnd: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  reachEnd() {
    this.reachedEnd = true;
    this.checkCompleted();
  }

  checkCompleted() {
    // check all the slides differents to content have an answer
    return this.slides.filter(s => s.type !== 'content').every(s => s.answer && s.answer !== '');
  }

  submitAndExit() {
    // Send to the server
    
    // Mark the slides as completed
    
    // Go to the slider
    this.router.navigate(['/slider']);
  } 

  submit() {
    if (!this.slide!.answer || this.slide!.answer === '') {
      alert('Debes introducir un valor para poder continuar');
    } else {
      this.allowSlideNext = true;
    }

    this.checkCompleted();
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
    this.submit(); // not sure the side effects

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

    if (this.slide!.type !== 'content' && !this.slide!.answer) {
      this.allowSlideNext = false;
    }

    return ;
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

    if (this.slide!.type === 'content' || this.slide!.answer) {
      this.allowSlideNext = true;
    }

    this.setLinkPicture(this.DEFAULT_PICTURE);
  }

  getLinkPicture() {
    if (this.slide!.media && this.slide!.media.type === 'image') {
    // if (this.slide!.media && this.slide!.media.url ) {
      // return this.slide!.image;
      return this.slide!.media.url;
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
