import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: 'app-image',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      [src]="src"
      [alt]="alt"
      [width]="width"
      [height]="height"
      [loading]="loading"
      [class]="className"
    >
  `
})

export class ImageComponent {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() width: string = '';
  @Input() height: string = '';
  @Input() loading: string = 'lazy';
  @Input() className: string = '';
}
