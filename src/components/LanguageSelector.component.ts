import { Component, inject, computed } from '@angular/core';
import { I18nService } from '@/services/i18n.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  template: `
    <div class="flex items-center gap-1" [attr.aria-label]="ariaLabel()" role="radiogroup">
      @for (loc of locales; track loc.code) {
        <button
          (click)="setLanguage(loc.code)"
          [attr.aria-pressed]="currentLocale() === loc.code"
          class="px-2 py-1 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 cursor-pointer"
          [class]="currentLocale() === loc.code ? 'bg-red-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'"
        >
          {{ loc.label }}
        </button>
      }
    </div>
  `,
})
export class LanguageSelectorComponent {
  private i18nService = inject(I18nService);

  locales = [
    { code: 'en' as const, label: 'EN' },
    { code: 'pt-BR' as const, label: 'PT' },
  ];

  currentLocale = this.i18nService.getLocaleSignal();

  ariaLabel = computed(() =>
    this.currentLocale() === 'pt-BR'
      ? 'Seletor de Idioma'
      : 'Language Selector'
  );

  setLanguage(locale: 'en' | 'pt-BR'): void {
    this.i18nService.setLocale(locale);
  }
}
