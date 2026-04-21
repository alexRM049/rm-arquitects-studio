import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { CategoryService } from '../services/category.service';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-category',
  imports: [Header, Footer],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {

  isShown = signal(false)

  private categoryService = inject(CategoryService);

  categories = this.categoryService.getCategories();

  ngOnInit(): void {
  
      this.toggle();
    
  }
toggle() {
    this.isShown.update((isShown) => !isShown);
  }
 
}
