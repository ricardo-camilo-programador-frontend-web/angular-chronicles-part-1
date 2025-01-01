import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductCardComponent } from "@/components/ProductCard.component";
import { Product } from "@/types/product";
import { ButtonComponent } from "@/components/Button.component";

@Component({
  selector: "menu-section",
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ButtonComponent],
  template: `
    <section id="menu-section" class="py-16 px-4 max-w-7xl mx-auto min-h-[600px]">
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
          *ngFor="let category of categories"
          [className]="
            'px-6 py-2 rounded-full text-sm transition-all ' +
            (selectedCategory === category.id
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200')
          "
          (click)="selectCategory(category.id ?? 'dinner')"
        >
          {{ category.name }}
        </app-button>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-14"
      >
        <ng-container *ngIf="filteredProducts.length > 0; else noProducts">
          <app-product-card
            *ngFor="let product of filteredProducts"
            [product]="product"
          ></app-product-card>
        </ng-container>

        <ng-template #noProducts>
          <div class="col-span-full text-center py-8">
            <p class="text-gray-500 text-lg">
              Sorry, no products found in this category.
            </p>
          </div>
        </ng-template>
      </div>
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
      description: "Fluffy French toast topped with fresh berries, sliced bananas, and maple syrup drizzle",
      price: 12.99,
      category: "breakfast"
    },
    {
      id: 2,
      name: "Buddha Bowl",
      image: "/assets/images/buddha-bowl-sauce.webp",
      rating: 4.7,
      description: "Nutritious bowl with quinoa, roasted vegetables, avocado, and signature tahini sauce",
      price: 14.99,
      category: "lunch"
    },
    {
      id: 3,
      name: "Cheese Bacon Burger",
      image: "/assets/images/cheese-bacon-burger.webp",
      rating: 4.6,
      description: "Premium beef patty with melted cheddar, crispy bacon, fresh vegetables, and special sauce",
      price: 16.99,
      category: "dinner"
    },
    {
      id: 4,
      name: "Crispy Chicken Burger",
      image: "/assets/images/crispy-chicken-burger.webp",
      rating: 4.5,
      description: "Crunchy breaded chicken fillet with lettuce, tomato, and honey mustard sauce",
      price: 15.99,
      category: "lunch"
    },
    {
      id: 5,
      name: "Grilled Chicken Plate",
      image: "/assets/images/grilled-chicken-plate.webp",
      rating: 4.4,
      description: "Herb-marinated grilled chicken breast served with seasonal vegetables and rice",
      price: 17.99,
      category: "dinner"
    },
    {
      id: 6,
      name: "Grilled Salmon & Vegetables",
      image: "/assets/images/grilled-salmon-vegetables.webp",
      rating: 4.9,
      description: "Fresh Atlantic salmon fillet with grilled asparagus and roasted vegetables",
      price: 24.99,
      category: "dinner"
    },
    {
      id: 7,
      name: "Mixed Grill Platter",
      image: "/assets/images/mixed-grill.webp",
      rating: 4.7,
      description: "Assortment of grilled meats including chicken, beef, and lamb with grilled vegetables",
      price: 28.99,
      category: "dinner"
    },
    {
      id: 8,
      name: "Salmon Salad",
      image: "/assets/images/salmon-salad-plate.webp",
      rating: 4.8,
      description: "Grilled salmon fillet on a bed of mixed greens with avocado and citrus vinaigrette",
      price: 19.99,
      category: "lunch"
    },
    {
      id: 9,
      name: "Shrimp Scampi",
      image: "/assets/images/shrimp-scampi.webp",
      rating: 4.7,
      description: "Succulent shrimp sautéed in garlic butter white wine sauce over linguine pasta",
      price: 22.99,
      category: "italian"
    }
  ];

  get filteredProducts() {
    if (this.selectedCategory === null) {
      return this.products;
    }

    return this.products.filter(
      (product) => product.category === this.selectedCategory
    );
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = this.selectedCategory === categoryId ? null : categoryId;
  }
}
