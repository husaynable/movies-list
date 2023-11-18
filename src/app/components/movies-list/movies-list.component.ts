import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { MovieDetails } from '../../models/movie-details';
import { MoviesStoreService } from '../../services/movies-store.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  standalone: true,
  imports: [MovieCardComponent, AsyncPipe],
})
export class MoviesListComponent implements OnInit {
  protected movies$?: Observable<MovieDetails[]>;

  constructor(
    private storeService: MoviesStoreService,
    private snackBar: SnackBarService,
  ) {}

  ngOnInit() {
    this.movies$ = this.storeService.getMovies();
  }

  deleteMovie(movie: MovieDetails) {
    this.storeService.deleteMovie(movie);
    this.snackBar.show('Movie is deleted from list');
  }
}
