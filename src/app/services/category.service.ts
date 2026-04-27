import { inject, Injectable, signal } from "@angular/core";
import { Category } from "../category/category.model";
import {SanityService} from "./sanity.service";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private categories: Category[] = [
        {
            name: 'Residencial',
            description: 'Casas de lujo a medida y espacios modernos diseñados para el confort y la elegancia.',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
            path: '/residencial',
            category: 'residencial'
        },
        {
            name: 'Comercial',
            description: 'Edificios de oficinas innovadores y espacios comerciales que inspiran productividad.',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
            path: '/comercial',
            category: 'comercial'
        },
        {
            name: 'Oficinas',
            description: 'Diseño de espacios corporativos de alto nivel.',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
            path: '/oficinas',
            category: 'oficinas'
        },
        {
            name: 'Uso Mixto',
            description: 'Proyectos urbanos integrados que combinan vida, trabajo y ocio.',
            image: 'https://images.unsplash.com/photo-1449156001437-37c69b1df501?auto=format&fit=crop&q=80&w=800',
            path: '/uso-mixto',
            category: 'uso-mixto'
        },
        {
            name: 'Hospitalidad',
            description: 'Diseño de hoteles y espacios de hospitalidad de clase mundial.',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
            path: '/hospitalidad',
            category: 'hospitalidad'
        },
        {
            name: 'Diseño Interior',
            description: 'Interiores detallados que reflejan la personalidad y funcionalidad.',
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
            path: '/diseno-interior',
            category: 'diseno-interior'
        },
        {
            name: 'En Construcción',
            description: 'Nuestros proyectos actuales cobrando vida.',
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
            path: '/en-construccion',
            category: 'en-construccion'
        }
    ];

    categoriesSignal = signal<Category[]>(this.categories);
    private sanityService = inject(SanityService);

    getCategories() {
        return this.categoriesSignal;
    }

    getCategoryByName(name: string): Category | null {
        return this.categoriesSignal().find(category => category.name === name) || null;
    }
    
    getCategoryBySlug(slug: string): Category | null {
        return this.categoriesSignal().find(category => category.category === slug) || null;
    }

    

    constructor() {
        this.loadCategories();
    }

loadCategories() {
    this.sanityService.getCategories()
    .then((categories) => {
        const mappedCategories = categories.map((categories: any)=> {
            return {
                name: categories.title,
                description: categories.description,
                image: categories.image,
                path: `/${categories.slug}`,
                category: categories.slug
            }
        });
        this.categoriesSignal.set(mappedCategories);
        return this.categoriesSignal;
    });
}
}