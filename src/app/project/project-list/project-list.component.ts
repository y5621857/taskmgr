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

import * as _ from "lodash"
import { Project } from "../../domian";
import { Subscription } from 'rxjs/Subscription'

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

  projects
  sub: Subscription

  constructor( private dialog: MdDialog,
               private cd: ChangeDetectorRef,
               private service$: ProjectService ) {
  }

  ngOnInit() {
    this.sub = this.service$.get('1').subscribe(project => {
      this.projects = project
      this.cd.markForCheck()
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
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
      .switchMap(v => this.service$.add(v))
      .subscribe(project => {
        //console.log(project)
        this.projects = [ ...this.projects, project ]
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
      .switchMap(v => this.service$.update(v))
      .subscribe(project => {
        //console.log(project)
        const index = this.projects.map(p => p.id).indexOf(project.id)

        this.projects = [ ...this.projects.slice(0, index), project, ...this.projects.slice(index + 1) ]

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
      .switchMap(_ => this.service$.del(project))
      .subscribe(res_project => {
        this.projects = this.projects.filter(p => p.id !== res_project.id)
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
