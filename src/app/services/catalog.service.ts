import { Injectable } from "@angular/core";
import { Catalog } from "../category/catalog/catalog.model";

@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    private residential: Catalog[] = [
        {
            name: 'Villa Serena',
            description: 'Residencia minimalista con integración de luz natural y espacios abiertos.',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
            path: '/residential/villa-serena',
            category: 'residential'
        },
        {
            name: 'Casa del Lago',
            description: 'Arquitectura contemporánea que armoniza con el entorno acuático.',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
            path: '/residential/casa-lago',
            category: 'residential'
        },
        {
            name: 'Urban Loft',
            description: 'Espacio industrial rediseñado para la vida urbana moderna.',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
            path: '/residential/urban-loft',
            category: 'residential'
        }
    ];

    private commercial: Catalog[] = [
        {
            name: 'Centro Corporativo Nova',
            description: 'Edificio de oficinas de alta tecnología con certificación LEED.',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
            path: '/commercial/nova',
            category: 'commercial'
        },
        {
            name: 'Skyline Plaza',
            description: 'Complejo comercial con diseño vanguardista en el corazón de la ciudad.',
            image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800',
            path: '/commercial/skyline',
            category: 'commercial'
        },
        {
            name: 'The Hub',
            description: 'Espacio de coworking diseñado para la colaboración y creatividad.',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
            path: '/commercial/hub',
            category: 'commercial'
        }
    ];

    private sustainable: Catalog[] = [
        {
            name: 'Eco-Habitat',
            description: 'Vivienda autosuficiente con sistemas de recolección de agua y energía solar.',
            image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
            path: '/sustainable/eco-habitat',
            category: 'sustainable'
        },
        {
            name: 'Bosque Urbano',
            description: 'Edificio residencial con jardines verticales y ventilación natural.',
            image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&q=80&w=800',
            path: '/sustainable/bosque-urbano',
            category: 'sustainable'
        },
        {
            name: 'Green Nexus',
            description: 'Desarrollo urbano de impacto cero con materiales reciclados.',
            image: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&q=80&w=800',
            path: '/sustainable/green-nexus',
            category: 'sustainable'
        }
    ];

    getByCategory(category: string): Catalog[] {
        switch (category) {
            case 'residential': return this.residential;
            case 'commercial': return this.commercial;
            case 'sustainable': return this.sustainable;
            default: return [];
        }
    }

    getCategoryTitle(category: string): string {
        switch (category) {
            case 'residential': return 'Proyectos Residenciales';
            case 'commercial': return 'Proyectos Comerciales';
            case 'sustainable': return 'Proyectos Sostenibles';
            default: return '';
        }
    }

    getResidentials(): Catalog[] { return this.residential; }
    getCommercials(): Catalog[] { return this.commercial; }
    getSustainable(): Catalog[] { return this.sustainable; }
}