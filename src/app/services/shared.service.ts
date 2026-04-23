import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    selectedCategory = signal<string  | null>('');
    selectedCategoryName = signal<string>('');

    categorySelected(category: string) {
        this.selectedCategory.set(category);
    }

    selectCategoryName(name: string) {
        this.selectedCategoryName.set(name);
    }

    getCategoryName() {
        return this.selectedCategoryName();
    }

    constructor() {}
}