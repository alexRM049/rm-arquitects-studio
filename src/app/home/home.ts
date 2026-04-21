import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { RouterLink, Router } from '@angular/router';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  imports: [Header, RouterLink, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  router = inject(Router)

  routerToCategory() {
    this.router.navigate(['/category'])
  
}

}