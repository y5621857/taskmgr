import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducers'
import * as actions from '../../actions/auth.action'
import { getAuthState } from '../../reducers'
import { Auth } from "../../domian/auth.module";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {

  auth$: Observable<Auth>
  @Output() toggle = new EventEmitter<void>()
  @Output() toggleDarkTheme = new EventEmitter<boolean>()

  constructor( private store$: Store<fromRoot.State> ) {
    this.auth$ = this.store$.select(getAuthState)
  }

  ngOnInit() {
  }

  OpenSideBar() {
    this.toggle.emit()
  }

  onChange( checked: boolean ) {
    this.toggleDarkTheme.emit(checked)
  }

  /**
   * 退出登录
   */
  logout() {
    this.store$.dispatch(new actions.LogoutAction(null))
  }

}
