import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from "src/app/services/spotify.service";
import { log } from 'util';

@Component({
  selector: "app-artista",
  templateUrl: "./artista.component.html",
  styles: []
})
export class ArtistaComponent {
  cargandoArtista: boolean;
  elArtista: any = {};
  topTracks: any = {};

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) {
    this.route.params.subscribe(params => {
      this.verArtista(params["id"]);
      this.getTopTracks(params["id"]);
      this.cargandoArtista = true;
    });
  }

  verArtista(id: string) {
    this.cargandoArtista = true;
    this.spotify.getArtista(id).subscribe(artista => {
      this.elArtista = artista;
      this.cargandoArtista = false;
      console.log(this.elArtista);
    });
  }

  getTopTracks( id:string ) {
    this.spotify.getTopTracks(id)
        .subscribe( toptracks => {
          this.topTracks = toptracks;
          console.log(this.topTracks);
        })
  }
}
