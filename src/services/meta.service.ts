import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { PageMetadata } from '@/types/seo.types';

const SITE_NAME = 'Food Hut';

@Injectable({ providedIn: 'root' })
export class MetaService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT) as Document;

  updateMetadata(data: PageMetadata): void {
    this.title.setTitle(`${data.title} | ${SITE_NAME}`);

    this.meta.updateTag({ name: 'description', content: data.description });

    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:type', content: data.type ?? 'website' });

    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
      this.meta.updateTag({ name: 'twitter:image', content: data.image });
    }

    if (data.url) {
      this.meta.updateTag({ property: 'og:url', content: data.url });
      this.meta.updateTag({ name: 'twitter:url', content: data.url });

      const link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
      if (link) {
        link.href = data.url;
      }
    }

    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });

    if (data.structuredData) {
      this.injectStructuredData(data.structuredData);
    }
  }

  injectStructuredData(data: Record<string, unknown>): void {
    this.removeStructuredData();

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-lighthouse-structured-data', '');
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  removeStructuredData(): void {
    const existingScripts = this.document.querySelectorAll('script[data-lighthouse-structured-data]');
    existingScripts.forEach((script: Element) => script.remove());
  }
}
