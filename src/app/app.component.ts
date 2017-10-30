import { Component } from '@angular/core';

import { OverlayContainer } from '@angular/material'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {

  private darkTheme: boolean = false;

  constructor ( private oc: OverlayContainer ) {
  }

  switchTheme ( dark: boolean ) {
    this.darkTheme = dark
    this.oc.themeClass = dark ? 'myapp-dark-theme' : null
  }


}
