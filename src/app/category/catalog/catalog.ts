import { Component, inject, Input, OnInit, signal } from '@angular/core';
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

  /**
   * category: Input that allows this component to be controlled by a parent (like Category page).
   * The setter triggers a fresh load from Sanity whenever the value changes.
   */
  @Input() set category(value: string) {
    console.log('Catalog: Input category received:', value);
    if (value && value !== 'all') {
      this.loadCatalog(value);
    } else if (value === 'all') {
      this.loadCatalog('all'); 
    }
  }

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private catalogService = inject(CatalogService);
  private sanityService = inject(SanityService);
  private categoryService = inject(CategoryService);

  isShown = signal(false);
  categoryTitle = '';
  items = signal<any[]>([]); // Stores the projects fetched from Sanity
  loading = signal(false);   // Tracks if a request is in progress
  categoryNotFound = false;

  ngOnInit(): void {
    /**
     * Subscribe to route parameters to allow direct navigation 
     * (e.g., /catalog/residencial).
     */
    this.activatedRoute.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category) {
        console.log('Catalog: Loading from route param:', category);
        this.loadCatalog(category);
      }
      this.isShown.set(true);
    });
  }

  /**
   * loadCatalog: The main data-fetching method.
   * Handles both specific categories and the 'all' projects view.
   */
  async loadCatalog(category: string) {
    this.isShown.set(false); // Reset animation state to trigger a new fade-in
    this.loading.set(true); 
    
    if (category === 'all' || !category) {
      this.categoryTitle = 'Todos los Proyectos';
      this.categoryNotFound = false;
      const sanityData = await this.sanityService.getProjects();
      this.items.set(sanityData || []);
      this.loading.set(false); // Done loading
      return;
    }

    // Attempt to find a user-friendly name for the category
    const cat = this.categoryService.getCategoryBySlug(category);
    if (cat) {
      this.categoryTitle = cat.name;
    } else {
      // Fallback for categories that aren't in the local list
      this.categoryTitle = this.catalogService.getCategoryTitle(category);
    }
    
    // If we still don't have a title, use the slug capitalized
    if (!this.categoryTitle && category) {
      this.categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
    }

    this.categoryNotFound = !this.categoryTitle;

    if (!this.categoryNotFound) {
      try {
        // Fetch projects from Sanity using the GROQ query filter
        const sanityData = await this.sanityService.getProjectsByCategory(category);
        console.log(`Fetched ${sanityData?.length || 0} projects from Sanity for category: ${category}`);
        this.items.set(sanityData || []);
      } catch (error) {
        console.error('Error fetching projects from Sanity:', error);
        this.items.set([]);
      }
    }
    
    this.loading.set(false); 
    
    // Tiny timeout to ensure the DOM has updated before starting the fade-in animation
    setTimeout(() => {
      this.isShown.set(true);
    }, 50);
  }

  /**
   * getImageUrl: Helper to resolve Sanity image objects to usable URLs.
   */
  getImageUrl(item: any) {
    if (item.mainImage) {
      return this.sanityService.getImageUrl(item.mainImage).url();
    }
    return item.image; 
  }

  onBackToCategories() {
    this.router.navigate(['/category']);
  }

  /**
   * viewProject: Navigates to the detailed gallery view for a project.
   */
  viewProject(item: any) {
    const slug = item.slug || item.path?.split('/').pop();
    if (slug) {
      this.router.navigate(['/gallery', slug]);
    }
  }
}
