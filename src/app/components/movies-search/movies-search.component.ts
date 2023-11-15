import { Component, OnInit } from '@angular/core';
import { MoviesSearchService } from '../../services/movies-search.service';
import { Movie } from '../../models/movie';
import { switchMap, debounceTime, map, finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovieDetails } from '../../models/movie-details';
import { MoviesStoreService } from '../../services/movies-store.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { AsyncPipe } from '@angular/common';
import { MovieOptionComponent } from '../movie-option/movie-option.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class MoviesSearchComponent implements OnInit {
  searchCtrl = new FormControl('');
  movies: Observable<Movie[]>;
  selectedMovie: MovieDetails;
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private searchService: MoviesSearchService,
    private storeService: MoviesStoreService,
    private snackBar: SnackBarService
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
      })
    );
  }

  movieSelected(movie: Movie) {
    if (movie?.imdbID) {
      this.loading$.next(true);
      this.searchService
        .getFullInfo(movie)
        .pipe(
          finalize(() => this.loading$.next(false)),
          takeUntilDestroyed(),
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
}
