import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { Catalog as CatalogModel } from './catalog.model';

@Component({
  selector: 'app-catalog',
  imports: [RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private catalogService = inject(CatalogService);

  categoryTitle = '';
  items: CatalogModel[] = [];
  categoryNotFound = false;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const category = params.get('category') || '';
      this.loadCatalog(category);
    });
  }

  private loadCatalog(category: string) {
    this.items = this.catalogService.getByCategory(category);
    this.categoryTitle = this.catalogService.getCategoryTitle(category);
    this.categoryNotFound = !this.categoryTitle;
  }

  onBackToCategories() {
    this.router.navigate(['/category']);
  }
}
