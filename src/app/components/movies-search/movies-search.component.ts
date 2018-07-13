import { Component, OnInit } from '@angular/core';
import { MoviesSearchService } from '../../services/movies-search.service';
import { FormControl } from '@angular/forms';
import { Movie } from '../../models/Movie';
import { switchMap, debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MovieDetails } from '../../models/movie-details';
import { MoviesStoreService } from '../../services/movies-store.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-movies-search',
  templateUrl: './movies-search.component.html',
  styleUrls: ['./movies-search.component.scss']
})
export class MoviesSearchComponent implements OnInit {

  searchCtrl = new FormControl();
  movies: Observable<Movie[]>;
  selectedMovie: MovieDetails;

  constructor(private searchService: MoviesSearchService,
              private storeService: MoviesStoreService,
              private snackBar: SnackBarService) { }

  ngOnInit() {
    this.movies = this.searchCtrl.valueChanges.pipe(
      debounceTime(150),
      switchMap(searchText => this.searchService.search(searchText)),
      map(movies => {
        if (!movies || movies.length === 0) {
          return [{ Title: 'No Results' }] as Movie[];
        } else {
          return movies;
        }
      })
    );
  }

  movieSelected(movie: Movie) {
    if (movie.imdbID) {
      this.searchService.getFullInfo(movie)
        .subscribe(movieDetails => this.selectedMovie = movieDetails);
    }
  }

  checkMovieAlreadyInList(): boolean {
    return this.storeService.includes(this.selectedMovie);
  }

  addMovieToList() {
    if (!this.checkMovieAlreadyInList()) {
      this.storeService.addMovie(this.selectedMovie);
      this.snackBar.show('Movie added to list');
    }
  }
}
