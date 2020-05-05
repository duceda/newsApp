import { DataLocalService } from './../../services/data-local.service';
import { Component } from '@angular/core';
import { Article } from 'src/app/interfaces/Interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  noticias: Article[] = [];
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  constructor(public dataLocalService: DataLocalService) { }
}
