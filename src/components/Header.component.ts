import { NgFor } from "@angular/common";
import { Component, inject } from "@angular/core";
import { LogoComponent } from "@/components/Logo.component";
import { DownloadShortcutBlock } from "@/blocks/downloadShortcut/DownloadShortcut.block";
import { LanguageSelectorComponent } from "@/components/LanguageSelector.component";
import { HEADER_NAVIGATION_ITEMS } from "@/constants/navigation.constants";
import { I18nService } from "@/services/i18n.service";
import type { NavigationItem } from "@/types/navigation.types";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [NgFor, LogoComponent, DownloadShortcutBlock, LanguageSelectorComponent],
  template: `
    <header
      class="w-screen mx-auto flex justify-between items-center  px-4 py-4 fixed top-0 left-0 right-0 z-[9]  bg-gradient-to-b from-white via-white to-[#FFF9F3]/20"
    >
      <div class="md:max-w-[900px] lg:max-w-[1400px] mx-auto flex justify-between items-center w-full">
        <app-logo></app-logo>
        <nav class="hidden lg:flex items-center space-x-8">
          <a
            *ngFor="let item of menuItems"
            [href]="item.link"
            [attr.aria-label]="translate(item.ariaLabel ?? item.label)"
            class="text-gray-700 hover:text-red-500 transition-colors"
          >
            {{ translate(item.label) }}
          </a>
          <app-language-selector></app-language-selector>
        </nav>

        <div class="hidden lg:flex items-center gap-3">
          <app-language-selector></app-language-selector>
          <download-shortcut></download-shortcut>
        </div>
      </div>

      <div class="lg:hidden flex items-center gap-2">
        <app-language-selector></app-language-selector>
        <button
          (click)="toggleMobileMenu()"
          class="p-2 z-[11]"
          [attr.aria-label]="openMenuLabel"
          [attr.aria-expanded]="isMobileMenuOpen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  private i18nService = inject(I18nService);

  menuItems: NavigationItem[]   = HEADER_NAVIGATION_ITEMS
  isMobileMenuOpen: boolean = false

  get openMenuLabel() { return this.i18nService.translations().header.openMenu }

  translate(key: string): string {
    const keys = key.split('.');
    let result: unknown = this.i18nService.translations();
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = (result as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof result === 'string' ? result : key;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false
  }
}
