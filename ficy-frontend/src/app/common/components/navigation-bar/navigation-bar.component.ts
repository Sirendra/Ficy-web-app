import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation-bar.component.html',
  imports: [CommonModule, RouterLink],
})
export class NavigationComponent {
  isScrolled = false;
  mobileMenuOpen = false;

  constructor(private authService: AuthService) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 400;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  logOut() {
    this.authService.logout();
  }
}
