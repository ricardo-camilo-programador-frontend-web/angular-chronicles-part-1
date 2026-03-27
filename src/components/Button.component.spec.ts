import { ButtonComponent } from './Button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;

  beforeEach(() => {
    component = new ButtonComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.label).toBe('');
    expect(component.className).toBe('');
    expect(component.title).toBe('');
  });

  it('should accept custom label', () => {
    component.label = 'Click me';
    expect(component.label).toBe('Click me');
  });

  it('should accept custom className', () => {
    component.className = 'bg-red-500 text-white';
    expect(component.className).toBe('bg-red-500 text-white');
  });

  it('should accept custom title', () => {
    component.title = 'Submit form';
    expect(component.title).toBe('Submit form');
  });
});
