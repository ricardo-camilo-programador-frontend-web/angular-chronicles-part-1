import { ImageComponent } from './Image.component';

describe('ImageComponent', () => {
  let component: ImageComponent;

  beforeEach(() => {
    component = new ImageComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.src).toBe('');
    expect(component.alt).toBe('');
    expect(component.width).toBe('');
    expect(component.height).toBe('');
    expect(component.loading).toBe('lazy');
    expect(component.className).toBe('');
  });

  it('should accept custom input values', () => {
    component.src = 'assets/logo.svg';
    component.alt = 'Logo';
    component.width = '100';
    component.height = '100';
    component.loading = 'eager';
    component.className = 'w-10 h-10';

    expect(component.src).toBe('assets/logo.svg');
    expect(component.alt).toBe('Logo');
    expect(component.width).toBe('100');
    expect(component.height).toBe('100');
    expect(component.loading).toBe('eager');
    expect(component.className).toBe('w-10 h-10');
  });
});
