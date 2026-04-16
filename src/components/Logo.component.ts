import { Component } from "@angular/core";
import { ImageComponent } from "./Image.component";
import { TranslatePipe } from "@/pipes/translate.pipe";

@Component({
  selector: "app-logo",
  standalone: true,
  imports: [ImageComponent, TranslatePipe],
  template: `
    <a class="flex items-center z-[999]" [href]="'#intro-section'" rel="home">
      <app-image
        [src]="'assets/logo.svg'"
        [alt]="'Food Hut'"
        [className]="'w-[7rem]'"
      ></app-image>
      <span class="text-2xl font-bold ml-2 sr-only">{{ 'logo.srOnly' | translate }}</span>
    </a>
  `,
})
export class LogoComponent {}
