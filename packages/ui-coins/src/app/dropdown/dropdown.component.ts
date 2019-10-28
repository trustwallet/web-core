import {
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as nanoid from 'nanoid';
import { ContentDirective } from '../../directives/content.directive';
import { ItemDirective } from '../../directives/item.directive';
import { SectionDirective } from '../../directives/section.directive';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent implements OnInit {
    @Input() items: Observable<any[]>;
    @Input() selectedItem?: (item: any) => boolean;
    @Input() selectedIndex?: number;
    @Output()
    select = new EventEmitter();

    @ContentChild(ContentDirective, { read: TemplateRef, static: false })
    contentTemplate;

    @ContentChild(ItemDirective, { read: TemplateRef, static: false })
    itemTemplate;

    @ContentChild(SectionDirective, { read: TemplateRef, static: false })
    sectionTemplate;

    @ViewChild('dropDown', { static: true }) dropDown: NgbDropdown;

    id = nanoid();
    item: Observable<any>;

    constructor() {}

    selected(item: any) {
        this.dropDown.close();
        this.select.emit(item);
    }

    ngOnInit(): void {
        this.item = combineLatest([this.items, this.select.pipe(startWith(null as object))]).pipe(
            map(([items, selected]) => {
                if (!selected) {
                    let result;
                    if (this.selectedItem) {
                        result = items.find(item => this.selectedItem(item));
                    } else {
                        result = items[this.selectedIndex];
                    }
                    this.selected(result);
                    return result;
                } else {
                    return selected;
                }
            }),
        );
    }
}
