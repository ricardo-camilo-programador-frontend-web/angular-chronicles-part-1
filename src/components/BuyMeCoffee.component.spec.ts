import { BuyMeCoffeeComponent } from './BuyMeCoffee.component';

describe('BuyMeCoffeeComponent', () => {
  let component: BuyMeCoffeeComponent;

  beforeEach(() => {
    component = new BuyMeCoffeeComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.username).toBe('');
    expect(component.theme).toBe('default');
    expect(component.message).toBe('Buy me a coffee');
  });

  describe('getButtonClass', () => {
    it('should return default theme classes', () => {
      component.theme = 'default';
      const result = component.getButtonClass();
      expect(result['bg-[#FFDD00] text-black']).toBeTrue();
      expect(result['border-2 border-[#FFDD00] text-[#FFDD00]']).toBeFalse();
      expect(result['bg-gradient-to-r from-[#FFDD00] to-[#FFA500] text-black']).toBeFalse();
    });

    it('should return outline theme classes', () => {
      component.theme = 'outline';
      const result = component.getButtonClass();
      expect(result['bg-[#FFDD00] text-black']).toBeFalse();
      expect(result['border-2 border-[#FFDD00] text-[#FFDD00]']).toBeTrue();
      expect(result['bg-gradient-to-r from-[#FFDD00] to-[#FFA500] text-black']).toBeFalse();
    });

    it('should return colored theme classes', () => {
      component.theme = 'colored';
      const result = component.getButtonClass();
      expect(result['bg-[#FFDD00] text-black']).toBeFalse();
      expect(result['border-2 border-[#FFDD00] text-[#FFDD00]']).toBeFalse();
      expect(result['bg-gradient-to-r from-[#FFDD00] to-[#FFA500] text-black']).toBeTrue();
    });
  });
});
