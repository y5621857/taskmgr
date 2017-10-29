import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material'

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <form>
      <h3 md-dialog-title>{{title}}：</h3>
      <div md-dialog-content>
        {{content}}
      </div>
      <div md-dialog-actions>
        <button md-raised-button color="primary" type="button" (click)="onClick(true)">确定</button>
        <button md-dialog-close md-raised-button type="button" (click)="onClick(false)">取消</button>
      </div>
    </form>
  `,
  styles: [ `
  
  ` ]
})
export class ConfirmDialogComponent implements OnInit {

  private title = ''
  private content = ''

  constructor ( @Inject(MD_DIALOG_DATA) private data,
                private dialogRef: MdDialogRef<ConfirmDialogComponent> ) {
  }

  ngOnInit () {
    this.title = this.data.title
    this.content = this.data.content
  }

  /**
   * confirm操作
   */
  onClick ( result: boolean ) {
    this.dialogRef.close(result)
  }

}
