import { Injectable, Signal, signal } from '@angular/core';
import { SupportedLocale } from '../types/i18n.types';
import enTranslations from '@/assets/i18n/en.json';
import ptBrTranslations from '@/assets/i18n/pt-BR.json';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private translations: Record<SupportedLocale, any> = {
    en: enTranslations,
    'pt-BR': ptBrTranslations
  };

  private locale = signal<SupportedLocale>('en');
  private currentTranslations = signal<any>(enTranslations);

  constructor() {
    this.restoreLocale();
  }

  private restoreLocale(): void {
    const saved = localStorage.getItem('locale') as SupportedLocale;
    if (saved === 'en' || saved === 'pt-BR') {
      this.locale.set(saved);
      this.currentTranslations.set(this.translations[saved]);
    }
    document.documentElement.lang = this.locale();
  }

  translate(key: string): string {
    const keys = key.split('.');
    let value: any = this.currentTranslations();

    for (const k of keys) {
      if (value === null || value === undefined) {
        return key;
      }
      value = value[k];
    }

    return value !== null && value !== undefined ? String(value) : key;
  }

  setLocale(locale: SupportedLocale): void {
    if (this.locale() !== locale) {
      this.locale.set(locale);
      this.currentTranslations.set(this.translations[locale]);
      localStorage.setItem('locale', locale);
      document.documentElement.lang = locale;
    }
  }

  getLocale(): SupportedLocale {
    return this.locale();
  }

  getLocaleSignal(): Signal<SupportedLocale> {
    return this.locale.asReadonly();
  }

  init(): void {
    this.restoreLocale();
  }
}
