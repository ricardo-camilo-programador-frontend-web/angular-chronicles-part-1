import { Injectable, signal, effect } from '@angular/core';
import type { I18nTranslations, SupportedLocale } from '@/types/i18n.types';
import enTranslations from '@/assets/i18n/en.json';
import ptBrTranslations from '@/assets/i18n/pt-BR.json';

const STORAGE_KEY = 'foodhut-locale';
const DEFAULT_LOCALE: SupportedLocale = 'en';

const translationsMap: Record<SupportedLocale, I18nTranslations> = {
  en: enTranslations as unknown as I18nTranslations,
  'pt-BR': ptBrTranslations as unknown as I18nTranslations,
};

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private readonly _locale = signal<SupportedLocale>(this.getSavedLocale());
  private readonly _translations = signal<I18nTranslations>(translationsMap[this._locale()]);

  readonly locale = this._locale.asReadonly();
  readonly translations = this._translations.asReadonly();

  constructor() {
    effect(() => {
      const locale = this._locale();
      document.documentElement.lang = locale === 'pt-BR' ? 'pt-BR' : 'en';
    });
  }

  setLocale(locale: SupportedLocale): void {
    this._locale.set(locale);
    this._translations.set(translationsMap[locale]);
    localStorage.setItem(STORAGE_KEY, locale);
  }

  getAvailableLocales(): SupportedLocale[] {
    return Object.keys(translationsMap) as SupportedLocale[];
  }

  private getSavedLocale(): SupportedLocale {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved in translationsMap) {
        return saved as SupportedLocale;
      }
    } catch {
      // localStorage unavailable
    }
    return DEFAULT_LOCALE;
  }
}
