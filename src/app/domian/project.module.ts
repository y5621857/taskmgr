export interface Project {
  id?: string
  name: string
  desc?: string
  coverImg: string
  taskList?: string[] //列表ID
  members?: string[] //成员ID
}