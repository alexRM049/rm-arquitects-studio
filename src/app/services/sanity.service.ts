// src/app/services/sanity.service.ts
import { Injectable } from '@angular/core';
import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

@Injectable({ providedIn: 'root' })
export class SanityService {
  private client = createClient({
    projectId: 'bf7wfpdc', 
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-05-07', 
  });

  private builder = imageUrlBuilder(this.client);

  async getCategories() {
    return await this.client.fetch(`*[_type == "category"] | order(order asc){ title, "slug": slug.current, description }`);
  }

  /**
   * getProjects: Fetches every project from Sanity.
   * Used for the 'Todos los Proyectos' view.
   */
  async getProjects() {
    console.log('SanityService: Fetching all projects...');
    try {
      const projects = await this.client.fetch(`*[_type == "project"] | order(_createdAt desc){ 
        title, 
        "slug": slug.current, 
        mainImage, 
        location, 
        category 
      }`);
      console.log(`SanityService: Successfully fetched ${projects?.length || 0} projects.`);
      return projects;
    } catch (error) {
      console.error('SanityService: Error fetching all projects:', error);
      throw error;
    }
  }

  /**
   * getProjectsByCategory: Fetches projects filtered by a specific category slug.
   * Uses the 'match' operator which is more robust for string comparisons.
   */
  async getProjectsByCategory(category: string) {
    console.log(`SanityService: Fetching projects for category: ${category}`);
    try {
      // Using 'match' for more flexible string comparison (ignores case/whitespace)
      const projects = await this.client.fetch(
        `*[_type == "project" && category match $category]{ 
          title, 
          "slug": slug.current, 
          mainImage, 
          location,
          description,
          category
        }`,
        { category }
      );
      console.log(`SanityService: Found ${projects?.length || 0} projects for ${category}`);
      return projects;
    } catch (error) {
      console.error(`SanityService: Error fetching projects for ${category}:`, error);
      throw error;
    }
  }

  async getProjectBySlug(slug: string) {
    return await this.client.fetch(
      `*[_type == "project" && slug.current == $slug][0]{ 
        title, 
        description, 
        location, 
        locationCoords, 
        gallery, 
        mainImage 
      }`,
      { slug }
    );
  }

  getImageUrl(source: any) {
    if (!source || !source.asset) {
      // Return a professional architectural placeholder if no image is found
      return { url: () => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200' };
    }
    return this.builder.image(source);
  }
}