import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Category } from './category/category';

export const routes: Routes = [
    {   path: 'home', 
        component: Home, 
        title: 'Pantalla Principal'
    },
    {   path: 'category', 
        component: Category, 
        title: 'Categorias'
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];
