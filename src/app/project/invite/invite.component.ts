import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material'
import { User } from "../../domian";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: [ './invite.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {

  members: User[] = []

  constructor( @Inject(MD_DIALOG_DATA) private data,
               private dialogRef: MdDialogRef<InviteComponent>, ) {
  }

  ngOnInit() {
    this.members = [...this.data.members]
  }

  onSubmit( { value, valid }, ev: Event ) {
    ev.preventDefault()
    if (!valid) {
      return
    }

    this.dialogRef.close(this.members)
  }

}
