import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule, MatToolbarModule, MatSnackBarModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatTableModule, MatSidenavModule, MatIconModule, MatButtonModule
  ],
  exports: [MatToolbarModule, MatCardModule, MatSnackBarModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatTableModule, MatSidenavModule, MatIconModule, MatButtonModule]
})
export class MaterialModule { }
