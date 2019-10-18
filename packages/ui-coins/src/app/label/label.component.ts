import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { ContentDirective } from '../../directives/content.directive';

@Component({
    selector: 'app-label',
    templateUrl: './label.component.html',
    styleUrls: ['./label.component.scss'],
})
export class LabelComponent {
    @Input() image: string;
    @Input() alt: string;

    constructor() {}

    @ContentChild(ContentDirective, { read: TemplateRef, static: false })
    contentTemplate;
}
