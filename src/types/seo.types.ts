export interface ImageOptimizationOptions {
  quality?: number
  format?: 'webp' | 'avif' | 'auto'
  width?: number
  height?: number
}

export interface PageMetadata {
  title: string
  description: string
  image: string
  url: string
  structuredData?: any
}

export interface LighthouseScore {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
  pwa?: number
}
