import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  MatButtonToggleModule
} from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Theme, ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-toggle',
  imports: [CommonModule, MatIconModule, MatButtonToggleModule],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css',
})
export class ToggleComponent implements OnInit {
  theme$: Observable<Theme>;
  selectedThemePreference: Theme;
  destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) {
    this.selectedThemePreference = Theme.SYSTEM;
  }

  ngOnInit(): void {
    this.theme$ = this.themeService.theme$;

    this.theme$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.selectedThemePreference = res;
    });
  }
  changeTheme(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const buttonElement = target.closest('mat-button-toggle') as HTMLElement;

    if (!buttonElement) return;
    this.themeService.toggleThemeWithAnimation(
      buttonElement.getAttribute('value') as Theme,
      buttonElement
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
