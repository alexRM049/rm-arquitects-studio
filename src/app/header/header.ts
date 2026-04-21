import { Component, inject, signal, WritableSignal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  private route = inject(Router)

  isCollapsed = signal(true);
  isShown = signal(false);
  isMenuSelected: WritableSignal<string | null> = signal(null)
  isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
  this.breakpointObserver.observe(['(max-width: 991.98px)'])
    .subscribe(result => {
      this.isMobile = result.matches;
      this.isShown.set(true)

  this.isMobile = result.matches;
  if (!this.isMobile) {
    this.isCollapsed.set(false); // Force menu open on desktop
  } else {
    this.isCollapsed.set(true);  // Default closed on mobile
  }
    });
}

  toggleMenu() {
    this.isCollapsed.update(val => !val);
  }

  toggle() {
    this.isShown.update((isShown) => !isShown);
  } 

  routerToHome() {
    this.route.navigate(['/home'])
}
}