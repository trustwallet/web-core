import { Component, ContentChild, Input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ContentDirective } from '../../directives/content.directive';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ContentComponent {
    @Input() header: string;

    @ContentChild(ContentDirective, { read: TemplateRef, static: false })
    contentTemplate;

    constructor() {}
}
