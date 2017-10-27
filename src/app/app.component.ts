import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private darkTheme:boolean = false;
  switchTheme(dark:boolean){
    this.darkTheme = dark
  }
}
