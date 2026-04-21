import { Component, inject } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-catalog',
  imports: [],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog {
  private catalogService = inject(CatalogService);
  residencials = this.catalogService.getResidencials();
  commercials = this.catalogService.getCommercials();
  sustainable = this.catalogService.getSustainable();
}
