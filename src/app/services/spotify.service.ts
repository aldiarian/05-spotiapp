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
      'Authorization' : 'Bearer BQCDkK7HFfZc13aAuH37iir-p41tiSqlzyLgk3IqO4zMTyGVEgR0MEdYt_lf7KMQXAS33ospxr7dvg9DsMw'
    });

    return this.http.get( url, { headers } );
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases')
        // filtro la busqueda con map y utilizo un pipe
        .pipe( map( data => data['albums'].items ));
  }

  getArtist( termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist`)
      // filtro la busqueda con map y utilizo un pipe
      .pipe( map( data => data['artists'].items ) );
  }
}
