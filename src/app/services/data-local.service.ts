import { Article } from 'src/app/interfaces/Interfaces';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Article[] = [];

  constructor(private storage: Storage, private toastController: ToastController) {
    this.cargarFavoritos();
  }

  guardarNoticia(noticia: Article) {
    const exists = this.noticias.find(noti => noti.title === noticia.title);

    if (!exists) {
      this.noticias.unshift(noticia);
      this.storage.set('Favoritos', this.noticias);

      this.presentToast('News saved into Favorites');
    }
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('Favoritos');

    if (favoritos) {
      this.noticias = favoritos;
    }
  }

  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter(notic => notic.title !== noticia.title);
    this.storage.set('Favoritos', this.noticias);
    this.presentToast('News delete from Favorites');
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }
}

