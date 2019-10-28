import { Component, ContentChild, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ContentDirective } from '../../directives/content.directive';
import { BlockLeftDirective } from '../../directives/block-left.directive';
import { BlockRightDirective } from '../../directives/block-right.directive';

@Component({
    selector: 'app-block-between',
    templateUrl: './block-between.component.html',
    styleUrls: ['./block-between.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BlockBetweenComponent {
    constructor() {}

    @ContentChild(BlockLeftDirective, { read: TemplateRef, static: false })
    leftTemplate;

    @ContentChild(BlockRightDirective, { read: TemplateRef, static: false })
    rightTemplate;
}
