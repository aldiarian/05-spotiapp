import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    console.log('servicio spotify listo');
  }

  getQuery( query: string) {
    // para optimizar la búsqueda concatenamos la parte fija de la url con la busqueda y usamos siempre los mismos headers
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization' : 'Bearer BQCyZMOwICRYhUdHLmzY5t5xWgPSj26JQPD8WIqXYq_qafOKtPIqcuSCTuLX3KsYFwW_u_v8jySDfyR_cB4'
    });

    return this.http.get( url, { headers } );
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases')
        // filtro la busqueda con map y utilizo un pipe
        .pipe( map( data => data['albums'].items ));
  }

  getArtistas( termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist`)
      // filtro la busqueda con map y utilizo un pipe
      .pipe( map( data => data['artists'].items ) );
  }

  getArtista( id:string ) {
    return this.getQuery(`artists/${id}`)
  }

  getTopTracks( id:string ) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
          .pipe( map( data => data['tracks'] ) );
  }
}
// "https://api.spotify.com/v1/artists/3QSQFmccmX81fWCUSPTS7y/top-tracks?country=us

