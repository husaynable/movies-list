import { Component, OnInit } from '@angular/core';
import { MovieDetails } from '../../models/movie-details';
import { MoviesStoreService } from '../../services/movies-store.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  movies$: Observable<MovieDetails[]>;
  listIsEmpty = false;

  constructor(
    private storeService: MoviesStoreService,
    private snackBar: SnackBarService
  ) {}

  ngOnInit() {
    this.movies$ = this.storeService.getMovies();
  }

  deleteMovie(movie: MovieDetails) {
    this.storeService.deleteMovie(movie);
    this.snackBar.show('Movie is deleted from list');
  }
}
