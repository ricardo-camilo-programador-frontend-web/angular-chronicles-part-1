import { Injectable, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  url: string;
}

export interface WebVitals {
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
  INP?: number; // Interaction to Next Paint
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitorService {
  private metrics: PerformanceMetric[] = [];
  private webVitals: WebVitals = {};
  private navigationTiming: PerformanceNavigationTiming | null = null;

  constructor(
    private router: Router,
    private ngZone: NgZone
  ) {
    this.initializePerformanceMonitoring();
    this.setupNavigationTracking();
  }

  private initializePerformanceMonitoring(): void {
    if (!this.isPerformanceSupported()) {
      console.warn('Performance API not supported');
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.observeWebVitals();
      this.observeNavigationTiming();
      this.observeResourceTiming();
    });
  }

  private isPerformanceSupported(): boolean {
    return 'performance' in window && 'PerformanceObserver' in window;
  }

  private observeWebVitals(): void {
    try {
      // First Contentful Paint
      const paintObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find((entry: PerformanceEntry) => entry.name === 'first-contentful-paint');
        
        if (fcpEntry) {
          this.webVitals.FCP = fcpEntry.startTime;
          this.recordMetric('FCP', fcpEntry.startTime);
        }
      });

      paintObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcpEntry = entries[entries.length - 1] as PerformanceEntry;
        
