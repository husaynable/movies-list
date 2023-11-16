import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, finalize, map, switchMap, takeUntil } from 'rxjs/operators';

import { Movie } from '../../models/movie';
import { MovieDetails } from '../../models/movie-details';
import { MoviesSearchService } from '../../services/movies-search.service';
import { MoviesStoreService } from '../../services/movies-store.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MovieOptionComponent } from '../movie-option/movie-option.component';

@Component({
  selector: 'app-movies-search',
  templateUrl: './movies-search.component.html',
  styleUrls: ['./movies-search.component.scss'],
  standalone: true,
  imports: [
    MovieCardComponent,
    AsyncPipe,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MovieOptionComponent,
  ],
})
export class MoviesSearchComponent implements OnInit, OnDestroy {
  searchCtrl = new FormControl('');
  movies: Observable<Movie[]>;
  selectedMovie: MovieDetails;
  loading$ = new BehaviorSubject<boolean>(false);
  onDestroy$ = new Subject<void>();

  constructor(
    private searchService: MoviesSearchService,
    private storeService: MoviesStoreService,
    private snackBar: SnackBarService,
  ) {}

  ngOnInit() {
    this.movies = this.searchCtrl.valueChanges.pipe(
      debounceTime(150),
      switchMap((searchText) => this.searchService.search(searchText)),
      map((movies) => {
        if (!movies || movies.length === 0) {
          return [{ Title: 'No Results' }] as Movie[];
        } else {
          return movies;
        }
      }),
    );
  }

  movieSelected(movie: Movie) {
    if (movie?.imdbID) {
      this.loading$.next(true);
      this.searchService
        .getFullInfo(movie)
        .pipe(
          finalize(() => this.loading$.next(false)),
          takeUntil(this.onDestroy$),
        )
        .subscribe((movieDetails) => (this.selectedMovie = movieDetails));
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

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
