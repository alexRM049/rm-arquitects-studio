import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { SanityService } from '../../services/sanity.service';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private catalogService = inject(CatalogService);
  private sanityService = inject(SanityService);
  private categoryService = inject(CategoryService);

  categoryTitle = '';
  items = signal<any[]>([]);
  categoryNotFound = false;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const category = params.get('category') || '';
      this.loadCatalog(category);
    });
  }

  private async loadCatalog(category: string) {
    // Try to get dynamic category title
    const cat = this.categoryService.getCategoryBySlug(category);
    if (cat) {
      this.categoryTitle = cat.name;
    } else {
      // Fallback to legacy title logic
      this.categoryTitle = this.catalogService.getCategoryTitle(category);
    }
    
    this.categoryNotFound = !this.categoryTitle;

    if (!this.categoryNotFound) {
      // Fetch from Sanity
      const sanityData = await this.sanityService.getProjectsByCategory(category);
      console.log(`Fetched ${sanityData?.length || 0} projects from Sanity for category: ${category}`);
      
      if (sanityData && sanityData.length > 0) {
        this.items.set(sanityData);
      } else {
        console.warn('No projects found in Sanity for this category.');
        this.items.set([]); // Clear items if nothing found in Sanity
      }
    }
  }

  getImageUrl(item: any) {
    if (item.mainImage) {
      return this.sanityService.getImageUrl(item.mainImage).url();
    }
    return item.image; // Fallback for hardcoded items
  }

  onBackToCategories() {
    this.router.navigate(['/category']);
  }

  viewProject(item: any) {
    const slug = item.slug || item.path?.split('/').pop();
    if (slug) {
      this.router.navigate(['/gallery', slug]);
    }
  }
}
