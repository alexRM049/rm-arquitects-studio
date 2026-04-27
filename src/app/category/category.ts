import { Component, inject, signal } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [RouterLink],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {

  isShown = signal(false);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  categories = this.categoryService.getCategories();
  loadCategories = this.categoryService.loadCategories();
categorysignal = this.categoryService.categoriesSignal;
  
  onCategorySelected(category: string) {
    this.router.navigate(['/catalog', category]);
  }

  ngOnInit(): void {
    this.isShown.set(true);
  }

}
