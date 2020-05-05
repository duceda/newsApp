import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from './../../interfaces/Interfaces';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData(evento) {
    this.cargarNoticias(evento);
  }

  cargarNoticias(evento?: any) {
    this.noticiasService.getTopHeadlines().subscribe((resp) => {
      console.log('noticias: ', resp);

      if (resp.articles.length > 0) {
        this.noticias.push(...resp.articles);
      } else {
        evento.target.disabled = true;
        evento.target.complete();
      }

      if (evento) {
        evento.target.complete();
      }
    });
  }
}
