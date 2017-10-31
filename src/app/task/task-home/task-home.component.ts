import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MdDialog } from '@angular/material'

import { slideToRight } from "../../anims/router.anim";
import { NewTaskComponent } from "../new-task/new-task.component";
import { CopyTaskComponent } from "../copy-task/copy-task.component";
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { NewTaskListComponent } from "../new-task-list/new-task-list.component";

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: [ './task-home.component.scss' ],
  animations: [
    slideToRight
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routeAnim') state

  lists = [
    {
      id: 1,
      name: '待办',
      order: 1,
      tasks: [ {
        id: 1,
        desc: '任务一：去星巴克买杯咖啡',
        completed: true,
        priority: 3,
        owner: {
          id: 1,
          name: '张三',
          avatar: 'avatars:svg-11'
        },
        dueDate: new Date(),
        reminder: new Date()
      }, {
        id: 2,
        desc: '任务二：完成老板布置的 PPT 作业',
        completed: false,
        priority: 2,
        owner: {
          id: 1,
          name: '李四',
          avatar: 'avatars:svg-12'
        },
        dueDate: new Date()
      } ],
    }, {
      id: 2,
      name: '进行中',
      order: 2,
      tasks: [ {
        id: 1,
        desc: '任务三：项目代码审批',
        completed: false,
        priority: 1,
        owner: {
          id: 1,
          name: '王五',
          avatar: 'avatars:svg-13'
        },
        dueDate: new Date()
      }, {
        id: 2,
        desc: '任务四：制定项目计划',
        completed: false,
        priority: 2,
        owner: {
          id: 1,
          name: '李四',
          avatar: 'avatars:svg-12'
        },
        dueDate: new Date()
      } ],
    }
  ]

  constructor( private dialog: MdDialog,
               private cd: ChangeDetectorRef ) {
  }

  ngOnInit() {
  }

  /**
   * 添加新列表弹出框
   */
  launchNewListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '创建列表' } })
    dialogRef.afterClosed().subscribe(result => console.log(result))
  }

  /**
   * 打开添加任务弹出框
   */
  launchNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '创建任务' } })
  }

  /**
   * 打开修改列表名称弹出框
   */
  launchEditTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '修改列表名称' } })
    dialogRef.afterClosed().subscribe(result => console.log(result))
  }

  /**
   * 打开移动本列表所有内容弹出框
   */
  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, { data: { lists: this.lists } })
  }

  /**
   * 打开修改任务弹出框
   */
  launchUpdateTaskDialog( task ) {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '修改任务', task: task } })
  }

  /**
   * 打开删除列表弹出框
   */
  launchDelListConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '删除列表', content: '您确定删除该任务列表吗？' } })
    dialogRef.afterClosed().subscribe(result => console.log(result))
  }

  /**
   * 拖拽事件结束
   */
  handleMove( srcData, list ) {
    switch (srcData.tag) {
      case 'task-item':
        console.log('handle item')
        break
      case 'task-list':
        console.log('handle list')
        const srclist = srcData.data
        const tempOrder = srclist.order
        srclist.order = list.order
        list.order = tempOrder
        break

    }
  }

  /**
   * 快速创建一个任务
   */
  handleQuickTask( desc: string ) {
    console.log(desc)
  }

}
