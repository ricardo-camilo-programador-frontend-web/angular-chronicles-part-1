import { Injectable, Signal, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SupportedLocale, TranslationDict } from '../types/i18n.types';
import enTranslations from '@/assets/i18n/en.json';
import ptBrTranslations from '@/assets/i18n/pt-BR.json';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly platformId = inject(PLATFORM_ID);
  private translations: Record<SupportedLocale, TranslationDict> = {
    en: enTranslations,
    'pt-BR': ptBrTranslations
  };

  private locale = signal<SupportedLocale>('en');
  private currentTranslations = signal<TranslationDict>(enTranslations);

  constructor() {
    this.restoreLocale();
  }

  private restoreLocale(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const saved = localStorage.getItem('locale') as SupportedLocale;
    if (saved === 'en' || saved === 'pt-BR') {
      this.locale.set(saved);
      this.currentTranslations.set(this.translations[saved]);
    }
    document.documentElement.lang = this.locale();
  }

  translate(key: string): string {
    const keys = key.split('.');
    let value: string | TranslationDict | undefined = this.currentTranslations();

    for (const k of keys) {
      if (value == null || typeof value === 'string') {
        return key;
      }
      value = value[k] as string | TranslationDict | undefined;
    }

    return value != null ? String(value) : key;
  }

  setLocale(locale: SupportedLocale): void {
    if (this.locale() !== locale) {
      this.locale.set(locale);
      this.currentTranslations.set(this.translations[locale]);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('locale', locale);
      }
      document.documentElement.lang = locale;
    }
  }

  getLocale(): SupportedLocale {
    return this.locale();
  }

  getLocaleSignal(): Signal<SupportedLocale> {
    return this.locale.asReadonly();
  }
}
