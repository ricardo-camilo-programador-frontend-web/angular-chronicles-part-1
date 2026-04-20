import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from "@angular/core";
import { LogoComponent } from "@/components/Logo.component";
import { DownloadShortcutBlock } from "@/blocks/downloadShortcut/DownloadShortcut.block";
import { LanguageSelectorComponent } from "@/components/LanguageSelector.component";
import { MobileMenuComponent } from "@/components/MobileMenu.component";
import { TranslatePipe } from "@/pipes/translate.pipe";
import { HEADER_NAVIGATION_ITEMS } from "@/constants/navigation.constants";
import type { NavigationItem } from "@/types/navigation.types";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [LogoComponent, DownloadShortcutBlock, LanguageSelectorComponent, MobileMenuComponent, TranslatePipe],
  template: `
    <header
      role="banner"
      class="w-screen mx-auto flex justify-between items-center z-[999] px-4 py-4 fixed top-0 left-0 right-0 bg-gradient-to-b from-white via-white to-[#FFF9F3]/20 backdrop-blur-sm"
    >
      <div class="md:max-w-[900px] lg:max-w-[1400px] mx-auto flex justify-between items-center w-full">
        <div class="relative z-[1000]">
          <app-logo></app-logo>
        </div>

        <nav 
          role="navigation" 
          aria-label="Main navigation"
          class="hidden lg:flex items-center space-x-8"
        >
          @for (item of menuItems; track item.link) {
            <a
              [href]="item.link"
              [attr.aria-label]="item.ariaLabel! | translate"
              class="text-gray-700 hover:text-red-500 focus:text-red-700 transition-colors font-medium text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded px-2 py-1 underline decoration-transparent hover:decoration-red-500 focus:decoration-red-500 decoration-2"
              [attr.tabindex]="0"
            >
              {{ item.label | translate }}
            </a>
          }
        </nav>

        <div class="hidden lg:flex items-center gap-3" role="complementary" aria-label="Actions">
          <app-language-selector></app-language-selector>
          <download-shortcut [className]="'hidden lg:block'"></download-shortcut>
        </div>
      </div>

      <div class="flex items-center gap-2 lg:hidden" role="complementary" aria-label="Mobile controls">
        <app-language-selector></app-language-selector>
        <button
          (click)="toggleMobileMenu()"
          (keydown.enter)="toggleMobileMenu()"
          (keydown.space)="toggleMobileMenu()"
          class="p-3 z-[31] text-gray-700 hover:text-red-500 focus:text-red-700 transition-colors rounded-lg hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Open navigation menu"
          [attr.aria-expanded]="isMobileMenuOpen"
          [attr.aria-controls]="'mobile-menu'"
          [attr.aria-pressed]="isMobileMenuOpen"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <span class="sr-only">{{ isMobileMenuOpen ? 'Close menu' : 'Open menu' }}</span>
        </button>
      </div>
    </header>

    <app-mobile-menu
      id="mobile-menu"
      [isOpen]="isMobileMenuOpen"
      (closeMenu)="closeMobileMenu()"
    ></app-mobile-menu>
  `,
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('menuButton') menuButton!: ElementRef<HTMLButtonElement>;
  
  menuItems: NavigationItem[] = HEADER_NAVIGATION_ITEMS;
  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      setTimeout(() => {
        this.focusCloseButton();
      }, 100);
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    if (this.menuButton) {
      this.menuButton.nativeElement.focus();
    }
  }

  private focusCloseButton(): void {
    const closeButton = document.querySelector('#mobile-menu button[aria-label*="Close"]');
    if (closeButton instanceof HTMLElement) {
      closeButton.focus();
    }
  }

  ngAfterViewInit(): void {
    this.setupKeyboardNavigation();
  }

  private setupKeyboardNavigation(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (this.isMobileMenuOpen && event.key === 'Escape') {
        this.closeMobileMenu();
      }
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 1024 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}
