import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '../shared/shared.module'
import { HttpModule } from '@angular/http'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from "../app-routing.module";
import { ServicesModule } from "../services/services.module";

import { MdIconRegistry } from '@angular/material'
import { DomSanitizer } from '@angular/platform-browser'
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { loadSvgResources } from "../utils/svg.util";
import 'rxjs/add/operator/take'
import 'rxjs/observable/combineLatest'
import '../utils/debug.util'

import 'hammerjs'

@NgModule({
  imports: [
    AppRoutingModule,
    ServicesModule.forRoot(),
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
    AppRoutingModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: {
        uri: 'http://localhost:3000'
      }
    }
  ],
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parent: CoreModule,
               ir: MdIconRegistry,
               ds: DomSanitizer ) {
    if (parent) {
      throw new Error('模块已经存在，不能再次加载模块')
    }

    loadSvgResources(ir, ds)
  }
}
