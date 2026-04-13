import { Component, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductCardComponent } from "@/components/ProductCard.component";
import { Product } from "@/types/product.types";
import { ButtonComponent } from "@/components/Button.component";

@Component({
  selector: "menu-section",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ProductCardComponent, ButtonComponent],
  template: `
    <section
      id="menu-section"
      class="py-16 px-4 max-w-7xl mx-auto min-h-[600px] md:max-w-[900px] lg:max-w-[1400px]"
    >
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold">
          Menu That
          <span class="text-red-500">Always</span>
          <span class="text-amber-400">Make You</span>
        </h2>
        <h3 class="text-3xl font-bold">
          Fall In <span class="text-red-500">Love</span>
        </h3>
      </div>

      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <app-button
          *ngFor="let category of categories; trackBy: trackByCategory"
          [className]="
            'px-6 py-2 rounded-full text-sm transition-all ' +
            (selectedCategory === category.id
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200')
          "
          (click)="selectCategory(category.id)"
        >
          {{ category.name }}
        </app-button>
      </div>

      <div
        class="hidden md:flex flex-wrap gap-6 gap-y-14 items-center justify-center"
      >
        <ng-container *ngIf="filteredProducts.length > 0; else noProducts">
          <app-product-card
            *ngFor="let product of filteredProducts; trackBy: trackByProduct"
            [product]="product"
          ></app-product-card>
        </ng-container>
      </div>

      <div
        class="flex md:hidden flex-wrap gap-6 gap-y-14 items-center justify-center overflow-hidden min-h-[35rem]"
      >
        <ng-container *ngIf="filteredProducts.length > 0; else noProducts">
          <app-product-card [product]="filteredProducts[0]"></app-product-card>
        </ng-container>
      </div>

      <ng-template #noProducts>
        <div class="col-span-full text-center py-8">
          <p class="text-gray-500 text-lg">
            Sorry, no products found in this category.
          </p>
        </div>
      </ng-template>
    </section>
  `,
})
export class MenuSection {
  selectedCategory: string | null = null;

  categories = [
    { id: "ramen", name: "Ramen" },
    { id: "breakfast", name: "Breakfast" },
    { id: "lunch", name: "Lunch" },
    { id: "dinner", name: "Dinner" },
    { id: "mexican", name: "Mexican" },
    { id: "italian", name: "Italian" },
    { id: "desserts", name: "Desserts" },
    { id: "drinks", name: "Drinks" },
  ];

