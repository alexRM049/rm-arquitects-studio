import { Injectable } from "@angular/core";
import { Catalog } from "../category/catalog/catalog.model";

@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    private residencials: Catalog[] = [
        {
            name: 'Villa Serena',
            description: 'Residencia minimalista con integración de luz natural y espacios abiertos.',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
            path: '/residential/villa-serena',
            category: 'residencials'
        },
        {
            name: 'Casa del Lago',
            description: 'Arquitectura contemporánea que armoniza con el entorno acuático.',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
            path: '/residential/casa-lago',
            category: 'residencials'
        },
        {
            name: 'Urban Loft',
            description: 'Espacio industrial rediseñado para la vida urbana moderna.',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
            path: '/residential/urban-loft',
            category: 'residencials'
        }
    ]

    private commercials: Catalog[] = [
        {
            name: 'Centro Corporativo Nova',
            description: 'Edificio de oficinas de alta tecnología con certificación LEED.',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
            path: '/commercial/nova',
            category: 'commercials'
        },
        {
            name: 'Skyline Plaza',
            description: 'Complejo comercial con diseño vanguardista en el corazón de la ciudad.',
            image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800',
            path: '/commercial/skyline',
            category: 'commercials'
        },
        {
            name: 'The Hub',
            description: 'Espacio de coworking diseñado para la colaboración y creatividad.',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
            path: '/commercial/hub',
            category: 'commercials'
        }
    ]

    private sustainable: Catalog[] = [
        {
            name: 'Eco-Habitat',
            description: 'Vivienda autosuficiente con sistemas de recolección de agua y energía solar.',
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
            path: '/sustainable/eco-habitat',
            category: 'sustainable'
        },
        {
            name: 'Bosque Urbano',
            description: 'Edificio residencial con jardines verticales y ventilación natural.',
            image: 'https://images.unsplash.com/photo-1545641203-7d072a14e3b2?auto=format&fit=crop&q=80&w=800',
            path: '/sustainable/bosque-urbano',
            category: 'sustainable'
        },
        {
            name: 'Green Nexus',
            description: 'Desarrollo urbano de impacto cero con materiales reciclados.',
            image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800',
            path: '/sustainable/green-nexus',
            category: 'sustainable'
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