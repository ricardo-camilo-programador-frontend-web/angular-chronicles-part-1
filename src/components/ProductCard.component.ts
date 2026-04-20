import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { ImageComponent } from "@/components/Image.component";
import { UserPreview } from "@/components/UserPreview.component";
import { getRandomLinkForRedirection } from "@/utils/getRandomLinkForRedirection";
import { TranslatePipe } from "@/pipes/translate.pipe";
import { ImageOptimizer } from "@/utils/image-optimizer";
import { NgIf } from "@angular/common";
import type { Product } from "@/types/product.types";

@Component({
  selector: "app-product-card",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImageComponent, UserPreview, TranslatePipe, NgIf],
  template: `
    <div
      class="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow w-[19rem] h-[33rem] relative bg-gradient-to-b from-white via-white  to-red-500/30 {{ className }}"
      [class.loading]="!imageLoaded"
    >
      <div class="relative mb-3">
        <app-image
          [src]="'assets/svg/semicircle.svg'"
          [alt]="'alt.semicircle' | translate"
          [width]="'240'"
          [height]="'120'"
          [className]="
            'w-[15rem] h-auto -top-6 left-[1rem] object-contain absolute rotate-180'
          "
          [loading]="'lazy'"
        ></app-image>

        <!-- Product Image with Mobile-Optimized Loading -->
        <div class="relative">
          <app-image
            [src]="optimizedProductImage"
            [alt]="product.name | translate"
            [width]="'384'"
            [height]="'384'"
            [className]="'w-[12rem] h-[12rem] object-cover rounded-lg mx-auto transition-opacity duration-300'"
            [style.opacity]="imageLoaded ? 1 : 0"
            [loading]="'eager'"
            [isCritical]="true"
            [mobileQuality]="50"
            (load)="onImageLoad()"
            (error)="onImageError()"
          />
          
          <!-- Loading Skeleton -->
          <div *ngIf="!imageLoaded" 
               class="w-[12rem] h-[12rem] object-cover rounded-lg mx-auto bg-gray-200 animate-pulse">
          </div>
        </div>

        <p class="text-white text-xs font-bold rounded-full px-2 py-1 bg-amber-700 w-[4rem] h-[4rem] flex items-center justify-center truncate absolute right-12 -mt-12 border-4 border-white">
          {{ product.price }} {{ 'currency.symbol' | translate }}
        </p>
      </div>

      <div class="flex w-full items-center justify-center">
        <div
          class="flex items-center justify-center gap-1 px-2 py-1 rounded-full text-sm mx-auto w-full max-w-[17rem]"
        >
          <div class="grid grid-cols-3 h-16 items-center justify-center w-[5rem]">
            @for (user of product.users; track user.id) {
              <user-preview
                [id]="user.id"
                [imagePath]="user.imagePath"
                [name]="user.name"
              ></user-preview>
            }
          </div>

          <div class="flex items-center gap-1">
<app-image
               [src]="'assets/svg/star.svg'"
               [alt]="'alt.rating' | translate"
[width]="'32'"
                [height]="'32'"
               [className]="'w-8 h-8'"
               [loading]="'lazy'"
             />
            <span>({{ product.rating }})</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2 items-center mt-6">
        <h3 class="font-semibold text-lg mb-2 text-red-500">
          {{ product.name | translate }}
        </h3>
        <p class="text-gray-600 text-sm mb-4 max-w-[15rem] text-center px-2">
          {{ product.description | translate }}
        </p>
      </div>

      <a
        [href]="[getRandomLinkForRedirection()]"
        class="bg-red-700 text-white px-4 py-2 rounded-full text-sm hover:bg-red-800 focus:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors absolute -bottom-4 inset-x-0 w-[8rem] mx-auto text-center underline decoration-transparent hover:decoration-white focus:decoration-white decoration-2"
        rel="noopener"
        target="_blank"
        [attr.aria-label]="('productCard.orderNow' | translate) + ': ' + (product.name | translate)"
      >
        {{ 'productCard.orderNow' | translate }}
        <span class="sr-only">: {{ product.name | translate }}</span>
      </a>
    </div>
  `,
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() className: string = '';

  imageLoaded = false;
  optimizedProductImage = '';

  ngOnInit() {
    this.optimizedProductImage = ImageOptimizer.optimizeImage(this.product.image, {
      width: 384,
      height: 384,
      quality: 80,
      format: 'webp'
    });
  }

  onImageLoad() {
    this.imageLoaded = true;
  }

  onImageError() {
    this.optimizedProductImage = this.product.image;
    this.imageLoaded = true;
  }

  getRandomLinkForRedirection() {
    return getRandomLinkForRedirection();
  }
}
