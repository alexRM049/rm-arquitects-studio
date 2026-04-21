import { Injectable } from "@angular/core";
import { Catalog } from "../category/catalog/catalog.model";

@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    private residencials: Catalog[] = [
        {
            name: 'Casa Moderna',
            description: 'Casa moderna con acabados de lujo',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
            path: '/residential/modern'
        }
    ]

    private commercials: Catalog[] = [
        {
            name: 'Edificio Comercial',
            description: 'Edificio comercial con acabados de lujo',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
            path: '/commercial/modern'
        }
    ]

    private sustainable: Catalog[] = [
        {
            name: 'Casa Sostenible',
            description: 'Casa sostenible con acabados de lujo',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
            path: '/sustainable/modern'
        }
    ]
    getResidencials(): Catalog[] {
        return this.residencials;
    }
    getCommercials(): Catalog[] {
        return this.commercials;
    }
    getSustainable(): Catalog[] {
        return this.sustainable;
    }
}