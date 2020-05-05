import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiaComponent } from './noticia/noticia.component';
import { NoticiasComponent } from './noticias/noticias.component';


// Exportamos solo el noticias porque el noticia solo lo vamos a usar 
// dentro de noticiasComponent, por eso solo hay que exportar el noticias
@NgModule({
  declarations: [
    NoticiaComponent,
    NoticiasComponent
  ],
  exports: [
    NoticiasComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
