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
    apiVersion: '2023-05-03', 
  });

  private builder = imageUrlBuilder(this.client);

  async getCategories() {
    return await this.client.fetch(`*[_type == "category"] | order(order asc){ title, "slug": slug.current, description }`);
  }

  async getProjects() {
    return await this.client.fetch(`*[_type == "project"]{ 
      title, 
      "slug": slug.current, 
      mainImage, 
      location, 
      category 
    }`);
  }

  async getProjectsByCategory(category: string) {
    return await this.client.fetch(
      `*[_type == "project" && category == $category]{ 
        title, 
        "slug": slug.current, 
        mainImage, 
        location,
        description 
      }`,
      { category }
    );
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