import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from "@angular/core";
import { LogoComponent } from "@/components/Logo.component";
import { DownloadShortcutBlock } from "@/blocks/downloadShortcut/DownloadShortcut.block";
import { HEADER_NAVIGATION_ITEMS } from "@/constants/navigation.constants";

@Component({
  selector: "app-mobile-menu",
  standalone: true,
  imports: [CommonModule, LogoComponent, DownloadShortcutBlock],
  template: `
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 transition-opacity duration-300 z-[8]"
      [class.opacity-0]="!isOpen"
      [class.opacity-100]="isOpen"
      [class.pointer-events-none]="!isOpen"
      [attr.aria-hidden]="!isOpen"
      (click)="close()"
    ></div>

    <!-- Menu Panel -->
    <nav
      #menuPanel
      class="fixed top-0 left-0 h-full w-[80vw] max-w-[300px] bg-[#1a1a2e] z-[10] flex flex-col transform transition-transform duration-300 ease-in-out overflow-y-auto"
      [class.-translate-x-full]="!isOpen"
      [class.translate-x-0]="isOpen"
      [attr.aria-hidden]="!isOpen"
      role="dialog"
      aria-label="Navigation menu"
    >
      <!-- Header with logo and close button -->
      <div class="flex items-center justify-between p-4 border-b border-white/10">
        <app-logo></app-logo>
        <button
          (click)="close()"
          class="text-white/70 hover:text-red-500 transition-colors p-1"
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Navigation Items -->
      <ul class="flex flex-col gap-1 p-4 flex-1">
        <li *ngFor="let item of menuItems">
          <a
            [href]="item.link"
            [attr.aria-label]="item.ariaLabel"
            class="block text-lg text-white/80 hover:text-red-500 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
            (click)="close()"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>

      <!-- Download Section -->
      <div class="p-4 border-t border-white/10">
        <download-shortcut [className]="'w-full justify-center'"></download-shortcut>
      </div>
    </nav>
  `
})
export class MobileMenuComponent {
  @Input() isOpen: boolean = false
  @Output() closeMenu = new EventEmitter<void>()

  @ViewChild("menuPanel") menuPanel!: ElementRef<HTMLElement>

  menuItems = HEADER_NAVIGATION_ITEMS

  close(): void {
    this.closeMenu.emit()
  }

  @HostListener("document:keydown.escape")
  onEscape(): void {
    if (this.isOpen) {
      this.close()
    }
  }
}
