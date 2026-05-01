/**
 * Image Optimization Utility
 * 
 * Provides methods for optimizing images with modern formats (WebP/AVIF)
 * and generating optimized URLs for better performance.
 */

export interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  width?: number;
  height?: number;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export class ImageOptimizer {
  private static readonly DEFAULT_QUALITY = 80;
  private static readonly DEFAULT_FORMAT = 'webp';
  private static readonly SUPPORTED_FORMATS = ['webp', 'avif', 'auto'] as const;

  /**
   * Optimizes image URL with modern format and quality settings
   */
  static optimizeImage(src: string, options: ImageOptimizationOptions = {}): string {
    let {
      quality = this.DEFAULT_QUALITY,
      format = this.DEFAULT_FORMAT,
      width,
      height
    } = options;

    if (!this.SUPPORTED_FORMATS.includes(format)) {
      console.warn(`Unsupported format: ${format}. Falling back to ${this.DEFAULT_FORMAT}`);
      format = this.DEFAULT_FORMAT;
    }

    const validatedQuality = Math.max(1, Math.min(100, quality));

    const url = new URL(src, window.location.origin);
    
    url.searchParams.set('format', format);
    url.searchParams.set('q', validatedQuality.toString());
    
    if (width) {
      url.searchParams.set('w', width.toString());
    }
    
    if (height) {
      url.searchParams.set('h', height.toString());
    }

    return url.toString();
  }

  /**
   * Generates responsive image sources for different breakpoints
   */
  static generateResponsiveSources(
    src: string, 
    breakpoints: number[], 
    options: ImageOptimizationOptions = {}
  ): string[] {
    return breakpoints.map(width => 
      this.optimizeImage(src, { ...options, width })
    );
  }

  /**
   * Creates a srcset string for responsive images
   */
  static createSrcset(src: string, breakpoints: number[], options: ImageOptimizationOptions = {}): string {
    const sources = this.generateResponsiveSources(src, breakpoints, options);
    return sources.map((url, index) => 
      `${url} ${breakpoints[index]}w`
    ).join(', ');
  }

  /**
   * Generates sizes attribute for responsive images
   */
  static generateSizes(breakpoints: number[], defaultValue = '100vw'): string {
    return breakpoints
      .map(bp => `(max-width: ${bp}px) ${bp}px`)
      .concat([defaultValue])
      .join(', ');
  }

  /**
   * Calculates aspect ratio from dimensions
   */
  static calculateAspectRatio(width: number, height: number): number {
    if (height === 0) return 1;
    return width / height;
  }

  /**
   * Generates placeholder URL for low-quality image placeholders (LQIP)
   */
  static generateLQIPUrl(src: string, quality = 20): string {
    return this.optimizeImage(src, { quality, width: 20 });
  }

  /**
   * Checks if browser supports WebP format
   */
  static async supportsWebP(): Promise<boolean> {
    if (!self.createImageBitmap) return false;

    const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    
    try {
      const blob = new Blob([webpData], { type: 'image/webp' });
      const bitmap = await createImageBitmap(blob);
      return bitmap.width === 1 && bitmap.height === 1;
    } catch {
      return false;
    }
  }

  /**
   * Checks if browser supports AVIF format
   */
  static async supportsAVIF(): Promise<boolean> {
    if (!self.createImageBitmap) return false;

    const avifData = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWQtaW4mbW0ZQAAAAAoZnBsbW50ZQBJSbG9icwAAbW1hZGlkAQAKBW5kaW5nAAAAAFBQUlRPU05TAAAAAAAGGFIYnR0cHMAAAD/AAAAEXR1Y3RsY2F0AAA/AAAAGXJsdW50ZQAAA9AAAAAZdmlkZQAADAAAAGhkbHlwUgAAA/gAAAAhjcHJ0aWQAAB+wAAAAHd3dhdml3ZQAAB+kAAAAImluZmUCAAD/AAAAFGF1cmggRG9uZQAAC/YAAAAJGNwYXQCAAD+AAAAFmN0aWQAAAABAAAAFmNoZWIAAAADAAAAFGFzcAAAABAAAAHd3cmlrZQAADwAAAAEaW50AAAAFQAAABRzdWJ0AAAAFgAAABhzZHN0AAAAFgAAABhjcHJ0AAAAHgAAAAHdmMwMAAAA/gAAAAHdmlldAAAAPwAAAAHZmMzMAAAA/gAAAAHdmMzIAAAAPAAAAAGZjcHJwAAAAHgAAAAHjaGFsAAAAHgAAAAIamF2YXQCAAD+AAAAH2lzZMAAAAPAAAAFGNocmlyaWQAAB+wAAAAKG1sdW50ZQAA//8AAAAIbmNvAAAACwAAAAJhcmNkAAAAFgAAABhzdHRzAAAAAAAAAAEAAAABAAA';
    
    try {
      const blob = new Blob([avifData], { type: 'image/avif' });
      const bitmap = await createImageBitmap(blob);
      return bitmap.width === 1 && bitmap.height === 1;
    } catch {
      return false;
    }
  }

  /**
   * Gets the best supported format for the current browser
   */
  static async getBestSupportedFormat(): Promise<'webp' | 'avif' | 'auto'> {
    const [supportsAVIF, supportsWebP] = await Promise.all([
      this.supportsAVIF(),
      this.supportsWebP()
    ]);

    if (supportsAVIF) return 'avif';
    if (supportsWebP) return 'webp';
    return 'auto';
  }

  /**
   * Optimizes image URL with the best supported format for the current browser
   */
  static async optimizeWithBestFormat(
    src: string, 
    options: ImageOptimizationOptions = {}
  ): Promise<string> {
    const bestFormat = await this.getBestSupportedFormat();
    return this.optimizeImage(src, { ...options, format: bestFormat });
  }
}