import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewEncapsulation,
} from '@angular/core';
import { ContentDirective } from '../../directives/content.directive';
import { Observable } from 'rxjs';
import { PlaceholderDirective } from '../../directives/placeholder.directive';
import { ItemDirective } from '../../directives/item.directive';
import { NoItemsDirective } from '../../directives/no-items.directive';
import { SectionDirective } from '../../directives/section.directive';
import { FooterDirective } from '../../directives/footer.directive';

@Component({
    selector: 'app-listview',
    templateUrl: './listview.component.html',
    styleUrls: ['./listview.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ListviewComponent implements AfterViewInit {
    @Input() header: string;
    @Input() placeholdersCount: number;
    @Input() dataSource: Observable<any[]>;
    @Input() custmizedCell: boolean;
    @Input() containerized: boolean;
    @Output() select = new EventEmitter();

    placeholders: any[] = [];

    @ContentChild(ItemDirective, { read: TemplateRef, static: false })
    itemTemplate;
    @ContentChild(NoItemsDirective, { read: TemplateRef, static: false })
    noItemTemplate;
    @ContentChild(PlaceholderDirective, { read: TemplateRef, static: false })
    placeholderTemplate;
    @ContentChild(SectionDirective, { read: TemplateRef, static: false })
    sectionTemplate;
    @ContentChild(FooterDirective, { read: TemplateRef, static: false })
    footerTemplate;

    constructor(private cdref: ChangeDetectorRef) {}

    click(item: any) {
        this.select.next(item);
    }

    ngAfterViewInit(): void {
        this.placeholders.length = this.placeholdersCount;
        this.placeholders.fill(0, 0, this.placeholdersCount);
        this.custmizedCell = this.custmizedCell === undefined ? true : this.custmizedCell;
        this.containerized = this.containerized === undefined ? true : this.containerized;
        this.cdref.detectChanges();
    }
}
