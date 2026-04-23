import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Category } from './category/category';
import { Catalog } from './category/catalog/catalog';
import { CilentForm } from './cilent-form/cilent-form';
import { About } from './about/about';

export const routes: Routes = [
    {   path: 'home', 
        component: Home, 
        title: 'Pantalla Principal'
    },
    {   path: 'category', 
        component: Category, 
        title: 'Categorias'
    },
    {
        path: 'catalog',
        component: Catalog,
        title: 'Catalogos'
    },
    {
        path: 'client-form',
        component: CilentForm,
        title: 'Contactanos'
    },
    {
        path: 'about',
        component: About,
        title: '¿Quienes somos?'
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];
