import { Component, inject, signal, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { SharedService } from '../../services/shared.service';
import { Catalog as CatalogModel } from './catalog.model';
import {RouterLink, Router} from '@angular/router'

@Component({
  selector: 'app-catalog',
  imports: [RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog implements OnInit {
  private router = inject(Router);
  private catalogService = inject(CatalogService);
  sharedService = inject(SharedService);
  
  residencials: CatalogModel[] = this.catalogService.getResidencials();
  commercials: CatalogModel[] = this.catalogService.getCommercials();
  sustainable: CatalogModel[] = this.catalogService.getSustainable();

  onBackToCategories() {
    this.router.navigate(['/category']);
  }
  
  ngOnInit(): void {
    // We can use the signal directly in the template
  }
}
