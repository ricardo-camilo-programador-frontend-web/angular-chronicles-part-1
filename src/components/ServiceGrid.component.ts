import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { ServiceItem } from "@/types/ServiceItem.types";
import { ImageComponent } from "@/components/Image.component";
import { TranslatePipe } from "@/pipes/translate.pipe";

@Component({
  selector: "app-service-grid",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImageComponent, TranslatePipe],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      @for (item of serviceItems; track item.text) {
        <div
          class="flex items-center gap-3 rounded-lg transition-colors"
        >
          <app-image [src]="item.path" [alt]="item.text | translate" [width]="'32'" [height]="'32'" [className]="'w-8 h-8'"></app-image>

          <span class="text-gray-700">{{ item.text | translate }}</span>
        </div>
      }
    </div>
  `,
})

export class ServiceGridComponent {
  @Input() serviceItems: ServiceItem[] = [];
}
