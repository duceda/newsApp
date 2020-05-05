import { DataLocalService } from './../../services/data-local.service';
import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/Interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() index: number;
  @Input() enFavoritos: boolean = false;

  constructor(
    private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService,
    private platform: Platform) { }

  ngOnInit() {
    console.log('Favoritos', this.enFavoritos);
  }

  abrirNoticia() {
    console.log(this.noticia.url);

    // El argumento '_system' es para que lo abra en el navegador del sistema operativo
    // pero tú podrías especificarle uno en concreto
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

    let guardarBorrarBtn;

    if (this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Delete from Favorites',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Delete from Favorite clicked');
          this.dataLocalService.borrarNoticia(this.noticia);
        }
      };
    } else {
      guardarBorrarBtn = {
        text: 'Favorite',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.dataLocalService.guardarNoticia(this.noticia);

        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Share',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.compartirNoticia();
        }
      }, guardarBorrarBtn, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  compartirNoticia() {
    if (this.platform.is('cordova')) {
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );
    } else {
      if (navigator['share']) {
        navigator['share']({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url
        }).then(() => console.log('Successfully shared'))
          .catch((error) => console.log('Error Sharing', error));
      } else {
        console.log('Error Sharing: Browser doesn`t support share');
      }
    }
  }
}
