import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { MdDialog } from "@angular/material";

import { slideToRight } from "../../anims/router.anim";
import { listAnimation } from "../../anims/list.anim";

import { NewProjectComponent } from "../new-project/new-project.component";
import { InviteComponent } from "../invite/invite.component";
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { ProjectService } from "../../services/project.service";
import { Store } from "@ngrx/store";

import * as _ from "lodash"
import * as fromRoot from "../../reducers"
import * as actions from "../../actions/project.action"
import { Project } from "../../domian";
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: [ './project-list.component.scss' ],
  animations: [
    slideToRight,
    listAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnim') state

  projects$: Observable<Project[]>
  listAnim$: Observable<number>

  constructor( private dialog: MdDialog,
               private cd: ChangeDetectorRef,
               private store$: Store<fromRoot.State> ) {
    this.store$.dispatch(new actions.LoadAction(null))
    this.projects$ = this.store$.select(fromRoot.getProjects)
    this.listAnim$ = this.projects$.map(p => p.length)
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  /**
   * 打开创建项目弹出框
   */
  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random()*40)}_tn.jpg`

    const dialogRef = this.dialog
      .open(NewProjectComponent, {
          data: {
            thumbnails: this.getThumbnails(),
            img: selectedImg
          }
        }
      );


    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .map(val => ({ ...val, coverImg: this.buildImgSrc(val.coverImg) }))
      .subscribe(project => {
        this.store$.dispatch(new actions.AddAction(project))
        this.cd.markForCheck()
      })
  }

  /**
   * 打开编辑项目弹出框
   */
  launchUpdateDialog( project: Project ) {
    const dialogRef = this.dialog
      .open(NewProjectComponent, {
          data: {
            thumbnails: this.getThumbnails(),
            project: project
          }
        }
      );

    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .map(val => ({ ...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg) }))
      .subscribe(project => {
        this.store$.dispatch(new actions.UpdateAction(project))
        this.cd.markForCheck()
      })
  }

  /**
   * 打开邀请弹出框
   */
  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent, { data: { members: [] } });
  }

  /**
   * 打开删除弹出框
   */
  launchDeleteDialog( project ) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: "删除项目", content: "您确认删除该项目吗？" } });

    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe(_ => {
        this.store$.dispatch(new actions.DeleteAction(project))
        this.cd.markForCheck()
      })
  }

  /**
   * 获得封面缩略图
   */
  private getThumbnails() {
    return _.range(0, 40)
      .map(i => `/assets/img/covers/${i}_tn.jpg`)
  }

  /**
   * 新建项目=>缩略图 转换为 大图
   */
  private buildImgSrc( img: string ): string {
    return img.indexOf('_') > -1 ? img.split('_')[ 0 ] + '.jpg' : img
  }


}
