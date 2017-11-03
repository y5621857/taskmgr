export const QUOTE = 'Quote'
export const QUOTE_SUCCESS = 'Quote Success'
export const QUOTE_Fail = 'Quote Fail'

import { Action } from '@ngrx/store'
import { type } from '../utils/type.util'
import { Quote } from "../domian/quote.module";

export const ActionTypes = {
  LOAD: type('[Quote] Load'),
  LOAD_SUCCESS: type('[Quote] Load Success'),
  LOAD_FAIL: type('[Quote] Load Fail')
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD

  constructor( public payload: null ) {
  }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS

  constructor( public payload: Quote ) {
  }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL

  constructor( public payload: string ) {
  }
}


export type Actions = LoadAction | LoadSuccessAction | LoadFailAction