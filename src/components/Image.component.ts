import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-image',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf],
  template: `
    <div class="image-container">
      <img
        [src]="getOptimizedSrc()"
        [srcset]="getSrcSet()"
        [sizes]="getSizes()"
        [alt]="alt"
        [attr.width]="width.toString()"
        [attr.height]="height.toString()"
        [loading]="loading"
        [class]="className"
        [style.aspect-ratio]="aspectRatio"
        [style.object-fit]="objectFit"
        [attr.decoding]="'async'"
        [attr.fetchpriority]="getFetchPriority()"
        (load)="onImageLoad()"
        (error)="onImageError()"
      />
      
      <!-- Loading skeleton for better UX -->
      <div *ngIf="!imageLoaded && loading === 'lazy'" 
           class="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"
           [style.width]="width"
           [style.height]="height">
      </div>
    </div>
  `,
  styles: [`
    .image-container {
      position: relative;
      display: inline-block;
      overflow: hidden;
    }
    
    img {
      transition: opacity 0.3s ease-in-out;
    }
    
    img:not([src]), 
    img[src=""] {
      visibility: hidden;
    }
  `]
})

export class ImageComponent {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() width: string = 'auto';
  @Input() height: string = 'auto';
  @Input() loading: string = 'lazy';
  @Input() className: string = '';
  @Input() aspectRatio: string = 'auto';
  @Input() objectFit: string = 'cover';
  @Input() isCritical: boolean = false;
  @Input() mobileQuality: number = 60;

  imageLoaded = false;

  getOptimizedSrc() {
    return this.src;
  }

  getSrcSet() {
    return `${this.src} 1x, ${this.src} 2x`;
  }

  getSizes() {
    return `(max-width: 375px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw`;
  }

  getFetchPriority() {
    return this.isCritical || this.loading === 'eager' ? 'high' : 'auto';
  }

  onImageLoad() {
    this.imageLoaded = true;
  }

  onImageError() {
    this.imageLoaded = true;
  }
}
