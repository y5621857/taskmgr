import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { getDate } from 'date-fns'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.scss' ]
})
export class SidebarComponent implements OnInit {

  @Output() navClick=new EventEmitter<void>()

  today = 'day'

  constructor () {
  }

  ngOnInit () {
    this.today = `day${getDate(new Date())}`
  }

  /**
   * 导航栏点击事件
   */
  onNavClick(){
    this.navClick.emit()
  }

}
