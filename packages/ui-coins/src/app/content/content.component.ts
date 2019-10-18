import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { ContentDirective } from '../../directives/content.directive';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
    @Input() header: string;

    @ContentChild(ContentDirective, { read: TemplateRef, static: false })
    contentTemplate;

    constructor() {}
}
