import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { OmdbApi } from '../models/omdb-api';
import { MovieDetails } from '../models/movie-details';

@Injectable({
  providedIn: 'root'
})
export class MoviesSearchService {
  private readonly apiKey = '584e7a27';
  private readonly apiUrl = `http://www.omdbapi.com/?apikey=${this.apiKey}&`;

  constructor(private http: HttpClient) { }

  search(searchText: string): Observable<Movie[]> {
    return this.http.get<OmdbApi>(`${this.apiUrl}s=${searchText}`).pipe(
      map(api => api.Search)
    );
  }

  getFullInfo(movie: Movie): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.apiUrl}i=${movie.imdbID}`);
  }
}
