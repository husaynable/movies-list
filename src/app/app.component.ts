import { Component, NgZone } from "@angular/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MoviesSearchComponent } from "./components/movies-search/movies-search.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MoviesListComponent } from "./components/movies-list/movies-list.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MoviesListComponent,
  ],
  standalone: true,
})
export class AppComponent {
  constructor(private matDialog: MatDialog, private ngZone: NgZone) {}

  openSearchDialog() {
    this.matDialog.open(MoviesSearchComponent, {
      width: "650px",
    });
  }
}
