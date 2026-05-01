import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, AfterViewInit, ChangeDetectorRef, NgZone } from "@angular/core";
import { DownloadShortcutBlock } from "@/blocks/downloadShortcut/DownloadShortcut.block";
import { TranslatePipe } from "@/pipes/translate.pipe";
import { HEADER_NAVIGATION_ITEMS } from "@/constants/navigation.constants";
import type { NavigationItem } from "@/types/navigation.types";

@Component({
  selector: "app-mobile-menu",
  standalone: true,
  imports: [DownloadShortcutBlock, TranslatePipe],
  template: `
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out z-[55]"
      [class.opacity-0]="!isOpen"
      [class.opacity-100]="isOpen"
      [class.pointer-events-none]="!isOpen"
      [attr.aria-hidden]="!isOpen"
      [attr.inert]="!isOpen"
      (click)="close()"
      role="presentation"
    ></div>

    <!-- Menu Panel -->
    <nav
      #menuPanel
      class="fixed top-0 left-0 h-full w-[85vw] max-w-[320px] pt-[2rem] bg-gradient-to-b from-[#2d0a0a] via-red-950 to-[#1a0505] shadow-2xl z-[998] flex flex-col transform transition-transform duration-300 ease-in-out overflow-hidden"
      [class.-translate-x-full]="!isOpen"
      [class.translate-x-0]="isOpen"
      [attr.aria-hidden]="!isOpen"
      [attr.aria-modal]="isOpen"
      [attr.inert]="!isOpen"
      role="dialog"
      aria-label="Mobile navigation menu"
      [attr.aria-labelledby]="'mobile-menu-title'"
    >
      <!-- Header with close button -->
      <div class="flex items-center justify-between px-4 py-4 border-b border-red-900/50 bg-gradient-to-r from-red-950 to-red-900/80">
        <div class="flex items-center space-x-3">
          <span id="mobile-menu-title" class="text-white font-semibold text-lg">Food Hut</span>
        </div>
        <button
          #closeButton
          (click)="close()"
          (keydown.enter)="close()"
          (keydown.space)="close()"
          class="text-red-300/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-red-800/40 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-red-950"
          aria-label="Close navigation menu"
          [attr.aria-pressed]="isOpen"
          [attr.tabindex]="isOpen ? '0' : '-1'"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          <span class="sr-only">Close menu</span>
        </button>
      </div>

      <!-- Navigation Items -->
      <div class="flex-1 overflow-y-auto" role="navigation" aria-label="Mobile menu navigation">
        <ul class="flex flex-col divide-y divide-red-900/40" role="list">
          @for (item of menuItems; track item.link) {
            <li role="listitem">
              <a
                [href]="item.link"
                [attr.aria-label]="item.ariaLabel! | translate"
                class="group block text-red-100/90 hover:text-white hover:bg-red-800/40 transition-all duration-200 py-4 px-6 text-base font-medium flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-inset"
                (click)="onMenuItemClick($event, item)"
                (keydown.enter)="onMenuItemKeyDown($event, item)"
                (keydown.space)="onMenuItemKeyDown($event, item)"
                [attr.tabindex]="isOpen ? '0' : '-1'"
                role="menuitem"
              >
                <span>{{ item.label | translate }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-red-400/50 group-hover:text-red-300 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </li>
          }
        </ul>
      </div>

      <!-- Download Section -->
      <div class="px-4 py-4 border-t border-red-900/50 bg-red-950/60" role="complementary" aria-label="Download option">
        <download-shortcut [className]="'w-full justify-center py-3 px-4 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400'"></download-shortcut>
      </div>
    </nav>
  `
})
export class MobileMenuComponent implements AfterViewInit {
  @Input() isOpen: boolean = false
  @Output() closeMenu = new EventEmitter<void>()

  @ViewChild("menuPanel") menuPanel!: ElementRef<HTMLElement>
  @ViewChild("closeButton") closeButton!: ElementRef<HTMLButtonElement>

  menuItems = HEADER_NAVIGATION_ITEMS
  private lastFocusedElement: HTMLElement | null = null

  close(): void {
    this.closeMenu.emit()
  }

  onMenuItemClick(event: Event, item: NavigationItem): void {
    event.preventDefault()
    
    const targetElement = document.querySelector(item.link)
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      
      this.announceToScreenReader(`Navigated to ${item.label}`)
    }
    
    this.close()
  }

  onMenuItemKeyDown(event: Event, item: NavigationItem): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
      keyboardEvent.preventDefault();
      this.onMenuItemClick(event, item);
    }
  }

  @HostListener("document:keydown.escape")
  onEscape(): void {
    if (this.isOpen) {
      this.close()
    }
  }

  @HostListener("document:keydown", ["$event"])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen) return

    if (event.key === 'Tab') {
      const focusableElements = this.getFocusableElements()
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement?.focus()
        }
      }
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const menuItems = this.getMenuItems()
      const currentIndex = menuItems.indexOf(document.activeElement as HTMLElement)
      
      if (currentIndex !== -1) {
        event.preventDefault()
        const nextIndex = event.key === 'ArrowDown' 
          ? Math.min(currentIndex + 1, menuItems.length - 1)
          : Math.max(currentIndex - 1, 0)
        
        menuItems[nextIndex]?.focus()
      }
    }
  }

  private getFocusableElements(): HTMLElement[] {
    if (!this.menuPanel) return []
    
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ')
    
    return Array.from(
      this.menuPanel.nativeElement.querySelectorAll(focusableSelectors)
    ) as HTMLElement[]
  }

  private getMenuItems(): HTMLElement[] {
    if (!this.menuPanel) return []
    
    return Array.from(
      this.menuPanel.nativeElement.querySelectorAll('a[role="menuitem"]')
    ) as HTMLElement[]
  }

  private announceToScreenReader(message: string): void {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  ngAfterViewInit(): void {
    this.setupAccessibility()
  }

  private setupAccessibility(): void {
    if (this.isOpen) {
      this.lastFocusedElement = document.activeElement as HTMLElement
    }

    if (this.isOpen && this.closeButton) {
      setTimeout(() => {
        this.closeButton.nativeElement.focus()
      }, 100)
    }

    if (this.isOpen) {
      this.trapFocus()
    } else {
      this.restoreFocus()
    }
  }

  private trapFocus(): void {
    const focusableElements = this.getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }
  }

  private restoreFocus(): void {
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus()
      this.lastFocusedElement = null
    }
  }
}
