import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslatePipe } from '@/pipes/translate.pipe'
import { MetaService } from '@/services/meta.service'
import { ORGANIZATION_DATA, BREADCRUMB_PRIVACY_DATA } from '@/constants/structured-data.constants'
import { PageMetadata } from '@/types/seo.types'

@Component({
  selector: 'privacy-policy',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <main class="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-8 pt-32">
      <section class="text-gray-700 dark:text-gray-300">
        <h1
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8"
        >
          {{ "privacyPolicy.title" | translate }}
        </h1>

        <div class="prose dark:prose-invert max-w-none space-y-6">
          <p>
            {{ "privacyPolicy.p1" | translate }}
            <a
              href="https://food-hut-angular-chronicles-1.netlify.app/"
              target="_blank"
            >
              {{ "privacyPolicy.siteLink" | translate }}
            </a>
            {{ "privacyPolicy.p1End" | translate }}
          </p>
          <p>
            {{ "privacyPolicy.p2" | translate }}
          </p>
          <p>
            {{ "privacyPolicy.p3" | translate }}
          </p>
          <p>
            {{ "privacyPolicy.p4" | translate }}
          </p>
          <p>
            {{ "privacyPolicy.p5" | translate }}
            <a
              href="https://privacidade.me/"
              target="_BLANK"
              style="color: #576d96;text-decoration: none;"
              >{{ "privacyPolicy.privacyPolicies" | translate }}</a
            >.
          </p>
          <p>
            {{ "privacyPolicy.p6" | translate }}
          </p>
          <p>
            {{ "privacyPolicy.p7" | translate }}
          </p>
        </div>
      </section>

      <section class="text-gray-700 dark:text-gray-300">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {{ "privacyPolicy.securityTitle" | translate }}
        </h2>

        <div class="prose dark:prose-invert max-w-none">
          <p>
            {{ "privacyPolicy.securityP" | translate }}
            <a
              target="_BLANK"
              style="color: #576d96;text-decoration: none;"
              href="https://confiavel.com.br/https://food-hut-angular-chronicles-1.netlify.app/"
              rel="noopener noreferrer"
              >{{ "privacyPolicy.verification" | translate }}</a
            >{{ "privacyPolicy.securityPMid" | translate }}
            <a
              target="_BLANK"
              style="color: #576d96;text-decoration: none;"
              href="https://transparencyreport.google.com/safe-browsing/search?url=https://food-hut-angular-chronicles-1.netlify.app/"
              rel="noopener noreferrer"
              >{{ "privacyPolicy.googleSecurityTool" | translate }}</a
            >
            {{ "privacyPolicy.securityPEnd" | translate }}
          </p>
        </div>
      </section>

      <section class="text-gray-700 dark:text-gray-300">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {{ "privacyPolicy.cookieTitle" | translate }}
        </h2>

        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-4">
              {{ "privacyPolicy.whatAreCookies" | translate }}
            </h3>
            <p>
              {{ "privacyPolicy.cookiesP" | translate }}
            </p>
          </div>
        </div>
      </section>

      <section class="text-gray-700 dark:text-gray-300 space-y-6">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
          {{ "privacyPolicy.cookiesWeSet" | translate }}
        </h3>
        <ul class="space-y-4 list-none pl-0">
          <li class="border-l-4 border-gray-200 dark:border-gray-700 pl-4">
            <span class="font-medium">{{
              "privacyPolicy.cookieAccount" | translate
            }}</span>
            <p class="mt-2">
              {{ "privacyPolicy.cookieAccountP" | translate }}
            </p>
          </li>
          <li class="border-l-4 border-gray-200 dark:border-gray-700 pl-4">
            <span class="font-medium">{{
              "privacyPolicy.cookieLogin" | translate
            }}</span>
            <p class="mt-2">
              {{ "privacyPolicy.cookieLoginP" | translate }}
            </p>
          </li>
          <li class="border-l-4 border-gray-200 dark:border-gray-700 pl-4">
            <span class="font-medium">{{
              "privacyPolicy.cookieNewsletter" | translate
            }}</span>
            <p class="mt-2">
              {{ "privacyPolicy.cookieNewsletterP" | translate }}
            </p>
          </li>
          <li class="border-l-4 border-gray-200 dark:border-gray-700 pl-4">
            <span class="font-medium">{{
              "privacyPolicy.cookieShopping" | translate
            }}</span>
            <p class="mt-2">
              {{ "privacyPolicy.cookieShoppingP" | translate }}
            </p>
          </li>
          <li class="border-l-4 border-gray-200 dark:border-gray-700 pl-4">
            <span class="font-medium">{{
              "privacyPolicy.cookieSearch" | translate
            }}</span>
            <p class="mt-2">
              {{ "privacyPolicy.cookieSearchP" | translate }}
            </p>
          </li>
          <li class="border-l-4 border-gray-200 dark:border-gray-700 pl-4">
            <span class="font-medium">{{
              "privacyPolicy.cookieForms" | translate
            }}</span>
            <p class="mt-2">
              {{ "privacyPolicy.cookieFormsP" | translate }}
            </p>
          </li>
          <li class="border-l-4 border-gray-200 dark:border-gray-700 pl-4">
            <span class="font-medium">{{
              "privacyPolicy.cookiePreferences" | translate
            }}</span>
            <p class="mt-2">
              {{ "privacyPolicy.cookiePreferencesP" | translate }}
            </p>
          </li>
        </ul>
      </section>

      <section class="text-gray-700 dark:text-gray-300 space-y-6">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
          {{ "privacyPolicy.thirdPartyCookies" | translate }}
        </h3>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            {{ "privacyPolicy.thirdPartyP" | translate }}
          </p>
          <ul>
            <li>
              {{ "privacyPolicy.thisSiteUses" | translate }}
              <a href="https://analytics.google.com/analytics/web/">{{
                "privacyPolicy.googleAnalytics" | translate
              }}</a
              >{{ "privacyPolicy.googleAnalyticsP" | translate }}
            </li>
          </ul>
          <p>
            {{ "privacyPolicy.gaMoreInfoP" | translate }}
          </p>
          <ul>
            <li>
              {{ "privacyPolicy.tpAnalyticsP" | translate }}
            </li>
            <li>
              {{ "privacyPolicy.tpFeaturesP" | translate }}
            </li>
            <li>
              {{ "privacyPolicy.tpProductsP" | translate }}
            </li>
          </ul>
        </div>
      </section>

      <section class="text-gray-700 dark:text-gray-300 space-y-6">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
          {{ "privacyPolicy.userCommitment" | translate }}
        </h3>
        <p>
          {{ "privacyPolicy.userCommitmentP" | translate }}
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li>
            {{ "privacyPolicy.commitmentA" | translate }}
          </li>
          <li>
            {{ "privacyPolicy.commitmentB" | translate }}
          </li>
          <li>
            {{ "privacyPolicy.commitmentC" | translate }}
          </li>
        </ul>
      </section>

      <section class="text-gray-700 dark:text-gray-300 space-y-6">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
          {{ "privacyPolicy.blockCookies" | translate }}
        </h3>
        <p>
          {{ "privacyPolicy.blockCookiesP" | translate }}
        </p>
        <ul class="space-y-2">
          <li>
            <a
              href="https://support.google.com/accounts/answer/61416?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {{ "privacyPolicy.chrome" | translate }}
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectlocale=en-US&amp;redirectslug=enable-and-disable-cookies-website-preferences"
              class="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {{ "privacyPolicy.firefox" | translate }}
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://support.microsoft.com/pt-br/help/17442/windows-internet-explorer-delete-manage-cookies"
              class="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {{ "privacyPolicy.edge" | translate }}
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://blogs.opera.com/news/2015/08/how-to-manage-cookies-in-opera/"
              class="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {{ "privacyPolicy.opera" | translate }}
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac"
              class="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {{ "privacyPolicy.safari" | translate }} </a
            >.
          </li>
        </ul>
      </section>

      <section class="text-gray-700 dark:text-gray-300 space-y-4">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
          {{ "privacyPolicy.moreInfo" | translate }}
        </h3>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            {{ "privacyPolicy.moreInfoP" | translate }}
          </p>
        </div>
        <p class="text-sm mt-8">
          {{ "privacyPolicy.effectiveAs" | translate }}
          <strong>{{ "privacyPolicy.month" | translate }}</strong
          >/<strong>{{ "privacyPolicy.year" | translate }}</strong
          >.
        </p>
      </section>
    </main>
  `,
})
export class PrivacyComponent {
  constructor(private metaService: MetaService) {
    this.updatePageMetadata()
  }

  private updatePageMetadata(): void {
    const metadata: PageMetadata = {
      title: 'Privacy Policy - Food Hut Angular Chronicles',
      description: 'Read the privacy policy for Food Hut Angular Chronicles application. Learn how we handle your data and protect your privacy.',
      image: 'https://food-hut-angular-chronicles-1.netlify.app/assets/images/food-hut-og.jpg',
      url: 'https://food-hut-angular-chronicles-1.netlify.app/privacy-policy',
      structuredData: [ORGANIZATION_DATA, BREADCRUMB_PRIVACY_DATA],
    }

    this.metaService.updateMetaTags(metadata)
    this.metaService.generateStructuredData(metadata.structuredData)
  }
}
