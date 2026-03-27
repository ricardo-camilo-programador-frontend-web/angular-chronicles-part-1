import { isClickOutsideElement } from './isClickOutsideElement';

describe('isClickOutsideElement', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    Object.defineProperty(element, 'getBoundingClientRect', {
      value: () => ({
        left: 100,
        right: 200,
        top: 100,
        bottom: 200,
      }),
    });
  });

  it('should return true when click is to the left of element', () => {
    const event = { clientX: 50, clientY: 150 } as MouseEvent;
    expect(isClickOutsideElement(element, event)).toBeTrue();
  });

  it('should return true when click is to the right of element', () => {
    const event = { clientX: 250, clientY: 150 } as MouseEvent;
    expect(isClickOutsideElement(element, event)).toBeTrue();
  });

  it('should return true when click is above element', () => {
    const event = { clientX: 150, clientY: 50 } as MouseEvent;
    expect(isClickOutsideElement(element, event)).toBeTrue();
  });

  it('should return true when click is below element', () => {
    const event = { clientX: 150, clientY: 250 } as MouseEvent;
    expect(isClickOutsideElement(element, event)).toBeTrue();
  });

  it('should return false when click is inside element', () => {
    const event = { clientX: 150, clientY: 150 } as MouseEvent;
    expect(isClickOutsideElement(element, event)).toBeFalse();
  });

  it('should return true when element is null', () => {
    const event = { clientX: 150, clientY: 150 } as MouseEvent;
    expect(isClickOutsideElement(null, event)).toBeTrue();
  });
});
