import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: [ './task-item.component.scss' ]
})
export class TaskItemComponent implements OnInit {

  @Input() item
  @Input() avatar
  @Output() clickTask = new EventEmitter<void>()

  constructor () {
  }

  ngOnInit () {
    this.avatar = this.item.owner.avatar ? this.item.owner.avatar : 'unassigned'
  }

  /**
   * checkBox点击事件
   */
  onCheckBoxClick ( ev: Event ) {
    ev.stopPropagation()
  }

  /**
   * 编辑任务事件
   */
  onItemClick () {
    this.clickTask.emit()
  }

}
