import { Component, OnInit, Input } from '@angular/core';
import { MovieDetails } from '../../models/movie-details';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movie: MovieDetails;

  readonly imdbEndpoint = 'https://www.imdb.com/title/';

  constructor() { }

  ngOnInit() {
  }

}
