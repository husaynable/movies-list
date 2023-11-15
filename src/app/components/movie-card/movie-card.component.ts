import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MovieDetails } from "../../models/movie-details";
import { MatCardModule } from "@angular/material/card";
import { NgOptimizedImage } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class MovieCardComponent {
  @Input() movie?: MovieDetails;
  @Output() delete = new EventEmitter<MovieDetails>();

  readonly imdbEndpoint = "https://www.imdb.com/title/";

  deleteMovie() {
    this.delete.emit(this.movie);
  }
}
