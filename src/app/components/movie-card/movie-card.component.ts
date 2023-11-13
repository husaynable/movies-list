import { Component, OnInit, Input } from '@angular/core';
import { MovieDetails } from '../../models/movie-details';
import { MatCardModule } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatCardModule,
  ]
})
export class MovieCardComponent implements OnInit {
  @Input() movie: MovieDetails;

  readonly imdbEndpoint = 'https://www.imdb.com/title/';

  constructor() { }

  ngOnInit() {
  }

}
