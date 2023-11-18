import { Component, Input } from '@angular/core';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-option',
  standalone: true,
  templateUrl: './movie-option.component.html',
  styleUrl: './movie-option.component.scss',
  exportAs: 'mat-option',
})
export class MovieOptionComponent {
  @Input({ required: true }) movie!: Movie;
}
