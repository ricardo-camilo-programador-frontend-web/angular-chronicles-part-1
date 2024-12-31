import { Component } from "@angular/core";
import { ImageComponent } from "@/components/Image.component";
import { ButtonComponent } from "@/components/Button.component";
import { getRandomLinkForRedirection } from "@/utils/getRandomLinkForRedirection";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [ImageComponent, ButtonComponent],
  template: `
    <footer class="bg-white py-12 px-4 mt-auto bottom-0 pt-64">
      <div
        class="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-[1400px]"
      >
        <div class="space-y-4">
          <h2 class="text-[#FF5956] text-2xl font-bold">Foodhut</h2>
          <p class="text-gray-600 max-w-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
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

        <div class="space-y-4">
          <h3 class="text-[#FF5956] text-xl font-semibold">About Us</h3>
          <ul class="space-y-2">
            <li>
              <a
                [href]="[getRandomLinkForRedirection()]"
                class="text-gray-600 hover:text-[#FF5956]"
                rel="noopener"
                target="_blank"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                [href]="[getRandomLinkForRedirection()]"
                class="text-gray-600 hover:text-[#FF5956]"
                rel="noopener"
                target="_blank"
              >
                Service Us
              </a>
            </li>
            <li>
              <a
                [href]="[getRandomLinkForRedirection()]"
                class="text-gray-600 hover:text-[#FF5956]"
                rel="noopener"
                target="_blank"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                [href]="[getRandomLinkForRedirection()]"
                class="text-gray-600 hover:text-[#FF5956]"
                rel="noopener"
                target="_blank"
              >
                Company
              </a>
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <h3 class="text-[#FF5956] text-xl font-semibold">Company</h3>
          <ul class="space-y-2">
            <li>
              <a
                href="#"
                class="text-gray-600 hover:text-[#FF5956]"
                rel="noopener"
                target="_blank"
              >
                Partnership
              </a>
            </li>
            <li>
              <a
                [href]="[getRandomLinkForRedirection()]"
                class="text-gray-600 hover:text-[#FF5956]"
                rel="noopener"
                target="_blank"
              >
                Terms of Use
              </a>
            </li>
            <li>
              <a
                [href]="[getRandomLinkForRedirection()]"
                class="text-gray-600 hover:text-[#FF5956]"
                rel="noopener"
                target="_blank"
                >Privacy</a
              >
            </li>
            <li>
              <a
                [href]="[getRandomLinkForRedirection()]"
                class="text-gray-600 hover:text-[#FF5956]"
                rel="noopener"
                target="_blank"
                >Sitemap</a
              >
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <h3 class="text-[#FF5956] text-xl font-semibold">
            Get in touch
          </h3>
          <p class="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>

          <div class="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              class="flex-1 px-4 py-2 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-[#FF5956]"
            />
            <app-button
              [className]="
                'p-16  bg-[#FF5956] text-white hover:bg-[#ff4542] transition-colors rounded-full'
              "
            >
              Subscribe
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
          Copyright © 2022 Foodhut.
        </a>
      </div>
    </footer>
  `,
})

export class FooterComponent {
  getRandomLinkForRedirection() {
    return getRandomLinkForRedirection();
  }
}
