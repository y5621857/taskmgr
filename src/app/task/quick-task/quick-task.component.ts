import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: [ './quick-task.component.scss' ]
})
export class QuickTaskComponent implements OnInit {

  @Output() quickTask = new EventEmitter<string>()

  desc: string = ''

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * 快速创建一个任务
   */
  @HostListener('keyup.enter')
  sendQuickTask() {
    if (!this.desc || !this.desc.trim() || this.desc.length === 0) {
      return
    }

    this.quickTask.emit(this.desc)
    this.desc = ''
  }

}
