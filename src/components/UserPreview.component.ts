import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslatePipe } from "@/pipes/translate.pipe";

@Component({
  selector: "user-preview",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslatePipe],
  template: `
    <img
      [src]="'assets/images/' + imagePath"
      [alt]="'userPreview.avatarOf' | translate"
      [title]="'userPreview.avatarOf' | translate"
      class="min-w-4 w-[6rem] scale-150 rounded-full object-cover border-4 border-white bg-blue-500"
    />
  `,
})

export class UserPreview {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) imagePath!: string;
  @Input({ required: true }) name!: string;
}
