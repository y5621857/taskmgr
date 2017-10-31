import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MdDialog } from "@angular/material";

import { slideToRight } from "../../anims/router.anim";
import { listAnimation } from "../../anims/list.anim";

import { NewProjectComponent } from "../new-project/new-project.component";
import { InviteComponent } from "../invite/invite.component";
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";

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
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnim') state

  projects = [
    {
      id: 1,
      name: '企业协作平台',
      desc: '这是一个企业内部项目',
      coverImg: 'assets/img/covers/0.jpg',
    }, {
      id: 2,
      name: '自动化测试',
      desc: '这是一个自动化测试项目',
      coverImg: 'assets/img/covers/1.jpg',
    }
  ]

  constructor ( private dialog: MdDialog,
                private cd: ChangeDetectorRef ) {
  }

  ngOnInit () {
  }

  /**
   * 打开创建项目弹出框
   */
  openNewProjectDialog () {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: "新增项目" } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.projects = [ ...this.projects, {
        id: 3,
        name: '一个新项目',
        desc: '这是一个新项目',
        coverImg: 'assets/img/covers/8.jpg',
      }, {
        id: 4,
        name: '一个又新项目',
        desc: '这是又一个新项目',
        coverImg: 'assets/img/covers/9.jpg',
      } ]
      this.cd.markForCheck()
    })
  }

  /**
   * 打开编辑项目弹出框
   */
  launchUpdateDialog () {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: "编辑项目" } });
  }

  /**
   * 打开邀请弹出框
   */
  launchInviteDialog () {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  /**
   * 打开删除弹出框
   */
  launchDeleteDialog ( project ) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: "删除项目", content: "您确认删除该项目吗？" } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.projects = this.projects.filter(p => p.id !== project.id)
      this.cd.markForCheck()
    })
  }
}
