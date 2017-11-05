import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { go } from '@ngrx/router-store'

import * as actions from '../actions/auth.action'
import { AuthService } from "../services/auth.service";
import { User } from "../domian";

@Injectable()
export class AuthEffects {

  /**
   * 登录Effect
   */
  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN)
    .map(toPayload)
    .switchMap(( { email, password } ) => this.service$.login(email, password)
      .map(auth => new actions.LoginSuccessAction(auth))
      .catch(err => Observable.of(new actions.LoginFailAction(JSON.stringify(err))))
    )

  /**
   * 注册Effect
   */
  @Effect()
  register$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER)
    .map(toPayload)
    .switchMap(( user: User ) => this.service$.register(user)
      .map(auth => new actions.RegisterSuccessAction(auth))
      .catch(err => Observable.of(new actions.RegisterFailAction(JSON.stringify(err))))
    )

  /**
   * 退出Effect
   */
  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGOUT)
    .map(_ => go( ['/'] ))

  /**
   * 登录成功
   */
  @Effect()
  navigateHome$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN_SUCCESS)
    .map(() => go(['/projects']));

  /**
   * 注册成功
   */
  @Effect()
  registerAndHome$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER_SUCCESS)
    .map(() => go(['/projects']));

  constructor( private actions$: Actions,
               private service$: AuthService ) {
  }
}