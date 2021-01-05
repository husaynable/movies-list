import { Component, NgZone, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MoviesSearchComponent } from './components/movies-search/movies-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  showFab = false;
  headerFontSub: Subscription;
  showCircleBtn = false;

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
    const callback: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];
      if (entry) {
        if (entry.isIntersecting) {
          this.showCircleBtn = false;
        } else {
          this.showCircleBtn = true;
        }
      }
    };
    const observer = new IntersectionObserver(callback, {threshold: 0.5});
    observer.observe(document.getElementById('defaultSearchBtn'));
  }

  openSearchDialog() {
    this.matDialog.open(MoviesSearchComponent, {
      width: '650px'
    });
  }

  ngOnDestroy() {
    this.headerFontSub && this.headerFontSub.unsubscribe();
  }
}