  products: Product[] = [
    {
      id: 1,
      name: "Berry Banana French Toast",
      image: "/assets/images/berry-banana-french-toast.webp",
      rating: 4.8,
      description:
        "Fluffy French toast topped with fresh berries, sliced bananas, and maple syrup drizzle",
      price: 12.99,
      category: "breakfast",
      users: [
        {
          id: "1",
          imagePath: "default-avatar.webp",
          name: "Ava Thompson",
        },
        {
          id: "2",
          imagePath: "default-avatar.webp",
          name: "Ethan Patel",
        },
        {
          id: "3",
          imagePath: "default-avatar.webp",
          name: "Lily Chen",
        },
      ],
    },
    {
      id: 2,
      name: "Buddha Bowl",
      image: "/assets/images/buddha-bowl-sauce.webp",
      rating: 4.7,
      description:
        "Nutritious bowl with quinoa, roasted vegetables, avocado, and signature tahini sauce",
      price: 14.99,
      category: "lunch",
      users: [
        {
          id: "4",
          imagePath: "default-avatar.webp",
          name: "Oliver Brown",
        },
        {
          id: "5",
          imagePath: "default-avatar.webp",
          name: "Sophia Lee",
        },
        {
          id: "6",
          imagePath: "default-avatar.webp",
          name: "Mason Davis",
        },
      ],
    },
    {
      id: 3,
      name: "Cheese Bacon Burger",
      image: "/assets/images/cheese-bacon-burger.webp",
      rating: 4.6,
      description:
        "Premium beef patty with melted cheddar, crispy bacon, fresh vegetables, and special sauce",
      price: 16.99,
      category: "dinner",
      users: [
        {
          id: "7",
          imagePath: "default-avatar.webp",
          name: "Isabella Garcia",
        },
        {
          id: "8",
          imagePath: "default-avatar.webp",
          name: "Alexander Martin",
        },
        {
          id: "9",
          imagePath: "default-avatar.webp",
          name: "Charlotte Hall",
        },
      ],
    },
    {
      id: 4,
      name: "Crispy Chicken Burger",
      image: "/assets/images/crispy-chicken-burger.webp",
      rating: 4.5,
      description:
        "Crunchy breaded chicken fillet with lettuce, tomato, and honey mustard sauce",
      price: 15.99,
      category: "lunch",
      users: [
        {
          id: "10",
          imagePath: "default-avatar.webp",
          name: "Julian Sanchez",
        },
        {
          id: "11",
          imagePath: "default-avatar.webp",
          name: "Emily Taylor",
        },
        {
          id: "12",
          imagePath: "default-avatar.webp",
          name: "Benjamin White",
        },
      ],
    },
    {
      id: 5,
      name: "Grilled Chicken Plate",
      image: "/assets/images/grilled-chicken-plate.webp",
      rating: 4.4,
      description:
        "Herb-marinated grilled chicken breast served with seasonal vegetables and rice",
      price: 17.99,
      category: "dinner",
      users: [
        {
          id: "13",
          imagePath: "default-avatar.webp",
          name: "Hannah Brooks",
        },
        {
          id: "14",
          imagePath: "default-avatar.webp",
          name: "Caleb Walker",
        },
        {
          id: "15",
          imagePath: "default-avatar.webp",
          name: "Abigail Lewis",
        },
      ],
    },
    {
      id: 6,
      name: "Grilled Salmon & Vegetables",
      image: "/assets/images/grilled-salmon-vegetables.webp",
      rating: 4.9,
      description:
        "Fresh Atlantic salmon fillet with grilled asparagus and roasted vegetables",
      price: 24.99,
      category: "dinner",
      users: [
        {
          id: "16",
          imagePath: "default-avatar.webp",
          name: "Gabriel Harris",
        },
        {
          id: "17",
          imagePath: "default-avatar.webp",
          name: "Samantha Johnson",
        },
        {
          id: "18",
          imagePath: "default-avatar.webp",
          name: "Michael Brown",
        },
      ],
    },
    {
      id: 7,
      name: "Mixed Grill Platter",
      image: "/assets/images/mixed-grill.webp",
      rating: 4.7,
      description:
        "Assortment of grilled meats including chicken, beef, and lamb with grilled vegetables",
      price: 28.99,
      category: "dinner",
      users: [
        {
          id: "19",
          imagePath: "default-avatar.webp",
          name: "Olivia Williams",
        },
        {
          id: "20",
          imagePath: "default-avatar.webp",
          name: "Logan Davis",
        },
        {
          id: "21",
          imagePath: "default-avatar.webp",
          name: "Ava Rodriguez",
        },
      ],
    },
    {
      id: 8,
      name: "Shrimp Scampi",
      image: "/assets/images/shrimp-scampi.webp",
      rating: 4.7,
      description:
        "Succulent shrimp sautéed in garlic butter white wine sauce over linguine pasta",
      price: 22.99,
      category: "italian",
      users: [
        {
          id: "22",
          imagePath: "default-avatar.webp",
          name: "Ethan Hall",
        },
        {
          id: "23",
          imagePath: "default-avatar.webp",
          name: "Lily Martin",
        },
        {
          id: "24",
          imagePath: "default-avatar.webp",
          name: "Ava Patel",
        },
      ],
    },
  ];

  trackByCategory(_index: number, category: { id: string }): string {
    return category.id;
  }

  trackByProduct(_index: number, product: Product): string {
    return String(product.id);
  }

  get filteredProducts() {
    if (this.selectedCategory === null) {
      return this.products;
    }

    return this.products.filter(
      (product) => product.category === this.selectedCategory
    );
  }

  selectCategory(categoryId: string) {
    this.selectedCategory =
      this.selectedCategory === categoryId ? null : categoryId;
  }
}
