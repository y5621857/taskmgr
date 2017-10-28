import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";

import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskHeaderComponent } from './task-header/task-header.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    TaskHomeComponent,
    TaskItemComponent,
    TaskListComponent,
    TaskHeaderComponent
  ]
})
export class TaskModule {
}
