import { HeaderComponent } from './Header.component';
import { MobileMenuComponent } from './MobileMenu.component';
import { HEADER_NAVIGATION_ITEMS } from '@/constants/navigation.constants';

describe('HeaderComponent', () => {
  let component: HeaderComponent;

  beforeEach(() => {
    component = new HeaderComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have menu items from navigation constants', () => {
    expect(component.menuItems).toEqual(HEADER_NAVIGATION_ITEMS);
  });

  it('should have mobile menu closed by default', () => {
    expect(component.isMobileMenuOpen).toBeFalse();
  });

  describe('toggleMobileMenu', () => {
    it('should open the mobile menu when closed', () => {
      component.isMobileMenuOpen = false;
      component.toggleMobileMenu();
      expect(component.isMobileMenuOpen).toBeTrue();
    });

    it('should close the mobile menu when open', () => {
      component.isMobileMenuOpen = true;
      component.toggleMobileMenu();
      expect(component.isMobileMenuOpen).toBeFalse();
    });
  });

  describe('closeMobileMenu', () => {
    it('should close the mobile menu', () => {
      component.isMobileMenuOpen = true;
      component.closeMobileMenu();
      expect(component.isMobileMenuOpen).toBeFalse();
    });

    it('should keep menu closed if already closed', () => {
      component.isMobileMenuOpen = false;
      component.closeMobileMenu();
      expect(component.isMobileMenuOpen).toBeFalse();
    });
  });
});
