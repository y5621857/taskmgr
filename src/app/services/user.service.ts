import { Inject, Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User, Project } from '../domian';

@Injectable()
export class UserService {
  private readonly domain = 'users';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor( @Inject('BASE_CONFIG') private config,
               private http: Http ) {
  }

  /**
   * 快速查找
   * @param {string} filter
   * @returns {Observable<User[]>}
   */
  searchUsers( filter: string ): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, { params: { 'email_like': filter } })
      .map(res => res.json() as User[]);
  }

  /**
   * 取得项目当中的所有用户
   * @param {string} projectId
   * @returns {Observable<User[]>}
   */
  getUsersByProject( projectId: string ): Observable<User[]> {
    const uri = `${this.config.uri}/users`;
    return this.http.get(uri, { params: { 'projectId': projectId } })
      .map(res => res.json() as User[]);
  }

  /**
   * 用户参与项目
   * @param {User} user
   * @param {string} projectId
   * @returns {Observable<User>}
   */
  addProjectRef( user: User, projectId: string ): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = (user.projectIds) ? user.projectIds : [];
    if (projectIds.indexOf(projectId) > -1) {
      return Observable.of(user)
    }

    return this.http
      .patch(uri, JSON.stringify({ projectIds: [ ...projectIds, projectId ] }), { headers: this.headers })
      .map(res => res.json() as User);
  }

  /**
   * 用户移除项目
   * @param {User} user
   * @param {string} projectId
   * @returns {Observable<User>}
   */
  removeProjectRef( user: User, projectId: string ): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = (user.projectIds) ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);

    if (index === -1) {
      return Observable.of(user)
    }

    const toUpdate = [ ...projectIds.slice(0, index), ...projectIds.slice(index + 1) ];

    return this.http
      .patch(uri, JSON.stringify({ projectIds: toUpdate }), { headers: this.headers })
      .map(res => res.json() as User);
  }

  /**
   * 批量处理用户参与项目
   * @param {Project} project
   * @returns {Observable<User[]>}
   */
  batchUpdateProjectRef( project: Project ): Observable<User[]> {
    const projectId = project.id;
    const memberIds = project.members ? project.members : [];
    return Observable.from(memberIds)
      .switchMap(id => {
        const uri = `${this.config.uri}/${this.domain}/${id}`;
        return this.http.get(uri).map(res => res.json() as User);
      })
      .filter(user => user.projectIds.indexOf(projectId) < 0)
      .switchMap(u => this.addProjectRef(u, projectId))
      .reduce(( users, curr ) => [ ...users, curr ], []);
  }
}