import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { LogoComponent } from "@/components/Logo.component";
import { DownloadShortcutBlock } from "@/blocks/downloadShortcut/DownloadShortcut.block";
import { MobileMenuComponent } from "@/components/MobileMenu.component";
import { HEADER_NAVIGATION_ITEMS } from "@/constants/navigation.constants";
import type { NavigationItem } from "@/types/navigation.types";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [NgFor, LogoComponent, DownloadShortcutBlock, MobileMenuComponent],
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
            class="text-gray-700 hover:text-red-500 transition-colors"
          >
            {{ item.label }}
          </a>
        </nav>

        <download-shortcut [className]="'hidden lg:block'"></download-shortcut>
      </div>

      <button
        (click)="toggleMobileMenu()"
        class="lg:hidden p-2 z-[11]"
        aria-label="Open navigation menu"
        [attr.aria-expanded]="isMobileMenuOpen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </header>

    <app-mobile-menu
      [isOpen]="isMobileMenuOpen"
      (closeMenu)="closeMobileMenu()"
    ></app-mobile-menu>
  `,
})
export class HeaderComponent {
  menuItems: NavigationItem[]   = HEADER_NAVIGATION_ITEMS
  isMobileMenuOpen: boolean = false

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false
  }
}
