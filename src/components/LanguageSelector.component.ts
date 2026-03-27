import { Component, computed, inject } from "@angular/core";
import { NgFor } from "@angular/common";
import { I18nService } from "@/services/i18n.service";
import type { SupportedLocale } from "@/types/i18n.types";

@Component({
  selector: "app-language-selector",
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="flex items-center gap-1">
      <span class="text-xs text-gray-500 mr-1 hidden sm:inline">{{ label() }}</span>
      <button
        *ngFor="let locale of availableLocales"
        (click)="setLocale(locale)"
        class="px-2 py-1 text-xs rounded transition-colors"
        [class.bg-red-500]="locale === currentLocale()"
        [class.text-white]="locale === currentLocale()"
        [class.text-gray-600]="locale !== currentLocale()"
        [class.hover:bg-red-100]="locale !== currentLocale()"
        [attr.aria-label]="'Switch to ' + getLocaleDisplayName(locale)"
        [attr.aria-pressed]="locale === currentLocale()"
      >
        {{ locale === 'pt-BR' ? ptBrLabel() : enLabel() }}
      </button>
    </div>
  `,
})
export class LanguageSelectorComponent {
  private i18nService = inject(I18nService);

  currentLocale = this.i18nService.locale;
  availableLocales = this.i18nService.getAvailableLocales();

  label = computed(() => this.i18nService.translations().languageSelector.label);
  enLabel = computed(() => this.i18nService.translations().languageSelector.en);
  ptBrLabel = computed(() => this.i18nService.translations().languageSelector.ptBR);

  setLocale(locale: SupportedLocale): void {
    this.i18nService.setLocale(locale);
  }

  getLocaleDisplayName(locale: SupportedLocale): string {
    return locale === 'pt-BR' ? 'Portugues Brasileiro' : 'English';
  }
}
