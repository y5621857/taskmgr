import { NgModule } from '@angular/core';

/**
 * combineReducers 接收一系列的 reducer 作为参数，然后创建一个新的 reducer
 * 这个新的 reducer 接收到各 reducer 的值后，按 reducer 的 key 进行存储。
 * 把这个新的 reducer 想象成一个数据库，各个子 reducer 就像数据库中的表。
 *
 */
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze'
import { compose } from '@ngrx/core/compose'
import { createSelector } from 'reselect'

import * as fromQuote from './quote.reducer';
import { environment } from "../../environments/environment";

export interface State {
  quote: fromQuote.State;
}

const initialState: State = {
  quote: fromQuote.initialState,
};

const reducers = {
  quote: fromQuote.reducer
}

/**
 * 使用 combineReducers 把所有子 reducer 合并产生一个顶级 reducer
 */
const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer( state: State = initialState, action: { type: string, payload: any } ): State {
  return environment.production ?
    productionReducer(state, action) : developmentReducer(state, action)
}

export const getQuoteState = ( state: State ) => state.quote

export const getQuote = createSelector(getQuoteState, fromQuote.getQuote)

@NgModule({
  imports: [
    /**
     * StoreModule.provideStore  仅需引入一次，请把它包含在根模块或者 CoreModule 中
     * 我们这里为了方便组织，新建了一个 AppStoreModule，但也是只在 CoreModule 中引入的
     */
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    // DevTool 需要在 StoreModule 之后导入
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ]
})
export class AppStoreModule {
}