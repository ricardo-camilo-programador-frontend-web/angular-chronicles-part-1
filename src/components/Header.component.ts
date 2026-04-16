import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { LogoComponent } from "@/components/Logo.component";
import { DownloadShortcutBlock } from "@/blocks/downloadShortcut/DownloadShortcut.block";
import { LanguageSelectorComponent } from "@/components/LanguageSelector.component";
import { TranslatePipe } from "@/pipes/translate.pipe";
import { HEADER_NAVIGATION_ITEMS } from "@/constants/navigation.constants";
import type { NavigationItem } from "@/types/navigation.types";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [NgFor, LogoComponent, DownloadShortcutBlock, LanguageSelectorComponent, TranslatePipe],
  template: `
    <header
      class="w-screen mx-auto flex justify-between items-center  px-4 py-4 fixed top-0 left-0 right-0 z-[9]  bg-gradient-to-b from-white via-white to-[#FFF9F3]/20"
    >
      <div class="md:max-w-[900px] lg:max-w-[1400px] mx-auto flex justify-between items-center w-full">
        <app-logo></app-logo>
        <nav class="hidden lg:flex space-x-8">
          <a
            *ngFor="let item of menuItems"
            [href]="item.link"
            [attr.aria-label]="item.ariaLabel! | translate"
            class="text-gray-700 hover:text-red-500 transition-colors"
          >
            {{ item.label | translate }}
          </a>
        </nav>

        <div class="flex items-center gap-3">
          <app-language-selector></app-language-selector>
          <download-shortcut [className]="'hidden lg:block'"></download-shortcut>
        </div>
      </div>

      <div class="lg:hidden">
        {{ 'header.menu' | translate }}
      </div>
    </header>
  `,
})
export class HeaderComponent {
  menuItems: NavigationItem[] = HEADER_NAVIGATION_ITEMS;
}
