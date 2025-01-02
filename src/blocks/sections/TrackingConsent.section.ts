import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import Clarity from "@microsoft/clarity";
import { clarityId } from "@/configs/env";
import {
  saveItemOnLocalStorage,
} from "@/utils/localStorageHandler";

@Component({
  selector: "tracking-consent",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="showModal"
      class="fixed bottom-6 right-0 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
        role="dialog"
        aria-modal="true"
      >
        <h2 class="text-xl font-semibold mb-4">🔒 Tracking Consent</h2>

        <p class="mb-4 text-gray-600">
          We would like to use analytics tools to improve your experience. To
          learn more, please see our
          <a
            href="/privacy-policy"
            class="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
          >
            Privacy Policy </a
          >.
        </p>

        <div class="flex gap-4 justify-end">
          <button
            (click)="handleConsent(false)"
            class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Decline tracking"
          >
            Decline
          </button>
          <button
            (click)="handleConsent(true)"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            aria-label="Accept tracking"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  `,
})
export class TrackingConsentComponent implements OnInit {
  private readonly CONSENT_KEY = "tracking-consent";
  private readonly HAS_CHOSEN_KEY = "has-chosen-tracking";
  showModal = false;

  ngOnInit(): void {
    const hasChosen = localStorage.getItem(this.HAS_CHOSEN_KEY);
    const savedConsent = localStorage.getItem(this.CONSENT_KEY);

    if (hasChosen !== "true") {
      this.showModal = true;
      saveItemOnLocalStorage(this.CONSENT_KEY, "true");
      this.initializeClarity();
      return;
    }

    if (savedConsent === "true") {
      this.initializeClarity();
    }
  }

  handleConsent(consent: boolean): void {
    this.showModal = false;

    saveItemOnLocalStorage(this.HAS_CHOSEN_KEY, "true");

    if (!consent) {
      saveItemOnLocalStorage(this.CONSENT_KEY, "false");
    }
  }

  private initializeClarity(): void {
    if (clarityId) {
      Clarity.init(clarityId);
    }
  }
}
