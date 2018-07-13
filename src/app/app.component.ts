import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoviesSearchComponent } from './components/movies-search/movies-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showFab = false;

  constructor(private matDialog: MatDialog) { }

  openSearchDialog() {
    this.matDialog.open(MoviesSearchComponent, {
      width: '650px'
    });
  }
}
