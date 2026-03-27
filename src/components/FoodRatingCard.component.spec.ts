import { FoodRatingCardComponent } from './FoodRatingCard.component';

describe('FoodRatingCardComponent', () => {
  let component: FoodRatingCardComponent;

  beforeEach(() => {
    component = new FoodRatingCardComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.imageSrc).toBe('');
    expect(component.name).toBe('');
    expect(component.rating).toBe(0);
    expect(component.price).toBe(0);
    expect(component.className).toBe('');
  });

  describe('stars getter', () => {
    it('should return 5 boolean values', () => {
      expect(component.stars).toHaveSize(5);
    });

    it('should return all false for rating 0', () => {
      component.rating = 0;
      expect(component.stars).toEqual([false, false, false, false, false]);
    });

    it('should return correct stars for rating 3', () => {
      component.rating = 3;
      expect(component.stars).toEqual([true, true, true, false, false]);
    });

    it('should return all true for rating 5', () => {
      component.rating = 5;
      expect(component.stars).toEqual([true, true, true, true, true]);
    });

    it('should return 4 true for rating 4', () => {
      component.rating = 4;
      expect(component.stars).toEqual([true, true, true, true, false]);
    });

    it('should handle decimal ratings by flooring', () => {
      component.rating = 3.7;
      expect(component.stars).toEqual([true, true, true, false, false]);
    });
  });
});
