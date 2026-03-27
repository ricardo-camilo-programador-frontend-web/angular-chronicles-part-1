export type SupportedLocale = 'en' | 'pt-BR';

export interface I18nTranslations {
  header: {
    nav: {
      specialOffers: string;
      whyFoodHut: string;
      ourMenu: string;
      popularFood: string;
    };
    downloadApp: string;
    openMenu: string;
    closeMenu: string;
    navigationMenu: string;
  };
  intro: {
    tag: string;
    title: string;
    description: string;
    searchPlaceholder: string;
    search: string;
    watchVideo: string;
  };
  specialOffers: {
    title: string;
    description: string;
    orderNow: string;
  };
  aboutUs: {
    title: string;
    description: string;
    aboutUs: string;
    services: {
      onlineOrder: string;
      service247: string;
      preReservation: string;
      organizedPlace: string;
      superChef: string;
      cleanKitchen: string;
    };
  };
  menu: {
    title: string;
    subtitle: string;
    noProducts: string;
    categories: Record<string, string>;
  };
  app: {
    title: string;
    description: string;
  };
  footer: {
    title: string;
    description: string;
    aboutUs: string;
    serviceUs: string;
    contact: string;
    company: string;
    partnership: string;
    termsOfUse: string;
    privacy: string;
    sitemap: string;
    getInTouch: string;
    newsletterDescription: string;
    subscribe: string;
    emailPlaceholder: string;
    copyright: string;
  };
  languageSelector: {
    label: string;
    en: string;
    ptBR: string;
  };
  common: {
    close: string;
    open: string;
  };
}
