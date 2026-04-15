import { Pipe, PipeTransform, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { I18nService } from '@/services/i18n.service';
import { signal, computed } from '@angular/core';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private i18nService = inject(I18nService);
  private locale = this.i18nService.getLocaleSignal();
  private _key = signal('');

  transform(key: string): string {
    this._key.set(key);
    this.locale(); // trigger re-evaluation on locale change
    return this.i18nService.translate(key);
  }
}
