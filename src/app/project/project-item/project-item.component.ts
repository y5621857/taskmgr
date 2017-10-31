import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener ,ChangeDetectionStrategy} from '@angular/core';

import { cardAnim } from "../../anims/card.anim";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: [ './project-item.component.scss' ],
  animations: [
    cardAnim
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProjectItemComponent implements OnInit {

  @Input() item
  @Output() onInvite = new EventEmitter<void>()
  @Output() onEdite = new EventEmitter<void>()
  @Output() onDelete = new EventEmitter<void>()
  @HostBinding('@card') cardState = 'out'


  constructor () {
  }

  ngOnInit () {
  }

  /**
   * 检测鼠标事件触发动画函数
   * @param {Event} ev
   */
  @HostListener('mouseenter')
  onMouseEnter () {
    this.cardState = 'hover'
  }

  @HostListener('mouseleave')
  onMouseLeave () {
    this.cardState = 'out'
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
  onDelClick () {
    this.onDelete.emit()
  }

}
