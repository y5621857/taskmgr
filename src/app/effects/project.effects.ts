import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { go } from '@ngrx/router-store'
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducers'

import * as actions from '../actions/project.action'
import { AuthService } from "../services/auth.service";
import { User } from "../domian";
import { ProjectService } from "../services/project.service";

@Injectable()
export class ProjectEffects {


  @Effect()
  loadProjects$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuthState))
    .switchMap(( [ _, auth ] ) => this.service$.get(auth.userId)
      .map(projects => new actions.LoadSuccessAction(projects))
      .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
    )

  /**
   * 添加项目
   */
  @Effect()
  addProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuthState))
    .switchMap(( [ project, auth ] ) => {
      const added = { ...project, members: [ `${auth.userId}` ] }
      return this.service$.add(added)
        .map(project => new actions.AddSuccessAction(project))
        .catch(err => Observable.of(new actions.AddFailAction(JSON.stringify(err))))
    })

  /**
   * 更新项目
   */
  @Effect()
  updateProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE)
    .map(toPayload)
    .switchMap(( project ) => this.service$.update(project)
      .map(project => new actions.UpdateSuccessAction(project))
      .catch(err => Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))
    )

  /**
   * 删除项目
   */
  @Effect()
  delProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE)
    .map(toPayload)
    .switchMap(( project ) => this.service$.del(project)
      .map(project => new actions.DeleteSuccessAction(project))
      .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))
    )

  /**
   * 邀请成员
   */
  @Effect()
  invite$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.INVITE)
    .map(toPayload)
    .switchMap(( { projectId, members } ) => this.service$.invite(projectId, members)
      .map(project => new actions.InviteSuccessAction(project))
      .catch(err => Observable.of(new actions.InviteFailAction(JSON.stringify(err))))
    )

  /**
   * 选择项目
   */
  @Effect()
  selectProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.SELECT_PROJECT)
    .map(toPayload)
    .map(project => go([ `/tasklists/${project.id}` ]))


  constructor( private actions$: Actions,
               private service$: ProjectService,
               private store$: Store<fromRoot.State> ) {
  }
}