        this.webVitals.LCP = lcpEntry.startTime;
        this.recordMetric('LCP', lcpEntry.startTime);
      });

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        let clsValue = 0;
        
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        this.webVitals.CLS = clsValue;
        this.recordMetric('CLS', clsValue);
      });

      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // First Input Delay / Interaction to Next Paint
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstInput = entries[0] as any;
        
        if (firstInput) {
          this.webVitals.FID = firstInput.processingStart - firstInput.startTime;
          this.webVitals.INP = firstInput.processingStart - firstInput.startTime;
          this.recordMetric('FID', this.webVitals.FID);
          this.recordMetric('INP', this.webVitals.INP);
        }
      });

      fidObserver.observe({ entryTypes: ['first-input', 'event'] });

    } catch (error) {
      console.warn('Error observing web vitals:', error);
    }
  }

  private observeNavigationTiming(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigation) {
            this.navigationTiming = navigation;
            this.webVitals.TTFB = navigation.responseStart - navigation.requestStart;
            this.recordMetric('TTFB', this.webVitals.TTFB);
            
            // Record additional navigation metrics
            this.recordMetric('PageLoadTime', navigation.loadEventEnd - navigation.fetchStart);
            this.recordMetric('DOMInteractive', navigation.domInteractive - navigation.fetchStart);
            this.recordMetric('FirstByte', navigation.responseStart - navigation.fetchStart);
          }
        }, 0);
      });
    });
  }

  private observeResourceTiming(): void {
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry: PerformanceEntry) => {
          if ((entry as PerformanceResourceTiming).initiatorType === 'script' || (entry as PerformanceResourceTiming).initiatorType === 'css') {
            const resourceEntry = entry as PerformanceResourceTiming;
            this.recordMetric(`Resource-${resourceEntry.initiatorType}`, resourceEntry.duration, resourceEntry.name);
          }
        });
      });

      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.warn('Error observing resource timing:', error);
    }
  }

  private setupNavigationTracking(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.recordMetric('RouteChange', Date.now());
      this.clearResourceMetrics();
    });
  }

  private recordMetric(name: string, value: number, additionalInfo?: string): void {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      url: additionalInfo || window.location.href
    };

    this.metrics.push(metric);

    // Keep only last 100 metrics to prevent memory issues
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }

    // Log metrics to console for debugging
    if (this.isDevelopmentMode()) {
      console.log(`Performance Metric: ${name} = ${value}ms`, metric);
    }

    // Send to analytics if needed
    this.sendToAnalytics(metric);
  }

  private sendToAnalytics(metric: PerformanceMetric): void {
    if (this.isDevelopmentMode()) {
      console.log('Analytics metric:', metric);
      return;
    }

    this.sendToGoogleAnalytics(metric);
  }

  private sendToGoogleAnalytics(metric: PerformanceMetric): void {
    const windowWithGtag = window as any;
    if (typeof window !== 'undefined' && windowWithGtag.gtag) {
      windowWithGtag.gtag('event', 'performance_metric', {
        metric_name: metric.name,
        metric_value: metric.value,
        page_location: metric.url
      });
    }
  }

  private isDevelopmentMode(): boolean {
    return !window.location.hostname.includes('netlify.app') && 
           (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  }

  private clearResourceMetrics(): void {
    // Clear resource-specific metrics on navigation to keep memory usage low
    this.metrics = this.metrics.filter(metric => 
      !metric.name.startsWith('Resource-')
    );
  }

  public getWebVitals(): WebVitals {
    return { ...this.webVitals };
  }

  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  public getLatestMetric(name: string): PerformanceMetric | null {
    const metricIndex = this.metrics
      .slice()
      .reverse()
      .findIndex(metric => metric.name === name);
    
    return metricIndex !== -1 ? this.metrics[this.metrics.length - 1 - metricIndex] : null;
  }

  public getAverageMetric(name: string): number | null {
    const relevantMetrics = this.metrics.filter(metric => metric.name === name);
    
    if (relevantMetrics.length === 0) {
      return null;
    }
    
    const sum = relevantMetrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / relevantMetrics.length;
  }

  public generatePerformanceReport(): string {
    const report = {
      url: window.location.href,
      timestamp: new Date().toISOString(),
      webVitals: this.webVitals,
      navigation: this.navigationTiming ? {
        pageLoadTime: this.navigationTiming.loadEventEnd - this.navigationTiming.fetchStart,
        domInteractive: this.navigationTiming.domInteractive - this.navigationTiming.fetchStart,
        firstByte: this.navigationTiming.responseStart - this.navigationTiming.fetchStart,
        domComplete: this.navigationTiming.domComplete - this.navigationTiming.fetchStart
      } : null,
      recentMetrics: this.metrics.slice(-10)
    };

    return JSON.stringify(report, null, 2);
  }

  public logPerformanceScore(): void {
    const vitals = this.webVitals;
    
    console.group('Performance Score');
    console.log('Web Vitals:', vitals);
    
    if (vitals.LCP && vitals.FID && vitals.CLS) {
      const score = this.calculatePerformanceScore(vitals);
      console.log('Performance Score:', score);
      
      if (score >= 90) {
        console.log('🟢 Excellent performance!');
      } else if (score >= 50) {
        console.log('🟡 Good performance, but there is room for improvement');
      } else {
        console.log('🔴 Poor performance, optimization needed');
      }
    }
    
    console.groupEnd();
  }

  private calculatePerformanceScore(vitals: WebVitals): number {
    let score = 100;
    
    // LCP scoring (2.5s is good)
    if (vitals.LCP) {
      if (vitals.LCP > 4000) score -= 30;
      else if (vitals.LCP > 2500) score -= 15;
    }
    
    // FID scoring (100ms is good)
    if (vitals.FID) {
      if (vitals.FID > 300) score -= 30;
      else if (vitals.FID > 100) score -= 15;
    }
    
    // CLS scoring (0.1 is good)
    if (vitals.CLS) {
      if (vitals.CLS > 0.25) score -= 30;
      else if (vitals.CLS > 0.1) score -= 15;
    }
    
    // TTFB scoring (600ms is good)
    if (vitals.TTFB) {
      if (vitals.TTFB > 1800) score -= 20;
      else if (vitals.TTFB > 600) score -= 10;
    }
    
    return Math.max(0, score);
  }

  public startCustomMeasurement(name: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const duration = performance.now() - startTime;
      this.recordMetric(`Custom-${name}`, duration);
    };
  }
}