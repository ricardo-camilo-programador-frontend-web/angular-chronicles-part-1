/**
 * Font Loading Optimization Utility
 * Implements best practices for font loading performance and accessibility
 */

export class FontOptimizationUtils {
  /**
   * Generate optimized font loading links with preconnect and preload
   * @param fontUrl - Google Fonts URL
   * @param fontFamilies - Array of font families to load
   * @returns Object with preload and fallback HTML strings
   */
  static generateOptimizedFontLinks(fontUrl: string, fontFamilies: string[]) {
    const fontFamilyParam = fontFamilies.join('|');
    const optimizedUrl = fontUrl.replace('family=', `family=${fontFamilyParam}`);
    
    return {
      preload: this.generatePreloadLink(optimizedUrl),
      preconnect: this.generatePreconnectLinks(),
      asyncLoad: this.generateAsyncLoadScript(optimizedUrl),
      fallback: this.generateFallbackFontFamilies()
    };
  }
  
  /**
   * Generate font display CSS for better loading experience
   * @param displayStrategy - Font display strategy (swap, block, fallback, optional)
   * @returns CSS string with font display properties
   */
  static generateFontDisplayCSS(displayStrategy: 'swap' | 'block' | 'fallback' | 'optional' = 'swap') {
    return `
      /* Font display optimization */
      @font-face {
        font-family: 'Be Vietnam Pro';
        font-display: ${displayStrategy};
      }
      
      /* Fallback font stack */
      .font-fallback {
        font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      /* Loading state indicators */
      .font-loading {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
      
      .font-loaded {
        opacity: 1;
      }
    `;
  }
  
  /**
   * Generate font loading detection script
   * @param fontName - Name of the font to detect
   * @returns JavaScript code for font loading detection
   */
  static generateFontLoadingDetection(fontName: string = 'Be Vietnam Pro') {
    return `
      (function() {
        'use strict';
        
        // Font loading detection
        function fontLoaded(fontName) {
          var testString = 'mmmmmmmmmmlli';
          var testFont = 'monospace';
          var defaultWidth = 0;
          var defaultHeight = 0;
          
          // Create test elements
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');
          
          // Test with default font
          context.font = '100px ' + testFont;
          defaultWidth = context.measureText(testString).width;
          defaultHeight = 100;
          
          // Test with target font
          context.font = '100px ' + fontName + ', ' + testFont;
          var loadedWidth = context.measureText(testString).width;
          
          // Check if font is loaded (different width)
          return defaultWidth !== loadedWidth;
        }
        
        // Apply font loaded class when detected
        function checkFontLoad() {
          if (fontLoaded('${fontName}')) {
            document.documentElement.classList.add('fonts-loaded');
            document.documentElement.classList.remove('fonts-loading');
          } else {
            // Check again after delay
            setTimeout(checkFontLoad, 100);
          }
        }
        
        // Start checking
        document.documentElement.classList.add('fonts-loading');
        checkFontLoad();
        
        // Fallback timeout
        setTimeout(function() {
          document.documentElement.classList.add('fonts-loaded');
          document.documentElement.classList.remove('fonts-loading');
        }, 3000);
      })();
    `;
  }
  
  /**
   * Critical font CSS inlining for above-the-fold content
   * @returns CSS with critical font rules
   */
  static generateCriticalFontCSS() {
    return `
      /* Critical font rendering */
      html {
        font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      /* Prevent flash of invisible text */
      .fonts-loading body {
        opacity: 0;
      }
      
      .fonts-loaded body {
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
      }
      
      /* Ensure text remains visible during font loading */
      h1, h2, h3, h4, h5, h6, p, a, button, input, textarea, select {
        font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
    `;
  }
  
  /**
   * Mobile-specific font optimizations
   * @returns CSS with mobile font optimizations
   */
  static generateMobileFontOptimizations() {
    return `
      /* Mobile font optimizations */
      @media (max-width: 768px) {
        /* Smaller font sizes for better readability on mobile */
        h1 { font-size: clamp(1.5rem, 4vw, 2rem); }
        h2 { font-size: clamp(1.25rem, 3.5vw, 1.75rem); }
        h3 { font-size: clamp(1.125rem, 3vw, 1.5rem); }
        body { font-size: clamp(0.875rem, 2.5vw, 1rem); }
        
        /* Improved line height for mobile */
        p, li { line-height: 1.6; }
        
        /* Better touch targets */
        a, button, input, textarea, select {
          min-height: 44px;
          min-width: 44px;
        }
        
        /* Optimize font weights for mobile screens */
        .font-weight-mobile-optimized {
          font-weight: 500; /* Medium weight for better readability on mobile */
        }
      }
      
      /* High DPI/Retina display optimizations */
      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
      }
      
      /* Reduced motion font handling */
      @media (prefers-reduced-motion: reduce) {
        body {
          transition: none !important;
          animation: none !important;
        }
      }
    `;
  }
  
  // Private helper methods
  private static generatePreloadLink(fontUrl: string) {
    return `
      <link 
        rel="preload" 
        href="${fontUrl}" 
        as="style" 
        onload="this.onload=null;this.rel='stylesheet'"
        importance="high"
      />
    `;
  }
  
  private static generatePreconnectLinks() {
    return `
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
    `;
  }
  
  private static generateAsyncLoadScript(fontUrl: string) {
    return `
      <script>
        (function() {
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '${fontUrl}';
          link.type = 'text/css';
          document.head.appendChild(link);
        })();
      </script>
    `;
  }
  
  private static generateFallbackFontFamilies() {
    return `
      <style>
        /* Fallback font stack */
        body, h1, h2, h3, h4, h5, h6, p, a, button, input, textarea, select {
          font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        /* System font stack for better performance */
        .system-font-stack {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
      </style>
    `;
  }
}