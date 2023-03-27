import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { DEFAULT_PICTURE_URL } from 'src/app/providers/constants';

import { Media } from '../../slides';

@Component({
  standalone: true,
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  imports: [CommonModule, YouTubePlayerModule]
})
export class MediaComponent {

  @Input() media?: Media;

  timeStamp: number = Date.now();
  default_picture: string = DEFAULT_PICTURE_URL;

  getLinkPicture() {
    if (this.media && this.media.type === 'image') {
      return this.media.url;
    }

    return this.default_picture + '?' + this.timeStamp;
  }

  ngOnInit(): void {
    // Este código carga el reproductor de la API en un iframe de manera asíncrona, siguiendo las instrucciones:
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    if (!this.media) {
      this.media = { id: 0, url: this.getLinkPicture(), type: 'image' }
    }

    return ;
  }
}
