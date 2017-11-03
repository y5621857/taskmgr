import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'
import { QuoteService } from "../../services/quote.service";
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'

import { Quote } from "../../domian/quote.module";
import * as fromRoot from '../../reducers'
import * as actions from '../../actions/quote.action'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  quote$: Observable<Quote>
  form: FormGroup

  constructor( private fb: FormBuilder,
               private quoteService$: QuoteService,
               private store$: Store<fromRoot.State> ) {

    this.quote$ = this.store$.select(fromRoot.getQuote)
    this.quoteService$
      .getQuote()
      .subscribe(q => {
        this.store$.dispatch(new actions.LoadSuccessAction(q))
      })
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [ 'yang@163.com', Validators.compose([
        Validators.required,
        Validators.email,
        this.validate
      ]) ],
      password: [ '', Validators.required ]
    })
  }

  /**
   * 提交表单事件
   */
  onSubmit( { value, valid }, ev: Event ) {
    ev.preventDefault()
    console.log(value)
    console.log(valid)
  }

  /**
   * 自定义验证器
   */
  validate( c: FormControl ): { [key: string]: any } {
    if (!c.value) {
      return null
    }

    const pattern = /^yang+/
    if (pattern.test(c.value)) {
      return null
    } else {
      return {
        emailNotValid: 'the email must start with yang'
      }
    }
  }

}
