/**
 * Accessibility Utilities for Color Contrast and Visual Indicators
 * Ensures WCAG 2.1 compliance for color contrast and non-color-dependent indicators
 */

export class AccessibilityUtils {
  /**
   * Check if color contrast meets WCAG 2.1 AA standards
   * @param foregroundColor - Hex color code for text
   * @param backgroundColor - Hex color code for background
   * @param fontSize - Font size in px (for different contrast requirements)
   * @returns boolean - true if contrast meets standards
   */
  static checkColorContrast(
    foregroundColor: string,
    backgroundColor: string,
    fontSize: number = 16
  ): boolean {
    const fg = foregroundColor.replace('#', '');
    const bg = backgroundColor.replace('#', '');
    
    const fgRgb = this.hexToRgb(fg);
    const bgRgb = this.hexToRgb(bg);
    
    if (!fgRgb || !bgRgb) return false;
    
    const fgLuminance = this.calculateLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
    const bgLuminance = this.calculateLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    
    const contrastRatio = this.calculateContrastRatio(fgLuminance, bgLuminance);
    
    const minimumRatio = fontSize >= 18 ? 3 : 4.5;
    
    return contrastRatio >= minimumRatio;
  }
  
  /**
   * Generate accessible color variants with proper contrast
   * @param baseColor - Base color in hex
   * @param backgroundColor - Background color to ensure contrast against
   * @returns Object with accessible color variants
   */
  static generateAccessibleColors(baseColor: string, backgroundColor: string = '#ffffff') {
    const colors: Record<string, string> = {
      base: baseColor,
      hover: this.adjustColorBrightness(baseColor, -20),
      focus: this.adjustColorBrightness(baseColor, -10),
      disabled: this.adjustColorBrightness(baseColor, 40),
      border: this.adjustColorBrightness(baseColor, 30)
    };
    
    Object.keys(colors).forEach(key => {
      if (!this.checkColorContrast(colors[key], backgroundColor)) {
        colors[key] = this.getHighContrastColor(backgroundColor);
      }
    });
    
    return colors;
  }
  
  /**
   * Get high contrast color (black or white) based on background
   * @param backgroundColor - Background color in hex
   * @returns '#000000' or '#FFFFFF'
   */
  static getHighContrastColor(backgroundColor: string): string {
    const bg = backgroundColor.replace('#', '');
    const rgb = this.hexToRgb(bg);
    
    if (!rgb) return '#000000';
    
    const luminance = this.calculateLuminance(rgb.r, rgb.g, rgb.b);
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }
  
  /**
   * Generate accessibility class names for interactive elements
   * @param baseColor - Base color for the element
   * @param elementType - Type of element (link, button, etc.)
   * @returns Object with accessibility class names
   */
  static getAccessibilityClasses(baseColor: string, elementType: 'link' | 'button' = 'link') {
    const baseClasses = {
      link: [
        'underline',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2',
        'visited:opacity-75',
        'hover:decoration-underline',
      ],
      button: [
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed',
      ]
    };
    
    return {
      base: baseClasses[elementType].join(' '),
      indicators: elementType === 'link' 
        ? 'after:content-[\'\'] after:block after:w-0 after:h-0.5 after:bg-current after:transition-all after:duration-300 hover:after:w-full after:opacity-50'
        : 'shadow-sm hover:shadow-md active:shadow-inner'
    };
  }
  
  /**
   * Enhanced focus styles for better keyboard navigation
   * @param element - Element type
   * @returns Tailwind classes for enhanced focus
   */
  static getEnhancedFocusStyles(element: 'link' | 'button' | 'input' = 'link') {
    const focusStyles = {
      link: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white outline-none',
      button: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white outline-none',
      input: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white outline-none border-gray-300 focus:border-blue-500'
    };
    
    return focusStyles[element];
  }
  
  static SAFE_COLOR_COMBINATIONS = {
    text: {
      lightOnDark: '#FFFFFF on #1F2937',
      darkOnLight: '#1F2937 on #FFFFFF',
      blueOnWhite: '#2563EB on #FFFFFF',
      whiteOnBlue: '#FFFFFF on #2563EB',
      blackOnYellow: '#000000 on #FDE047',
      yellowOnBlack: '#FDE047 on #000000'
    },
    
    links: {
      blue: {
        normal: '#2563EB',
        hover: '#1D4ED8',
        visited: '#7C3AED',
        focus: '#1D4ED8',
        underline: true
      },
      dark: {
        normal: '#1F2937',
        hover: '#111827',
        visited: '#4B5563',
        focus: '#111827',
        underline: true
      }
    },
    
    buttons: {
      primary: {
        background: '#2563EB',
        text: '#FFFFFF',
        hover: '#1D4ED8',
        focus: '#1D4ED8',
        disabled: '#9CA3AF'
      },
      secondary: {
        background: '#F3F4F6',
        text: '#1F2937',
        hover: '#E5E7EB',
        focus: '#E5E7EB',
        disabled: '#F9FAFB'
      },
      danger: {
        background: '#DC2626',
        text: '#FFFFFF',
        hover: '#B91C1C',
        focus: '#B91C1C',
        disabled: '#FCA5A5'
      }
    }
  };
  
  private static hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  private static calculateLuminance(r: number, g: number, b: number) {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }
  
  private static calculateContrastRatio(l1: number, l2: number) {
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }
  
  private static adjustColorBrightness(hex: string, percent: number) {
    const rgb = this.hexToRgb(hex.replace('#', ''));
    if (!rgb) return hex;
    
    const adjust = (color: number) => {
      const newColor = color + (color * percent / 100);
      return Math.max(0, Math.min(255, newColor));
    };
    
    const r = adjust(rgb.r).toString(16).padStart(2, '0');
    const g = adjust(rgb.g).toString(16).padStart(2, '0');
    const b = adjust(rgb.b).toString(16).padStart(2, '0');
    
    return `#${r}${g}${b}`;
  }
}