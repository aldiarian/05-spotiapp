import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent  {

  loading:boolean;
  error:boolean;
  mensajeError: string;
  nuevasCanciones:any[] = [];
  
  constructor( private spotify: SpotifyService) {
    this.loading = true;
    this.error = false;
    this.spotify.getNewReleases()
      .subscribe( data => {
        this.nuevasCanciones = data;
        this.loading = false;
      }, ( errorSuscripcion => {
        this.loading = false;
        this.error = true;
        this.mensajeError = errorSuscripcion.error.error.message;
      }  ));
    }


}
