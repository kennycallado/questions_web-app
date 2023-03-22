import {AfterViewInit, Component, Input, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Slide, slides } from '../../slides';

import { register } from 'swiper/element/bundle'

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./slide.component.scss'],
  imports: [CommonModule]
})
export class SlideComponent implements AfterViewInit {

  @Input() slides: Slide[] = [];

  slide: Slide | undefined;
  timeStamp: number = Date.now();

  linkPicture: string = 'https://picsum.photos/200/300';

  constructor(private route: ActivatedRoute) { }

  next() {
    let index = this.slides.indexOf(this.slide!);

    if (index < this.slides.length - 1) {
      this.slide = this.slides[index + 1];
    }

    this.setLinkPicture(this.linkPicture);
  }

  prev() {
    let index = this.slides.indexOf(this.slide!);

    if (index > 0) {
      this.slide = this.slides[index - 1];
    }

    this.setLinkPicture(this.linkPicture);
  }

  getLinkPicture() {
    if (this.slide!.image) {
      return this.slide!.image;
    }

    return this.linkPicture + '?' + this.timeStamp;
  }

  setLinkPicture(url: string) {
    this.linkPicture = url;
    this.timeStamp = (new Date()).getTime();
  }

  ngAfterViewInit() {
    register();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // fetch the slides_group from server
      // let id = parseInt(params.get('id')!);

      this.slides = slides;
      this.slide = this.slides.find(slide => slide.id === 1);
    });
  }
}
