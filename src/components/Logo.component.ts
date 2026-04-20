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
        [alt]="'alt.foodHut' | translate"
        [width]="'112'"
        [height]="'112'"
        [className]="'w-[7rem]'"
      ></app-image>
    </a>
  `,
})
export class LogoComponent {}
