import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'

import { Quote } from "../../domian/quote.module";
import * as fromRoot from '../../reducers'
import * as actions from '../../actions/quote.action'
import * as authActions from '../../actions/auth.action'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  quote$: Observable<Quote>
  form: FormGroup

  constructor( private fb: FormBuilder,
               private store$: Store<fromRoot.State> ) {

    this.quote$ = this.store$.select(fromRoot.getQuote)
    this.store$.dispatch(new actions.LoadAction(null))
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [ 'yangyi@163.com', Validators.compose([
        Validators.required,
        Validators.email,
      ]) ],
      password: [ '', Validators.required ]
    })
  }

  /**
   * 提交表单事件
   */
  onSubmit( { value, valid }, ev: Event ) {
    ev.preventDefault()
    if (!valid) {
      return
    }

    this.store$.dispatch(new authActions.LoginAction(value))
  }

}
