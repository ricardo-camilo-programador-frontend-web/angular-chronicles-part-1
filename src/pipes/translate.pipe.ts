import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from '@/services/i18n.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private i18nService = inject(I18nService);
  private lastKey = '';
  private lastLocale = '';
  private cachedResult = '';

  transform(key: string): string {
    const currentLocale = this.i18nService.getLocale();
    if (key !== this.lastKey || currentLocale !== this.lastLocale) {
      this.lastKey = key;
      this.lastLocale = currentLocale;
      this.cachedResult = this.i18nService.translate(key);
    }
    return this.cachedResult;
  }
}
