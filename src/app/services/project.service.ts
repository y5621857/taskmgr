import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { Project, User } from "../domian";
import * as _ from 'lodash'

@Injectable()
export class ProjectService {

  private readonly domain = 'projects'
  private headers = new Headers({
    'Content-type': 'application/json'
  })

  constructor( private http: Http,
               @Inject('BASE_CONFIG') private config ) {
  }

  /**
   * 取得用户参与项目的列表 GET
   * @param {Project} project
   * @returns {Observable<Response>}
   */
  get( userId: string ): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`
    return this.http
      .get(uri, {
        params: { 'members_like': userId }
      })
      .map(res => res.json() as Project[])
  }

  /**
   * 增加项目 POST
   * @param {Project} project
   * @returns {Observable<Response>}
   */
  add( project: Project ): Observable<Project> {
    project.id = null
    const uri = `${this.config.uri}/${this.domain}`
    return this.http
      .post(uri, JSON.stringify(project), {
        headers: this.headers
      })
      .map(res => res.json())
  }

  /**
   * 更新项目 PUT
   * @param {Project} project
   * @returns {Observable<Response>}
   */
  update( project: Project ): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg,
    }

    return this.http
      .patch(uri, JSON.stringify(toUpdate), {
        headers: this.headers
      })
      .map(res => res.json())
  }

  /**
   * 删除项目 DELETE
   * @param {Project} project
   * @returns {Observable<Response>}
   */
  del( project: Project ): Observable<Project> {
    const delTasks$ = Observable.from(project.taskList ? project.taskList : [])
      .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))
      .count()

    return delTasks$
      .switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))
      .mapTo(project)
  }

  /**
   * 添加成员 GET
   * @param {Project} project
   * @returns {Observable<Response>}
   */
  invite( projectId: string, user: User[] ): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${projectId}`


    return this.http
      .get(uri)
      .map(res => res.json())
      .switchMap(( project: Project ) => {
        const existingMembers = project.members
        const invitedIds = user.map(user => user.id)
        const newIds = _.union(existingMembers, invitedIds)

        return this.http
          .patch(uri, JSON.stringify({ members: newIds }), {
            headers: this.headers
          })
          .map(res => res.json())
      })
  }


}
