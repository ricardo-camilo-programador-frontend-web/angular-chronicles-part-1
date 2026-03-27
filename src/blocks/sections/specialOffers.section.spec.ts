import { SpecialOffersSection } from './specialOffers.section';

describe('SpecialOffersSection', () => {
  let component: SpecialOffersSection;

  beforeEach(() => {
    component = new SpecialOffersSection();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 products', () => {
    expect(component.products).toHaveSize(4);
  });

  it('should have products with required fields', () => {
    for (const product of component.products) {
      expect(product.id).toBeDefined();
      expect(product.name).toBeTruthy();
      expect(product.image).toBeTruthy();
      expect(product.rating).toBeGreaterThan(0);
      expect(product.description).toBeTruthy();
      expect(product.price).toBeGreaterThan(0);
      expect(product.category).toBeTruthy();
      expect(product.users).toHaveSize(3);
    }
  });

  describe('trackByProduct', () => {
    it('should return product id as string', () => {
      const product = component.products[0];
      expect(component.trackByProduct(0, product)).toBe(product.id);
    });

    it('should return different ids for different products', () => {
      const result1 = component.trackByProduct(0, component.products[0]);
      const result2 = component.trackByProduct(1, component.products[1]);
      expect(result1).not.toBe(result2);
    });
  });
});
