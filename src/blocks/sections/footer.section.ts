import { Component, inject } from "@angular/core";
import { ImageComponent } from "@/components/Image.component";
import { ButtonComponent } from "@/components/Button.component";
import { getRandomLinkForRedirection } from "@/utils/getRandomLinkForRedirection";
import { InputTextComponent } from "@/components/InputText.component";
import { RouterModule } from "@angular/router";
import { BuyMeCoffeeComponent } from "@/components/BuyMeCoffee.component";
import { I18nService } from "@/services/i18n.service";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [ImageComponent, ButtonComponent, InputTextComponent, RouterModule, BuyMeCoffeeComponent],
  template: `
    <footer
      class="bg-white py-12 px-4 mt-auto bottom-0 w-full max-w-[1300px] mx-auto flex flex-col items-center justify-center pt-[15rem] md:pt-[5rem]"
    >
      <div
        class="flex flex-col md:flex-row w-full justify-between gap-8"
      >
        <div class="w-full md:max-w-[21rem] flex flex-col gap-4">
          <h2 class="text-red-500 text-2xl font-bold">{{ title }}</h2>
          <p class="text-gray-600 max-w-xs">
            {{ description }}
          </p>

          <div class="flex space-x-4">
            <a
              [href]="[getRandomLinkForRedirection()]"
              class="text-[#FDB100] hover:opacity-80"
              rel="noopener"
              target="_blank"
            >
              <app-image
                [src]="'assets/svg/facebookIcon.svg'"
                [alt]="'Facebook'"
                [className]="'w-6 h-6'"
              />
            </a>
            <a
              [href]="[getRandomLinkForRedirection()]"
              class="text-[#FDB100] hover:opacity-80"
              rel="noopener"
              target="_blank"
            >
              <app-image
                [src]="'assets/svg/instagramIcon.svg'"
                [alt]="'Instagram'"
                [className]="'w-6 h-6'"
              />
            </a>
            <a
              [href]="[getRandomLinkForRedirection()]"
              class="text-[#FDB100] hover:opacity-80"
              rel="noopener"
              target="_blank"
            >
              <app-image
                [src]="'assets/svg/twitterIcon.svg'"
                [alt]="'Twitter'"
                [className]="'w-6 h-6'"
              />
            </a>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row md:flex-nowrap justify-between w-full md:max-w-[20rem] gap-8 md:gap-4"
        >
          <div class="min-w-[10rem]">
            <h3 class="text-red-500 text-xl font-semibold">{{ aboutUs }}</h3>
            <ul class="space-y-2">
              <li>
                <a
                  [href]="[getRandomLinkForRedirection()]"
                  class="text-gray-600 hover:text-red-500"
                  rel="noopener"
                  target="_blank"
                >
                  {{ aboutUs }}
                </a>
              </li>
              <li>
                <a
                  [href]="[getRandomLinkForRedirection()]"
                  class="text-gray-600 hover:text-red-500"
                  rel="noopener"
                  target="_blank"
                >
                  {{ serviceUs }}
                </a>
              </li>
              <li>
                <a
                  [href]="[getRandomLinkForRedirection()]"
                  class="text-gray-600 hover:text-red-500"
                  rel="noopener"
                  target="_blank"
                >
                  {{ contact }}
                </a>
              </li>
              <li>
                <a
                  [href]="[getRandomLinkForRedirection()]"
                  class="text-gray-600 hover:text-red-500"
                  rel="noopener"
                  target="_blank"
                >
                  {{ company }}
                </a>
              </li>
            </ul>
          </div>

          <div class="min-w-[10rem]">
            <h3 class="text-red-500 text-xl font-semibold">{{ company }}</h3>
            <ul class="space-y-2">
              <li>
                <a
                  [href]="[getRandomLinkForRedirection()]"
                  class="text-gray-600 hover:text-red-500"
                  rel="noopener"
                  target="_blank"
                >
                  {{ partnership }}
                </a>
              </li>
              <li>
                <a
                  [href]="[getRandomLinkForRedirection()]"
                  class="text-gray-600 hover:text-red-500"
                  rel="noopener"
                  target="_blank"
                >
                  {{ termsOfUse }}
                </a>
              </li>
              <li>
                <a
                  [routerLink]="['/privacy-policy']"
                  class="text-gray-600 hover:text-red-500"
                  rel="noopener"
                  target="_blank"
                  >{{ privacy }}</a
                >
              </li>
              <li>
                <a
                  [href]="[getRandomLinkForRedirection()]"
                  class="text-gray-600 hover:text-red-500"
                  rel="noopener"
                  target="_blank"
                  >{{ sitemap }}</a
                >
              </li>
            </ul>
          </div>
        </div>

        <div class="w-full md:max-w-[20rem] flex flex-col gap-4">
          <div class="flex flex-col gap-4 mr-auto">
            <h3 class="text-red-500 text-xl font-semibold">
              {{ getInTouch }}
            </h3>
            <p class="text-gray-600">
              {{ newsletterDescription }}
            </p>
          </div>

          <buy-me-coffee username="ricardo.camilo.frontend"></buy-me-coffee>

          <div class="flex flex-col sm:flex-row gap-5 items-center justify-center">
            <app-input-text
              [inputClassName]="'min-w-[12rem] w-full px-4 py-2 rounded-full bg-gray-200'"
              type="email"
              [placeholder]="emailPlaceholder"
              class="min-w-[12rem] w-full px-4 py-2 rounded-lg "
            />

            <app-button
              [className]="
                'w-full sm:w-auto px-6 py-2 bg-red-500 text-white hover:bg-[#ff4542] transition-colors rounded-full'
              "
              [label]="subscribe"
            >
            </app-button>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center text-gray-600">
        <a
          [href]="[getRandomLinkForRedirection()]"
          class="hover:text-red-500"
          rel="noopener"
          target="_blank"
        >
          {{ copyright }}
        </a>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  private i18nService = inject(I18nService);

  currentYear = new Date().getFullYear();

  get title() { return this.i18nService.translations().footer.title }
  get description() { return this.i18nService.translations().footer.description }
  get aboutUs() { return this.i18nService.translations().footer.aboutUs }
  get serviceUs() { return this.i18nService.translations().footer.serviceUs }
  get contact() { return this.i18nService.translations().footer.contact }
  get company() { return this.i18nService.translations().footer.company }
  get partnership() { return this.i18nService.translations().footer.partnership }
  get termsOfUse() { return this.i18nService.translations().footer.termsOfUse }
  get privacy() { return this.i18nService.translations().footer.privacy }
  get sitemap() { return this.i18nService.translations().footer.sitemap }
  get getInTouch() { return this.i18nService.translations().footer.getInTouch }
  get newsletterDescription() { return this.i18nService.translations().footer.newsletterDescription }
  get subscribe() { return this.i18nService.translations().footer.subscribe }
  get emailPlaceholder() { return this.i18nService.translations().footer.emailPlaceholder }
  get copyright() { return this.i18nService.translations().footer.copyright.replace('{year}', String(this.currentYear)) }

  getRandomLinkForRedirection() {
    return getRandomLinkForRedirection();
  }
}
