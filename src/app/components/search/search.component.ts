import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent  {
  cargando:boolean;
  artista:any[] = [];

  constructor( private spotify: SpotifyService) {
  }
  
  buscar( termino: string ) {
    this.cargando = true;
    this.spotify.getArtistas( termino )
      .subscribe( data => {
        this.artista = data;
        this.cargando = false;
      });
  }
}
