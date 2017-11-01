import { NgModule, ModuleWithProviders } from '@angular/core';
import { QuoteService } from "./quote.service";

@NgModule()
export class ServicesModule {
  static forRoot():ModuleWithProviders{
    return {
      ngModule:ServicesModule,
      providers:[
        QuoteService
      ]
    }
  }
}
