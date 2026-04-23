import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { CategoryService } from '../services/category.service';
import { Footer } from "../footer/footer";
import { SharedService } from '../services/shared.service';
import {Router, RouterLink} from '@angular/router'

@Component({
  selector: 'app-category',
  imports: [Header, Footer, RouterLink,],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {

  isShown = signal(false)
  sharedService = inject(SharedService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  categories = this.categoryService.getCategories();
  
  

  onCategorySelected(category: string) {
    this.sharedService.categorySelected(category);
    this.sharedService.selectCategoryName(category); // Using the same key for filtering
    this.router.navigate(['/catalog']);
    console.log('Category selected:', category);
  }



  ngOnInit(): void {
  
      this.toggle();
    
  }
toggle() {
    this.isShown.update((isShown) => !isShown);
  }


 
}
