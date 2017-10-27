import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '../shared/shared.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpModule } from '@angular/http'

import { MdIconRegistry } from '@angular/material'
import { DomSanitizer } from '@angular/platform-browser'
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { loadSvgResources } from "../utils/svg.util";

@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    HttpModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class CoreModule {
  constructor ( @Optional() @SkipSelf() parent: CoreModule,
                ir: MdIconRegistry,
                ds: DomSanitizer ) {
    if (parent) {
      throw new Error('模块已经存在，不能再次加载模块')
    }

    loadSvgResources(ir, ds)
  }
}
