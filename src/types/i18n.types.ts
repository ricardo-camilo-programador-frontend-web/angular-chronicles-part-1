export type SupportedLocale = 'en' | 'pt-BR';

export interface TranslationDict {
  [key: string]: string | TranslationDict;
}

export interface I18nService {
  translate(key: string): string;
  setLocale(locale: SupportedLocale): void;
  getLocale(): SupportedLocale;
}