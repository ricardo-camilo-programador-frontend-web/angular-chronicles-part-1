import { Component, ChangeDetectionStrategy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IntroSection } from '@/blocks/sections/intro/intro.section'
import { SpecialOffersSection } from '@/blocks/sections/special-offers/special-offers.section'
import { AboutUsSection } from '@/blocks/sections/about-us/about-us.section'
import { MenuSection } from '@/blocks/sections/menu/menu.section'
import { AppSection } from '@/blocks/sections/app/app.section'
import { MetaService } from '@/services/meta.service'
import { ORGANIZATION_DATA, WEBSITE_DATA, LOCAL_BUSINESS_DATA, BREADCRUMB_HOME_DATA } from '@/constants/structured-data.constants'
import { PageMetadata } from '@/types/seo.types'

@Component({
  selector: 'home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IntroSection,
    SpecialOffersSection,
    AboutUsSection,
    MenuSection,
    AppSection,
  ],
  template: `
    <div class="grid grid-cols-1 gap-16 pt-[6rem]">
      <intro-section></intro-section>
      <special-offers-section></special-offers-section>
      <about-us-section></about-us-section>
      <menu-section></menu-section>
      <app-section></app-section>
    </div>
  `,
})

export class HomeComponent {
  constructor(private metaService: MetaService) {
    this.updatePageMetadata()
  }

  private updatePageMetadata(): void {
    const metadata: PageMetadata = {
      title: 'Food Hut - Premium Food Delivery | Angular Chronicles',
      description: 'Order delicious food online with fast delivery. Authentic cuisine from around the world. Built with Angular showcasing modern web development capabilities.',
      image: 'https://food-hut-angular-chronicles-1.netlify.app/assets/images/food-hut-og.jpg',
      url: 'https://food-hut-angular-chronicles-1.netlify.app/',
      structuredData: [ORGANIZATION_DATA, WEBSITE_DATA, LOCAL_BUSINESS_DATA, BREADCRUMB_HOME_DATA],
    }

    this.metaService.updateMetaTags(metadata)
    this.metaService.generateStructuredData(metadata.structuredData)
  }
}
