import { MobileMenuComponent } from './MobileMenu.component';
import { HEADER_NAVIGATION_ITEMS } from '@/constants/navigation.constants';

describe('MobileMenuComponent', () => {
  let component: MobileMenuComponent;
  let closeMenuSpy: jasmine.Spy;

  beforeEach(() => {
    component = new MobileMenuComponent();
    closeMenuSpy = spyOn(component.closeMenu, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have menu items from navigation constants', () => {
    expect(component.menuItems).toEqual(HEADER_NAVIGATION_ITEMS);
  });

  it('should be closed by default', () => {
    expect(component.isOpen).toBeFalse();
  });

  describe('close', () => {
    it('should emit closeMenu event', () => {
      component.isOpen = true;
      component.close();
      expect(closeMenuSpy).toHaveBeenCalled();
    });

    it('should emit closeMenu even when already closed', () => {
      component.isOpen = false;
      component.close();
      expect(closeMenuSpy).toHaveBeenCalled();
    });
  });

  describe('onEscape', () => {
    it('should close menu when open and ESC is pressed', () => {
      component.isOpen = true;
      component.onEscape();
      expect(closeMenuSpy).toHaveBeenCalled();
    });

    it('should not close menu when already closed and ESC is pressed', () => {
      component.isOpen = false;
      component.onEscape();
      expect(closeMenuSpy).not.toHaveBeenCalled();
    });
  });
});
