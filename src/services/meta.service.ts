import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

export interface MetaTags {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private readonly siteName = 'Food Hut - Angular Chronicles';
  private readonly defaultTitle = 'Food Hut - Angular Chronicles';
  private readonly defaultDescription = 'Explore delicious food options with Food Hut, built with Angular. Modern web application showcasing Angular capabilities and best practices.';
  private readonly defaultImage = '/assets/images/food-hut-og.jpg';
  private readonly siteUrl = 'https://food-hut-angular-chronicles-1.netlify.app';

  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  updateMetaTags(metaTags: MetaTags): void {
    const fullTitle = metaTags.title === this.defaultTitle 
      ? this.defaultTitle 
      : `${metaTags.title} | ${this.siteName}`;
    
    const url = metaTags.url || this.siteUrl + this.router.url;
    const image = metaTags.image || this.defaultImage;

    this.setTitle(fullTitle);
    
    this.meta.updateTag({ 
      name: 'description', 
      content: metaTags.description || this.defaultDescription 
    });
    
    this.meta.updateTag({ 
      name: 'keywords', 
      content: metaTags.keywords || 'angular, food, restaurant, web development, typescript' 
    });
    
    this.meta.updateTag({ 
      name: 'author', 
      content: metaTags.author || 'Ricardo Camilo' 
    });

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: metaTags.description || this.defaultDescription });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: metaTags.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });

    if (metaTags.publishedTime) {
      this.meta.updateTag({ property: 'article:published_time', content: metaTags.publishedTime });
    }
    
    if (metaTags.modifiedTime) {
      this.meta.updateTag({ property: 'article:modified_time', content: metaTags.modifiedTime });
    }
    
    if (metaTags.section) {
      this.meta.updateTag({ property: 'article:section', content: metaTags.section });
    }
    
    if (metaTags.tags && metaTags.tags.length > 0) {
      metaTags.tags.forEach((tag, index) => {
        this.meta.updateTag({ property: `article:tag[${index}]`, content: tag });
      });
    }

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: metaTags.description || this.defaultDescription });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ name: 'twitter:site', content: '@ricardo_c_web' });

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'language', content: 'en' });
    this.meta.updateTag({ name: 'theme-color', content: '#DC2626' });

    this.updateCanonicalUrl(url);
  }

  setTitle(title: string): void {
    this.title.setTitle(title);
  }

  updateCanonicalUrl(url: string): void {
    let canonicalLink = this.document.querySelector('link[rel="canonical"]');
    
    if (!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonicalLink);
    }
    
    canonicalLink.setAttribute('href', url);
  }

  setHomeMeta(): void {
    this.updateMetaTags({
      title: 'Food Hut - Angular Chronicles',
      description: 'Explore delicious food options with Food Hut, built with Angular. Modern web application showcasing Angular capabilities and best practices.',
      keywords: 'angular, food, restaurant, web development, typescript, food hut, angular chronicles',
      type: 'website'
    });
  }

  setPrivacyPolicyMeta(): void {
    this.updateMetaTags({
      title: 'Privacy Policy - Food Hut',
      description: 'Read the privacy policy for Food Hut Angular Chronicles application. Learn how we handle your data and protect your privacy.',
      keywords: 'privacy policy, data protection, privacy, food hut, angular',
      type: 'website'
    });
  }

  setProductMeta(productName: string, description: string, price: string): void {
    this.updateMetaTags({
      title: `${productName} - Food Hut`,
      description: description,
      keywords: `${productName}, food, restaurant, price ${price}, food hut`,
      type: 'product',
      tags: ['food', 'restaurant', productName]
    });
  }

  generateStructuredData(data: any): void {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  removeMetaTag(name: string, attribute?: string): void {
    const selector = attribute ? `${name}="${attribute}"` : name;
    const tags = this.document.querySelectorAll(`meta[${selector}]`);
    tags.forEach(tag => tag.remove());
  }

  getDefaultMeta(): MetaTags {
    return {
      title: this.defaultTitle,
      description: this.defaultDescription,
      keywords: 'angular, food, restaurant, web development, typescript',
      author: 'Ricardo Camilo',
      image: this.defaultImage,
      url: this.siteUrl,
      type: 'website'
    };
  }
}