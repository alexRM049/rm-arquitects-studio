import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Category } from './category/category';
import { Catalog } from './category/catalog/catalog';
import { ClientForm } from './client-form/client-form';
import { About } from './about/about';
import { NotFound } from './not-found/not-found';
import { Gallery } from './gallery/gallery';

export const routes: Routes = [
    {   path: 'home',
        component: Home,
        title: 'RM Architects Studio — Inicio'
    },
    {   path: 'category',
        component: Category,
        title: 'RM Architects — Categorías'
    },
    {
        path: 'catalog/:category',
        component: Catalog,
        title: 'RM Architects — Catálogo'
    },
    {
        path: 'client-form',
        component: ClientForm,
        title: 'RM Architects — Contáctanos'
    },
    {
        path: 'about',
        component: About,
        title: 'RM Architects — ¿Quiénes Somos?'
    },
    {
        path: 'gallery/:slug',
        loadComponent: () => import('./gallery/gallery').then(m => m.Gallery),
        title: 'RM Architects — Galería de Proyecto'
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: '**',
        component: NotFound,
        title: 'RM Architects — Página No Encontrada'
    },
    {
        path: 'gallery/:slug',
        component: Gallery,
        title: 'RM Architects — Galería de Proyecto'
    }
];
