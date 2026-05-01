import { Injectable } from '@angular/core'
import { ImageOptimizationOptions } from '@/types/seo.types'

@Injectable({
  providedIn: 'root',
})
export class ImageOptimizerService {
  private readonly DEFAULT_QUALITY = 80
  private readonly DEFAULT_FORMAT = 'webp'
  private readonly SUPPORTED_FORMATS = ['webp', 'avif', 'auto']

  optimizeImage(src: string, options: ImageOptimizationOptions = {}): string {
    const { quality = this.DEFAULT_QUALITY, format = this.DEFAULT_FORMAT, width, height } = options

    if (!this.SUPPORTED_FORMATS.includes(format)) {
      console.warn(`Unsupported format: ${format}. Falling back to ${this.DEFAULT_FORMAT}`)
    }

    const separator = src.includes('?') ? '&' : '?'

    let optimizedUrl = src
    const params = new URLSearchParams()
    if (format !== 'auto') {
      params.append('format', format)
    }
    params.append('q', quality.toString())

    if (width) {
      params.append('w', width.toString())
    }

    if (height) {
      params.append('h', height.toString())
    }

    if (params.toString()) {
      optimizedUrl += separator + params.toString()
    }

    return optimizedUrl
  }

  generateSrcSet(
    src: string,
    widths: number[],
    options: Omit<ImageOptimizationOptions, 'width'> = {},
  ): string {
    return widths
      .map(width => {
        const optimized = this.optimizeImage(src, { ...options, width })
        return `${optimized} ${width}w`
      })
      .join(', ')
  }

  getPlaceholderImage(width: number = 100, height: number = 100): string {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">
          Loading...
        </text>
      </svg>
    `)}`
  }

  supportsWebP(): boolean {
    const canvas = document.createElement('canvas')
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
  }

  supportsAVIF(): boolean {
    const canvas = document.createElement('canvas')
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0
  }

  getBestSupportedFormat(): 'webp' | 'avif' | 'jpeg' {
    if (this.supportsAVIF()) {
      return 'avif'
    }
    if (this.supportsWebP()) {
      return 'webp'
    }
    return 'jpeg'
  }
}
