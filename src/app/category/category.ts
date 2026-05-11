import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router, RouterLink } from '@angular/router';
import { Catalog } from './catalog/catalog';

type typeCategory = {
  id: string,
  name: string;
  value: string;
}

@Component({
  selector: 'app-category',
  imports: [RouterLink, Catalog],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {

  /**
   * chosenCategory: Stores the current selection for filtering.
   * Initialized to 'all' to show all projects on page load.
   */
  chosenCategory = signal<string>('all');

  /**
   * isShown: Controls the fade-in animation of the component.
   */
  isShown = signal(false);

  /**
   * typesOfCategory: Defines the dropdown options. 
   * 'value' must match the category string used in Sanity projects.
   */
  typesOfCategory = signal<typeCategory[]>([
    { id: '1', name: 'Todos los Proyectos', value: 'all' },
    { id: '2', name: 'Residencial', value: 'residencial' },
    { id: '3', name: 'Comercial', value: 'comercial' },
    { id: '4', name: 'Oficinas', value: 'oficinas' },
    { id: '5', name: 'Uso Mixto', value: 'uso-mixto' },
    { id: '6', name: 'Hospitalidad', value: 'hospitalidad' },
    { id: '7', name: 'Diseño Interior', value: 'diseno-interior' },
    { id: '8', name: 'En Construcción', value: 'en-construccion' }
  ]);

  private categoryService = inject(CategoryService);
  categorysignal = this.categoryService.categoriesSignal;

  /**
   * Handles the dropdown change event.
   * Updates the chosenCategory signal, which is passed to the Catalog component.
   */
  onCategoryChanged(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.chosenCategory.set(select.value);
  }

  ngOnInit(): void {
    // Trigger the fade-in animation
    this.isShown.set(true);
  }
}
