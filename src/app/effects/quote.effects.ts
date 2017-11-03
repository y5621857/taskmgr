import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as actions from '../actions/quote.action'
import { QuoteService } from "../services/quote.service";

@Injectable()
export class QuoteEffects {

  @Effect()
  quote$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    .map(toPayload)
    .switchMap(_ => this.service$.getQuote()
      .map(q => new actions.LoadSuccessAction(q))
      .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
    )

  constructor( private actions$: Actions,
               private service$: QuoteService ) {
  }
}