import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Slide, slides } from '../../slides';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent {

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
     if(this.timeStamp) {
        return this.linkPicture + '?' + this.timeStamp;
     }
     return this.linkPicture;
  }

  setLinkPicture(url: string) {
     this.linkPicture = url;
     this.timeStamp = (new Date()).getTime();
  }


  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id')!);

      this.slides = slides;
      this.slide = this.slides.find(slide => slide.id === id);
    });
  }
}
