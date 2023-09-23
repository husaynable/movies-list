import { NgModule } from '@angular/core';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';

@NgModule({
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  exports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
