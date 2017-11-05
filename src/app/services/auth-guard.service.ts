import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable'
import { Store } from "@ngrx/store"
import * as fromRoot from '../reducers'
import { getAuthState } from '../reducers'
import { go } from '@ngrx/router-store'

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor( private store$: Store<fromRoot.State> ) {
  }

  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot ): Observable<boolean> {
    return this.store$
      .select(getAuthState)
      .map(auth => {
        const result = auth.token !== null && auth.token !== undefined
        if (result) {
          this.store$.dispatch(go([ '/login' ]))
        }
        return result
      })
      .defaultIfEmpty(false)
  }
}
