import { Injectable } from '@angular/core';
import { MovieDetails } from '../models/movie-details';
import { Movie } from '../models/movie';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesStoreService {

  private readonly localStorageKey = 'movies';
  private movies$: BehaviorSubject<MovieDetails[]>;

  constructor() {
    const movies = this.loadMoviesFromLocalStorage();
    this.movies$ = new BehaviorSubject(movies);
  }

  getMovies(): Observable<MovieDetails[]> {
    return this.movies$.asObservable();
  }

  addMovie(movie: MovieDetails) {
    if (!this.includes(movie)) {
      const movies = this.loadMoviesFromLocalStorage();
      movies.push(movie);
      this.writeMoviesToLocalStorage(movies);
      this.movies$.next(movies);
    }
  }

  deleteMovie(movie: MovieDetails) {
    let movies = this.loadMoviesFromLocalStorage();
    movies = movies.filter(m => m.imdbID !== movie.imdbID);
    this.writeMoviesToLocalStorage(movies);
    this.movies$.next(movies);
  }

  includes(movie: Movie): boolean {
    const movies = this.loadMoviesFromLocalStorage();
    return movies.map(m => m.imdbID).includes(movie.imdbID);
  }

  private loadMoviesFromLocalStorage(): MovieDetails[] {
    const localStorageItem = localStorage.getItem(this.localStorageKey);
    if (localStorageItem) {
      try {
        return JSON.parse(localStorageItem);
      } catch {
        return [];
      }
    } else {
      return [];
    }
  }

  private writeMoviesToLocalStorage(movies: MovieDetails[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
  }
}
