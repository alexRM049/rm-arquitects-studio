import { Component, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  private route = inject(Router);

  isCollapsed = signal(true);
  isMobile = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(max-width: 991.98px)'])
      .subscribe(result => {
        this.isMobile = result.matches;
        if (!this.isMobile) {
          this.isCollapsed.set(false);
        } else {
          this.isCollapsed.set(true);
        }
      });
  }

  toggleMenu() {
    this.isCollapsed.update(val => !val);
  }

  closeMobileMenu() {
    if (this.isMobile) {
      this.isCollapsed.set(true);
    }
  }

  routerToHome() {
    this.route.navigate(['/home']);
  }
}