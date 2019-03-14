import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent  {

  artista:any[] = [];

  constructor( private spotify: SpotifyService) {
  }
  
  buscar( termino: string ) {
    console.log(termino);
    this.spotify.getArtist( termino )
      .subscribe( data => {
        this.artista = data;
        console.log(data);
      });
  }
}
