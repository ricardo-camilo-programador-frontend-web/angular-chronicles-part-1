import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "user-preview",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <img
      [src]="'assets/images/' + imagePath"
      [alt]="'user-avatar of ' + name"
      [title]="'user-avatar of ' + name"
      class="min-w-4 w-[6rem] scale-150 rounded-full object-cover border-4 border-white bg-blue-500"
    />
  `,
})

export class UserPreview {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) imagePath!: string;
  @Input({ required: true }) name!: string;
}
