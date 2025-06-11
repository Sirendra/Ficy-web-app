import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NavigationComponent } from './common/components/navigation-bar/navigation-bar.component';
import { fadeIn } from './common/helpers/animation.helper';
import { filter } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadBooks } from './store/books/books.actions';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterModule, NavigationComponent, CommonModule],
  animations: [fadeIn],
})
export class AppComponent {
  constructor(
    private router: Router,
    private store: Store,
    private authService: AuthService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    if (this.authService.isUserLoggedIn()) this.store.dispatch(loadBooks());
  }

  shouldShowNavbar(): boolean {
    const hiddenRoutes = ['/login', '/register'];
    return !hiddenRoutes.includes(this.router.url);
  }
}
