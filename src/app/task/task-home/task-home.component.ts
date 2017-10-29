import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material'

import { NewTaskComponent } from "../new-task/new-task.component";
import { CopyTaskComponent } from "../copy-task/copy-task.component";
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: [ './task-home.component.scss' ]
})
export class TaskHomeComponent implements OnInit {

  lists = [
    {
      id: 1,
      name: '待办',
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

  constructor ( private dialog: MdDialog ) {
  }

  ngOnInit () {
  }

  /**
   * 打开添加任务弹出框
   */
  launchNewTaskDialog () {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '创建任务' } })
  }

  /**
   * 打开本列表所有内容弹出框
   */
  launchCopyTaskDialog () {
    const dialogRef = this.dialog.open(CopyTaskComponent, { data: { lists: this.lists } })
  }

  /**
   * 打开修改任务弹出框
   */
  launchUpdateTaskDialog ( task ) {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '修改任务', task: task } })
  }

  /**
   * 打开删除列表弹出框
   */
  launchDelListConfirmDialog () {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '删除列表', content: '您确定删除该任务列表吗？' } })
    dialogRef.afterClosed().subscribe(result=>console.log(result))
  }

}
