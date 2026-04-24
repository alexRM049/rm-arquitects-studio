import { Injectable } from "@angular/core";
import { Category } from "../category/category.model";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private categories: Category[] = [
        {
            name: 'Residencial',
            description: 'Casas de lujo a medida y espacios modernos diseñados para el confort y la elegancia.',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
            path: '/residential',
            category: 'residential'
        },
        {
            name: 'Comercial',
            description: 'Edificios de oficinas innovadores y espacios comerciales que inspiran productividad y compromiso.',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
            path: '/commercial',
            category: 'commercial'
        },
        {
            name: 'Sostenible',
            description: 'Diseños ecológicos que integran energía renovable y materiales sostenibles.',
            image: 'https://images.unsplash.com/photo-1545641203-7d072a14e3b2?auto=format&fit=crop&q=80&w=800',
            path: '/sustainable',
            category: 'sustainable'
        }
    ];

    getCategories(): Category[] {
        return this.categories;
    }

    getCategoryByName(name: string): Category | null {
        return this.categories.find(category => category.name === name) || null;
    }
}