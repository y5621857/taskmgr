import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { TaskList } from "../domian";

@Injectable()
export class TaskListService {
  private readonly domain = 'taskLists';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor( @Inject('BASE_CONFIG') private config,
               private http: Http ) {
  }

  add( taskList: TaskList ): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(taskList), { headers: this.headers })
      .map(res => res.json());
  }

  update( taskList: TaskList ): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    const toUpdate = {
      name: taskList.name
    };
    return this.http
      .patch(uri, JSON.stringify(toUpdate), { headers: this.headers })
      .map(res => res.json());
  }

  del( taskList: TaskList ): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    return this.http
      .delete(uri)
      .mapTo(taskList);
  }

  // GET /tasklist
  get( projectId: string ): Observable<TaskList[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: { 'projectId': projectId } })
      .map(res => res.json());
  }

  /**
   * 交换数组顺序
   */
  swapOrder( src: TaskList, target: TaskList ): Observable<TaskList[]> {
    const dargUri = `${this.config.uri}/${src.id}`;
    const dropUri = `${this.config.uri}/${target.id}`;

    const darg$ = this.http
      .patch(dargUri, JSON.stringify({ order: target.order }), { headers: this.headers })
      .map(res => res.json())

    const drop$ = this.http
      .patch(dropUri, JSON.stringify({ order: src.order }), { headers: this.headers })
      .map(res => res.json())

    return Observable.concat(darg$, drop$).reduce((arr,list)=>{[...arr,list]},[])
  }

}
