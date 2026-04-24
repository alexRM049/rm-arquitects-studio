// src/app/services/sanity.service.ts
import { Injectable } from '@angular/core';
import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

@Injectable({ providedIn: 'root' })
export class SanityService {
  private client = createClient({
    projectId: 'YOUR_PROJECT_ID', // Found in your sanity.cli.ts
    dataset: 'production',
    useCdn: true,
    apiVersion: '2026-04-24', 
  });



  private builder = imageUrlBuilder(this.client);

  async getProjects() {
    return await this.client.fetch(`*[_type == "project"]{ title, slug, mainImage, location }`);
  }

  getImageUrl(source: any) {
    return this.builder.image(source);
  }

  
}