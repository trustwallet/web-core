import { Component, ContentChild, Input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ContentDirective } from '../../directives/content.directive';

@Component({
    selector: 'app-label',
    templateUrl: './label.component.html',
    styleUrls: ['./label.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LabelComponent {
    @Input() image: string;
    @Input() alt: string;

    constructor() {}

    @ContentChild(ContentDirective, { read: TemplateRef, static: false })
    contentTemplate;
}
