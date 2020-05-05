import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/Interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ];

  noticias: Article[] = [];

  constructor(private noticiaService: NoticiasService) { }

  ngOnInit() {
    this.segment.value = this.categories[0];
    this.cargarNoticias(this.categories[0]);
  }

  changeCategory(evento) {
    this.noticias = [];
    this.cargarNoticias(evento.detail.value);
  }

  cargarNoticias(category: string, evento?: any) {
    this.noticiaService.getTopHeadLinesByCategory(category).subscribe((resp) => {
      this.noticias.push(...resp.articles);

      if (evento) {
        evento.target.complete();
      }
    });
  }

  loadData(evento) {
    this.cargarNoticias(this.segment.value, evento);
  }
}
