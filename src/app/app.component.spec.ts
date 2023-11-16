import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import { MatDialog } from '@angular/material/dialog';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockFn: jest.MockedFunction<() => void>;

  beforeEach(async () => {
    mockFn = jest.fn();
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    })
      .overrideComponent(AppComponent, {
        set: {
          providers: [{ provide: MatDialog, useValue: { open: mockFn } }],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call modal open method', () => {
    fixture.debugElement.query(By.css('.searchBtn')).triggerEventHandler('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
