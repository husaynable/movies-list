import { Component, NgZone, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MoviesSearchComponent } from './components/movies-search/movies-search.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    NgStyle,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MoviesListComponent,
  ],
  standalone: true
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  showFab = false;
  headerFontSub: Subscription;
  showCircleBtn = false;
  modalOpened = false;

  constructor(private matDialog: MatDialog, private ngZone: NgZone) { }

  ngOnInit() {
    this.registerFontSizeChangeObserver();
  }

  ngAfterViewInit() {
    this.registerSearchBtnIntersectionObserver();
  }

  registerFontSizeChangeObserver() {
    this.ngZone.runOutsideAngular(() => {
      this.headerFontSub = fromEvent(document, 'scroll').pipe(
        filter(() => window.scrollY > 42 && window.scrollY < 110)
      ).subscribe(() => {
        function updateTitleSize() {
          const el = document.querySelector('.page-header-title');
          el.setAttribute('style', `font-size: ${128 - window.scrollY}px`);
        }
        requestAnimationFrame(updateTitleSize);
      });
    });
  }

  registerSearchBtnIntersectionObserver() {
    const el = document.querySelector('.page-header-content');
    const btn = document.getElementById('defaultSearchBtn');
    const callback: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];
      if (entry) {
        if (entry.isIntersecting) {
          btn.classList.add('mat-raised-button');
          btn.classList.remove('mat-fab');
          this.showCircleBtn = false;
        } else {
          btn.classList.add('mat-fab');
          btn.classList.remove('mat-raised-button');
          this.showCircleBtn = true;
        }
      }
    };
    const observer = new IntersectionObserver(callback, {threshold: 1.0});
    observer.observe(el);
  }

  openSearchDialog() {
    this.modalOpened = true;
    const modal = this.matDialog.open(MoviesSearchComponent, {
      width: '650px',
    });

    modal.afterClosed().subscribe(() => this.modalOpened = false);
  }

  ngOnDestroy() {
    this.headerFontSub && this.headerFontSub.unsubscribe();
  }
}
