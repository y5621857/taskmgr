import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

import { itemAnim } from "../../anims/item.anim";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: [ './task-item.component.scss' ],
  animations: [
    itemAnim
  ]
})
export class TaskItemComponent implements OnInit {

  @Input() item
  @Input() avatar
  @Output() clickTask = new EventEmitter<void>()
  private widerpriority = 'in'

  constructor () {
  }

  ngOnInit () {
    this.avatar = this.item.owner.avatar ? this.item.owner.avatar : 'unassigned'
  }

  /**
   * 检测鼠标事件触发动画函数
   * @param {Event} ev
   */
  @HostListener('mouseenter')
  onMouseEnter(){
    this.widerpriority = 'out'
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.widerpriority = 'in'
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
