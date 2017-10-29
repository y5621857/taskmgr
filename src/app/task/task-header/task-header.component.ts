import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: [ './task-header.component.scss' ]
})
export class TaskHeaderComponent implements OnInit {

  @Input() header = ''
  @Output() newTask = new EventEmitter<void>()
  @Output() moveAll = new EventEmitter<void>()
  @Output() DelList = new EventEmitter<void>()

  constructor () {
  }

  ngOnInit () {
  }

  /**
   * 添加任务事件
   */
  onNewTaskClick () {
    this.newTask.emit()
  }

  /**
   * 移动本列表所有内容事件
   */
  onMoveAllClick () {
    this.moveAll.emit()
  }

  /**
   * 删除列表事件
   */
  onDelListClick () {
    this.DelList.emit()
  }

}
