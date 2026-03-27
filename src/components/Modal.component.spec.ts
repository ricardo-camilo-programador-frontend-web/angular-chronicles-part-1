import { ModalComponent } from './Modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;

  beforeEach(() => {
    component = new ModalComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('open', () => {
    it('should set isOpen to true', () => {
      component.isOpen = false;
      component.open();
      expect(component.isOpen).toBeTrue();
    });
  });

  describe('close', () => {
    it('should set isOpen to false', () => {
      component.isOpen = true;
      component.close();
      expect(component.isOpen).toBeFalse();
    });

    it('should call onClose which emits closeModal', () => {
      const spy = spyOn(component, 'onClose');
      component.close();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onClose', () => {
    it('should emit closeModal event', () => {
      const spy = spyOn(component.closeModal, 'emit');
      component.onClose();
      expect(spy).toHaveBeenCalled();
    });
  });
});
