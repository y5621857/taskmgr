import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: [ './project-item.component.scss' ]
})
export class ProjectItemComponent implements OnInit {

  @Input() item
  @Output() onInvite = new EventEmitter<void>()
  @Output() onEdite = new EventEmitter<void>()
  @Output() onDelete=new EventEmitter<void>()

  constructor () {
  }

  ngOnInit () {
  }

  /**
   * 点击编辑事件
   */
  onEditClick () {
    this.onEdite.emit()
  }

  /**
   * 点击邀请事件
   */
  onInviteOpen () {
    this.onInvite.emit()
  }

  /**
   * 删除事件
   */
  onDelClick(){
    this.onDelete.emit()
  }

}
