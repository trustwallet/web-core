import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { ContentDirective } from '../directives/content.directive';
import { ItemDirective } from '../directives/item.directive';
import { SectionDirective } from '../directives/section.directive';
import { DropdownComponent } from './dropdown/dropdown.component';
import { BlockBetweenComponent } from './block-between/block-between.component';
import { ListviewComponent } from './listview/listview.component';
import { BlockLeftDirective } from '../directives/block-left.directive';
import { BlockRightDirective } from '../directives/block-right.directive';
import { FooterDirective } from '../directives/footer.directive';
import { NoItemsDirective } from '../directives/no-items.directive';
import { PlaceholderDirective } from '../directives/placeholder.directive';
import { ContentComponent } from './content/content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LabelComponent } from './label/label.component';

@NgModule({
    declarations: [
        DropdownComponent,
        AppComponent,
        ListviewComponent,
        BlockBetweenComponent,
        ContentComponent,
        LabelComponent,
        ContentDirective,
        ItemDirective,
        SectionDirective,
        BlockLeftDirective,
        BlockRightDirective,
        FooterDirective,
        NoItemsDirective,
        PlaceholderDirective,
    ],
    entryComponents: [AppComponent],
    imports: [BrowserModule, NgbModule],
    providers: [],
})
export class AppModule {
    constructor(injector: Injector) {
        const el = createCustomElement(AppComponent, { injector });
        customElements.define('trust-coins', el);
    }

    ngDoBootstrap() {}
}
