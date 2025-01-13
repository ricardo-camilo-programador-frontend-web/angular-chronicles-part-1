import { Component, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { ModalComponent } from "@/components/Modal.component";
import { CommonModule } from "@angular/common";
import { saveItemOnLocalStorage } from "@/utils/localStorageHandler";
import { Router, RouterModule } from "@angular/router";
import { ImageComponent } from "@/components/Image.component";

@Component({
  selector: "intro-warning-modal",
  standalone: true,
  imports: [ModalComponent, CommonModule, RouterModule, ImageComponent],
  template: `
    <app-modal
      [id]="'intro-warning-modal'"
      [title]="'🍽️ Food Hut - Angular Chronicles'"
      [isOpen]="isOpen"
      [class]="'w-screen h-screen overflow-hidden overflow-y-scroll z-[9999]'"
      (closeModal)="closeModal()"
    >
      <div class="p-2 space-y-6">
        <div
          class="p-4 rounded-lg shadow-md bg-gradient-to-r from-red-600 to-red-100"
        >
          <p class="text-lg font-medium text-center text-white">
            Welcome to my study project! 🚀
          </p>
        </div>

        <div class="rounded-lg bg-gray-50 flex flex-col gap-1">
          <div
            class="flex items-center justify-between p-2 rounded-lg bg-gray-50"
          >
            <span class="text-gray-700"> Allow Analytics Tools </span>
            <button
              (click)="toggleAnalytics()"
              [class]="getToggleButtonClasses()"
              role="switch"
              [attr.aria-checked]="analyticsEnabled"
            >
              <span [class]="getToggleSpanClasses()"></span>
            </button>
          </div>

          <a
            [routerLink]="['/privacy-policy']"
            class="flex items-center justify-center gap-2 p-1 py-2 transition-colors rounded-lg bg-gray-50 text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="font-medium">
              Privacy Policy
            </span>
          </a>
        </div>

        <div class="p-4 rounded-lg bg-gray-50">
          <p class="leading-relaxed text-center text-gray-700">
            This is a demonstration of my frontend development skills, focusing
            on modern web technologies and best practices.
          </p>
        </div>

        <div class="space-y-3">
          <div class="relative">
            <div class="absolute -inset-5 flex items-center justify-center">
              <div
                class="w-full h-[50%] max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-green-600 animate-pulse"
              ></div>
            </div>

            <a
              [href]="portfolioUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 p-3 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100 relative  mx-auto"
            >
              <app-image
                [src]="
                  'assets/images/ricardo-camilo-frontend-developer-frontend-engineer-software-engineer-web-developer-vuejs-vue-reactjs-react-javascript-typescript-component-architecture.webp'
                "
                [alt]="'Heart circle'"
                [className]="'w-8 h-8 mr-2'"
              ></app-image>

              <span class="font-medium text-gray-700">
                Check out my portfolio
              </span>
            </a>
          </div>

          <a
            [href]="'https://www.linkedin.com/in/' + linkedinUsername"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 p-3 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
          >
            <svg
              class="w-6 h-6 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
            <span class="font-medium text-blue-600">
              Connect with me on LinkedIn
            </span>
          </a>
        </div>

        <div class="pt-4 mt-4 border-t">
          <p class="text-sm text-center text-gray-500">
            Design Credits:
            <a
              [href]="'https://www.figma.com/' + figmaUsername"
              target="_blank"
              rel="noopener noreferrer"
              class="ml-1 text-green-600 hover:text-green-700"
            >
              {{ figmaUsername }}
            </a>
          </p>
          <p class="mt-1 text-sm text-center text-gray-500">
            <a
              [href]="
                'https://www.figma.com/community/file/' + figmaOriginalDesign
              "
              target="_blank"
              rel="noopener noreferrer"
              class="text-green-600 hover:text-green-700"
            >
              View original design
            </a>
          </p>
        </div>
      </div>
    </app-modal>
  `,
})
export class IntroWarningModalSection implements AfterViewInit {
  linkedinUsername = "ricardo-camilo-programador-frontend-web-developer";
  portfolioUrl = "https://persona-nextjs-chronicles-part-2.netlify.app/";
  figmaUsername = "@KamranAlime";
  figmaOriginalDesign = "1103820487891554272";
  analyticsEnabled = true;
  isOpen = false;

  checkIfPageIsPrivacyPolicy() {
    return this.router.url === "/privacy-policy";
  }

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      saveItemOnLocalStorage("analyticsEnabled", String(this.analyticsEnabled));

      if (this.checkIfPageIsPrivacyPolicy()) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }

      this.cdr.detectChanges();
    });
  }

  closeModal(): void {
    Promise.resolve().then(() => {
      this.isOpen = false;
      this.cdr.detectChanges();
    });
  }

  openModal(): void {
    Promise.resolve().then(() => {
      this.isOpen = true;
      this.cdr.detectChanges();
    });
  }

  toggleAnalytics(): void {
    Promise.resolve().then(() => {
      this.analyticsEnabled = !this.analyticsEnabled;
      this.cdr.detectChanges();
    });
  }

  getToggleButtonClasses(): string {
    return `relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
      this.analyticsEnabled ? "bg-red-600" : "bg-gray-200"
    }`;
  }

  getToggleSpanClasses(): string {
    return `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
      this.analyticsEnabled ? "translate-x-6" : "translate-x-1"
    }`;
  }
}
