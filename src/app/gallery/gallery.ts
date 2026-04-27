import { Component, OnInit, inject, signal, PLATFORM_ID, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SanityService } from '../services/sanity.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery implements OnInit, AfterViewInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private sanityService = inject(SanityService);
  private platformId = inject(PLATFORM_ID);

  project = signal<any>(null);
  currentImageIndex = signal(0);
  map: any;

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadProject(slug);
    }
  }

  async loadProject(slug: string) {
    console.log('Loading project for slug:', slug);
    try {
      const data = await this.sanityService.getProjectBySlug(slug);
      console.log('Project data received:', data);
      this.project.set(data);
      
      if (isPlatformBrowser(this.platformId) && data?.locationCoords) {
        this.initMap(data.locationCoords);
      }
    } catch (error) {
      console.error('Error loading project:', error);
    }
  }

  ngAfterViewInit() {
    // If project data is already loaded (unlikely due to async), init map here
    const data = this.project();
    if (isPlatformBrowser(this.platformId) && data?.locationCoords) {
      this.initMap(data.locationCoords);
    }
  }

  async initMap(coords: { lat: number, lng: number }) {
    if (!isPlatformBrowser(this.platformId)) return;

    // Use dynamic import for Leaflet to avoid SSR issues completely
    const L = await import('leaflet');

    // Use CDN URLs for Leaflet markers to ensure they show up without local assets
    const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
    const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
    const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    if (this.map) {
      this.map.remove();
    }

    this.map = L.map('map').setView([coords.lat, coords.lng], 15);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(this.map);

    L.marker([coords.lat, coords.lng]).addTo(this.map)
      .bindPopup(this.project()?.title || 'Proyecto')
      .openPopup();
  }

  prevImage() {
    const gallery = this.project()?.gallery;
    if (gallery && gallery.length > 0) {
      this.currentImageIndex.set((this.currentImageIndex() - 1 + gallery.length) % gallery.length);
    }
  }

  nextImage() {
    const gallery = this.project()?.gallery;
    if (gallery && gallery.length > 0) {
      this.currentImageIndex.set((this.currentImageIndex() + 1) % gallery.length);
    }
  }

  getImageUrl(image: any) {
    return this.sanityService.getImageUrl(image).url();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
}
