import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme = new BehaviorSubject<Theme>(Theme.LIGHT);

  public theme$ = this.theme.asObservable();

  private systemThemePreference: Theme = Theme.LIGHT;

  private userThemePreference: Theme;

  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    private cookieService: CookieService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    this.systemThemePreference = this.getSystemThemePreference();

    const themePreferenceFromCookie = this.cookieService.get('theme');
    this.userThemePreference =
      Theme[themePreferenceFromCookie?.toUpperCase() as keyof typeof Theme];
  }

  public getSystemThemePreference() {
    const isDarkThemeEnabled = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (isDarkThemeEnabled == true) return Theme.DARK;
    return Theme.LIGHT;
  }

  public initializeTheme() {
    if (this.userThemePreference != null) {
      this.setTheme(this.userThemePreference);
      this.updateThemingClasses(this.userThemePreference);
    } else if (this.systemThemePreference != null) {
      this.setTheme(Theme.SYSTEM);
      this.updateThemingClasses(this.systemThemePreference);
    } else {
      this.setTheme(Theme.LIGHT);
      this.updateThemingClasses(Theme.LIGHT);
    }
  }

  public setTheme(theme: Theme) {
    this.theme.next(theme);

    this.updateThemingClasses(theme);

    if (environment.production)
      this.cookieService.set(
        'theme',
        theme,
        undefined,
        '/',
        `.nityamdixit.me`,
        true,
        'Strict'
      );
    else
      this.cookieService.set(
        'theme',
        theme,
        undefined,
        '/',
        `localhost`,
        true,
        'Strict'
      );
  }

  private updateThemingClasses(theme: Theme) {
    if (theme == Theme.SYSTEM) {
      theme = this.getSystemThemePreference();
    }

    switch (theme) {
      case Theme.LIGHT:
        this.renderer.addClass(document.body, 'light-theme');
        this.renderer.removeClass(document.body, 'dark-theme');
        break;
      case Theme.DARK:
        this.renderer.addClass(document.body, 'dark-theme');
        this.renderer.removeClass(document.body, 'light-theme');
        break;
      default:
        this.renderer.addClass(document.body, 'light-theme');
        this.renderer.removeClass(document.body, 'dark-theme');
        break;
    }
  }

  public toggleThemeWithAnimation(theme: Theme, ref: HTMLElement): void {
    const isDarkMode = theme === Theme.DARK;

    // If reduced motion is enabled or transitions are not supported
    if (
      !document?.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      this.setTheme(theme);
      return;
    }

    // Get the bounding rectangle of the reference element
    const { top, left, width, height } = ref.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    // Trigger the transition animation
    document
      ?.startViewTransition(async () => {
        // Apply the new theme
        this.setTheme(theme);
      })
      .ready.then(() => {
        // Animate the circular expansion effect
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
  }
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}
