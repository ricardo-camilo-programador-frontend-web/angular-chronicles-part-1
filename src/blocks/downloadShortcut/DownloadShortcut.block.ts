import { Component } from "@angular/core";

@Component({
  selector: "download-shortcut",
  standalone: true,
  template: `
    <a
      [href]="'#app-section'"
      class="rounded-full inline-flex items-center px-4 py-2 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
      role="button"
      aria-label="Go to download application section"
    >
      <span class="truncate">Download App</span>
    </a>
  `,
})

export class DownloadShortcutBlock {}
