import { Component, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductCardComponent } from "@/components/ProductCard.component";
import { ImageComponent } from "@/components/Image.component";
import { Product } from "@/types/product.types";

@Component({
  selector: "special-offers-section",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ProductCardComponent, ImageComponent],
  template: `
    <section id="special-offers-section" class="py-12 px-4 max-w-7xl mx-auto min-h-[38rem] flex flex-col justify-center items-center gap-24 relative">
      <app-image
        [src]="'assets/svg/circular-dots-pattern.svg'"
        [alt]="'Circular dots pattern'"
        [className]="'w-[160px] h-auto absolute top-[27rem] -left-[7rem]'"
      ></app-image>

      <app-image
        [src]="'assets/svg/pine-branch.svg'"
        [alt]="'Pine branch'"
        [className]="'w-[160px] h-auto absolute -bottom-16 -right-[3rem] md:-right-[12rem]'"
      ></app-image>

      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold">
          Today <span class="text-red-500">Special</span> Offers
        </h2>
        <p class="text-gray-600 mt-2 max-w-2xl mx-auto">
          Discover our handpicked selection of daily specials, featuring irresistible dishes at amazing prices. From savory kebabs to flavorful curries, treat yourself to exceptional meals that won't break the bank.
        </p>
      </div>

      <div class="hidden md:flex flex-wrap lg:flex-nowrap gap-6 gap-y-14 items-center justify-center">
        <app-product-card
          *ngFor="let product of products; trackBy: trackByProduct"
          [product]="product"
        ></app-product-card>
      </div>

      <div class="flex md:hidden flex-nowrap gap-6 gap-y-14 items-center justify-center overflow-hidden min-h-[35rem]">
        <div class="flex flex-nowrap gap-6 gap-y-14 items-center justify-center">
          <app-product-card
            [product]="products[0]"
          ></app-product-card>
        </div>
      </div>
    </section>
  `,
})

export class SpecialOffersSection {
  products: Product[] = [
    {
      id: 1,
      name: "Kebab",
      image: "/assets/images/kebab.webp",
      rating: 4.5,
      description:
        "A delicious dish made from meat, often served with vegetables and rice.",
      price: 15.99,
      category: "dinner",
      users: [
        {
          id: "1",
          imagePath: "default-avatar.webp",
          name: "Ethan Thompson",
        },
        {
          id: "2",
          imagePath: "default-avatar.webp",
          name: "Lily Patel",
        },
        {
          id: "3",
          imagePath: "default-avatar.webp",
          name: "Oliver Lee",
        },
      ],
    },
    {
      id: 2,
      name: "Chicken Tikka",
      image: "/assets/images/chicken-tikka.webp",
      rating: 4.8,
      description:
        "A popular Indian dish made from chunks of chicken marinated in spices and yogurt.",
      price: 12.99,
      category: "dinner",
      users: [
        {
          id: "4",
          imagePath: "default-avatar.webp",
          name: "Ava Martin",
        },
        {
          id: "5",
          imagePath: "default-avatar.webp",
          name: "Noah Brown",
        },
        {
          id: "6",
          imagePath: "default-avatar.webp",
          name: "Sophia Davis",
        },
      ],
    },
    {
      id: 3,
      name: "Desi Chowmein",
      image: "/assets/images/chowmein.webp",
      rating: 4.2,
      description:
        "A Chinese stir-fried noodle dish that is popular in India.",
      price: 10.99,
      category: "dinner",
      users: [
        {
          id: "7",
          imagePath: "default-avatar.webp",
          name: "Mia Taylor",
        },
        {
          id: "8",
          imagePath: "default-avatar.webp",
          name: "Isabella Johnson",
        },
        {
          id: "9",
          imagePath: "default-avatar.webp",
          name: "Alexander Smith",
        },
      ],
    },
    {
      id: 4,
      name: "Chicken Chawarma",
      image: "/assets/images/chawarma.webp",
      rating: 4.6,
      description:
        "A Middle Eastern dish made from meat, often served with pita bread.",
      price: 13.99,
      category: "dinner",
      users: [
        {
          id: "10",
          imagePath: "default-avatar.webp",
          name: "Charlotte Williams",
        },
        {
          id: "11",
          imagePath: "default-avatar.webp",
          name: "Benjamin Jones",
        },
        {
          id: "12",
          imagePath: "default-avatar.webp",
          name: "Abigail Brown",
        },
      ],
    },
  ];

  trackByProduct(_index: number, product: Product): string {
    return String(product.id);
  }
}
