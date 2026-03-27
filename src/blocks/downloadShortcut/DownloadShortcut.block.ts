import { CommonModule } from "@angular/common";
import { Component, Input, computed, inject } from "@angular/core";
import { I18nService } from "@/services/i18n.service";

@Component({
  selector: "download-shortcut",
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      [href]="'#app-section'"
      class="rounded-full inline-flex items-center px-4 py-2 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors {{className}}"
      role="button"
      [attr.aria-label]="downloadAppLabel()"
    >
      <span class="truncate">{{ downloadAppLabel() }}</span>
    </a>
  `,
})

export class DownloadShortcutBlock {
  @Input() className: string = "";
  private i18nService = inject(I18nService);
  downloadAppLabel = computed(() => this.i18nService.translations().header.downloadApp);
}
