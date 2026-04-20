export interface StructuredDataOrganization {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address?: {
    '@type': string;
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  contactPoint?: {
    '@type': string;
    telephone?: string;
    contactType?: string;
  };
  sameAs?: string[];
}

export interface StructuredDataWebsite {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
  potentialAction?: {
    '@type': string;
    target: {
      '@type': string;
      urlTemplate: string;
    };
    'query-input': string;
  };
}

export interface StructuredDataBreadcrumb {
  '@context': string;
  '@type': string;
  itemListElement: {
    '@type': string;
    position: number;
    name: string;
    item: string;
  }[];
}

export interface StructuredDataProduct {
  '@context': string;
  '@type': string;
  name: string;
  image: string[];
  description: string;
  offers?: {
    '@type': string;
    priceCurrency: string;
    price: string;
    availability: string;
    seller: {
      '@type': string;
      name: string;
    };
  };
  aggregateRating?: {
    '@type': string;
    ratingValue: number;
    reviewCount: number;
  };
  brand?: {
    '@type': string;
    name: string;
  };
}

export interface StructuredDataArticle {
  '@context': string;
  '@type': string;
  headline: string;
  image: string[];
  author: {
    '@type': string;
    name: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
  datePublished: string;
  dateModified?: string;
  description: string;
  articleSection?: string;
  keywords?: string[];
}

export const ORGANIZATION_DATA: StructuredDataOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Food Hut - Angular Chronicles',
  url: 'https://food-hut-angular-chronicles-1.netlify.app',
  logo: 'https://food-hut-angular-chronicles-1.netlify.app/assets/images/food-hut-logo.png',
  description: 'Modern web application showcasing Angular capabilities with food-themed content',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BR'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+55-XX-XXXX-XXXX'
  },
  sameAs: [
    'https://github.com/ricardo564/angular-chronicles-part-1',
    'https://www.linkedin.com/in/ricardo-camilo-web/'
  ]
};

export const WEBSITE_DATA: StructuredDataWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Food Hut - Angular Chronicles',
  url: 'https://food-hut-angular-chronicles-1.netlify.app',
  description: 'Explore delicious food options with Food Hut, built with Angular. Modern web application showcasing Angular capabilities and best practices.',
  publisher: {
    '@type': 'Organization',
    name: 'Food Hut - Angular Chronicles',
    logo: {
      '@type': 'ImageObject',
      url: 'https://food-hut-angular-chronicles-1.netlify.app/assets/images/food-hut-logo.png'
    }
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://food-hut-angular-chronicles-1.netlify.app/?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
};

export const BREADCRUMB_HOME_DATA: StructuredDataBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://food-hut-angular-chronicles-1.netlify.app'
    }
  ]
};

export const BREADCRUMB_PRIVACY_DATA: StructuredDataBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://food-hut-angular-chronicles-1.netlify.app'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Privacy Policy',
      item: 'https://food-hut-angular-chronicles-1.netlify.app/privacy-policy'
    }
  ]
};

export const createProductStructuredData = (
  name: string,
  image: string[],
  description: string,
  price: string,
  rating?: number,
  reviewCount?: number
): StructuredDataProduct => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name,
  image,
  description,
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price,
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Food Hut'
    }
  },
  ...(rating && reviewCount ? {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount
    }
  } : {}),
  brand: {
    '@type': 'Brand',
    name: 'Food Hut'
  }
});

export const createArticleStructuredData = (
  headline: string,
  image: string[],
  description: string,
  datePublished: string,
  dateModified?: string,
  keywords?: string[]
): StructuredDataArticle => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  image,
  author: {
    '@type': 'Person',
    name: 'Ricardo Camilo'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Food Hut - Angular Chronicles',
    logo: {
      '@type': 'ImageObject',
      url: 'https://food-hut-angular-chronicles-1.netlify.app/assets/images/food-hut-logo.png'
    }
  },
  datePublished,
  ...(dateModified ? { dateModified } : {}),
  description,
  ...(keywords ? { keywords } : {})
});

export const LOCAL_BUSINESS_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Food Hut',
  image: 'https://food-hut-angular-chronicles-1.netlify.app/assets/images/food-hut-og.jpg',
  url: 'https://food-hut-angular-chronicles-1.netlify.app',
  telephone: '+55-XX-XXXX-XXXX',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BR'
  },
  servesCuisine: ['International', 'Local'],
  priceRange: '$$',
  openingHours: 'Mo-Su 08:00-22:00',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.5,
    reviewCount: 128
  }
};

export const SOFTWARE_APPLICATION_DATA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Food Hut - Angular Chronicles',
  applicationCategory: 'WebApplication',
  operatingSystem: 'Web',
  description: 'Modern web application showcasing Angular capabilities with food-themed content',
  url: 'https://food-hut-angular-chronicles-1.netlify.app',
  author: {
    '@type': 'Person',
    name: 'Ricardo Camilo',
    url: 'https://www.linkedin.com/in/ricardo-camilo-web/'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Food Hut',
    url: 'https://food-hut-angular-chronicles-1.netlify.app'
  },
  datePublished: '2024-01-01',
  version: '1.0.0',
  keywords: 'angular, typescript, web development, food restaurant'
};

export const getStructuredDataForRoute = (route: string): any => {
  switch (route) {
    case '/':
      return [ORGANIZATION_DATA, WEBSITE_DATA, LOCAL_BUSINESS_DATA, BREADCRUMB_HOME_DATA];
    case '/privacy-policy':
      return [ORGANIZATION_DATA, BREADCRUMB_PRIVACY_DATA];
    default:
      return [ORGANIZATION_DATA];
  }
};