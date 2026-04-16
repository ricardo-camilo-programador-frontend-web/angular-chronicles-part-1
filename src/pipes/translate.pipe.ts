import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from '@/services/i18n.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private i18nService = inject(I18nService);

  transform(key: string): string {
    this.i18nService.getLocaleSignal()();
    return this.i18nService.translate(key);
  }
}
