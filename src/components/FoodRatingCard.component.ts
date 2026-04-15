import { Component, Input } from "@angular/core";
import { ImageComponent } from "./Image.component";

@Component({
  selector: "app-food-rating-card",
  standalone: true,
  imports: [ImageComponent],
  template: `
    <div class="absolute inset-0 bg-transparent p-2 mt-[3rem] lg:mt-[5rem] -ml-24 lg:-ml-9 {{ className }}">
      <div
        class="min-h-[6rem]  flex items-center space-x-2 bg-white w-max min-w-[10rem] p-1 px-3 border border-gray-100 rounded-lg shadow-lg"
      >
        <app-image
          [src]="imageSrc"
          [alt]="name"
          [className]="'w-12 h-12 rounded'"
        />
        <div>
          <p class="font-medium">{{ name }}</p>
          <div class="flex items-center space-x-2">
            @for (star of stars; track $index) {
            <app-image
              [src]="
                star ? '/assets/svg/star.svg' : '/assets/svg/starEmpty.svg'
              "
              [alt]="star ? 'Star' : 'Star empty'"
              [className]="'w-4 h-4'"
              title="Note of the food is {{ rating }}"
            />
            }
          </div>

          <p class="text-sm text-gray-600">{{ "$" + price }}</p>
        </div>
      </div>
    </div>
  `,
})

export class FoodRatingCardComponent {
  @Input() imageSrc: string = "";
  @Input() name: string = "";
  @Input() rating: number = 0;
  @Input() price: number = 0;
  @Input() className: string = "";

  get stars(): boolean[] {
    return Array(5)
      .fill(0)
      .map((_, index) => index < this.rating);
  }
}
