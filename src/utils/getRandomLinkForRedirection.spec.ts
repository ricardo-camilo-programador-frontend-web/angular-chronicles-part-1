import { getRandomLinkForRedirection } from './getRandomLinkForRedirection';

describe('getRandomLinkForRedirection', () => {
  it('should return a string', () => {
    const result = getRandomLinkForRedirection();
    expect(typeof result).toBe('string');
  });

  it('should return a valid URL', () => {
    const result = getRandomLinkForRedirection();
    expect(result).toMatch(/^https?:\/\//);
  });

  it('should return one of the expected links', () => {
    const expectedLinks = [
      'https://www.linkedin.com/in/ricardo-camilo-programador-frontend-web-developer/',
      'https://www.instagram.com/ricardo.camilo.dev/',
      'https://persona-nextjs-chronicles-part-2.netlify.app/sitemap.xml',
    ];

    const results = new Set<string>();
    for (let i = 0; i < 100; i++) {
      results.add(getRandomLinkForRedirection());
    }

    expect(results.size).toBeGreaterThan(0);
    for (const link of results) {
      expect(expectedLinks).toContain(link);
    }
  });
});
