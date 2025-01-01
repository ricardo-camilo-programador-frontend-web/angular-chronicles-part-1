import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import Clarity from "@microsoft/clarity";
import { clarityId } from "@/configs/env";
import {
  saveItemOnLocalStorage,
  removeItemFromLocalStorage,
} from "@/utils/localStorageHandler";

@Component({
  selector: "tracking-consent",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
        role="dialog"
        aria-modal="true"
      >
        <h2 class="text-xl font-semibold mb-4">
          🔒 Consentimento de Rastreamento
        </h2>

        <p class="mb-4 text-gray-600">
          Gostaríamos de usar ferramentas de análise para melhorar sua
          experiência. Para saber mais, consulte nossa
          <a
            href="/politicas-de-privacidade"
            class="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
          >
            Política de Privacidade </a
          >.
        </p>

        <div class="flex gap-4 justify-end">
          <button
            (click)="handleConsent(false)"
            class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Recusar rastreamento"
          >
            Recusar
          </button>
          <button
            (click)="handleConsent(true)"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            aria-label="Aceitar rastreamento"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  `,
})
export class TrackingConsentComponent implements OnInit {
  private readonly CONSENT_KEY = "tracking-consent";
  showModal = false;

  ngOnInit(): void {
    const savedConsent = localStorage.getItem(this.CONSENT_KEY);
    if (savedConsent === null) {
      this.showModal = true;
    } else if (savedConsent === "true") {
      this.initializeClarity();
    }
  }

  /**
   * Handles the user's consent choice for tracking
   * @param consent - Boolean indicating if user accepted tracking
   */
  handleConsent(consent: boolean): void {
    this.showModal = false;
    saveItemOnLocalStorage(this.CONSENT_KEY, consent.toString());

    if (consent) {
      this.initializeClarity();
    }
  }

  /**
   * Initializes Microsoft Clarity tracking
   */
  private initializeClarity(): void {
    if (clarityId) {
      Clarity.init(clarityId);
    }
  }
}
