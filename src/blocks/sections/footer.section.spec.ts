import { FooterComponent } from './footer.section';

describe('FooterComponent', () => {
  let component: FooterComponent;

  beforeEach(() => {
    component = new FooterComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the current year', () => {
    const expectedYear = new Date().getFullYear();
    expect(component.currentYear).toBe(expectedYear);
  });

  describe('getRandomLinkForRedirection', () => {
    it('should return a string URL', () => {
      const result = component.getRandomLinkForRedirection();
      expect(typeof result).toBe('string');
      expect(result).toMatch(/^https?:\/\//);
    });
  });
});
