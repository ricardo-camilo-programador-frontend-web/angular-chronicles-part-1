import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServiceItem } from "@/types/ServiceItem.types";
import { ImageComponent } from "@/components/Image.component";

@Component({
  selector: "app-service-grid",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ImageComponent],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div
        *ngFor="let item of serviceItems; trackBy: trackByServiceItem"
        class="flex items-center gap-3 rounded-lg transition-colors"
      >
        <app-image [src]="item.path" [alt]="item.text" [className]="'w-8 h-8'"></app-image>

        <span class="text-gray-700">{{ item.text }}</span>
      </div>
    </div>
  `,
})

export class ServiceGridComponent {
  @Input() serviceItems: ServiceItem[] = [];

  trackByServiceItem(index: number, item: ServiceItem): string {
    return item.text;
  }
}
