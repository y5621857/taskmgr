import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'
import { isValidDate, toDate } from '../../utils/date.util';
import { extractInfo, isValidAddr, getAddrByCode } from '../../utils/identity.util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  private items: string[]
  form: FormGroup
  sub: Subscription
  readonly avatarName = 'avatars'

  constructor( private fb: FormBuilder ) {
  }

  ngOnInit() {
    const img = `${this.avatarName}:svg-${Math.floor(Math.random()*16).toFixed(0)}`
    const nums = [
      1, 2, 3, 4, 5, 6, 7, 8, 9,
      10, 11, 12, 13, 14, 15, 16
    ]

    this.items = nums.map(d => `avatars:svg-${d}`)

    this.form = this.fb.group({
      email: [],
      name: [],
      password: [],
      repeat: [],
      avatar: [ img ],
      dateOfBirth: [ '1990-01-01' ],
      address: [],
      identity: []
    })
    const id$ = this.form.get('identity').valueChanges
      .debounceTime(300)
      .filter(_ => this.form.get('identity').valid)

    this.sub = id$.subscribe(id => {
      const info = extractInfo(id.identityNo)

      if (isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.form.patchValue({ address: addr });
        this.form.updateValueAndValidity({ onlySelf: true, emitEvent: true });
      }
      if (isValidDate(info.dateOfBirth)) {
        const date = info.dateOfBirth;
        this.form.patchValue({ dateOfBirth: date });
        this.form.updateValueAndValidity({ onlySelf: true, emitEvent: true });
      }
    })
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  /**
   * 提交表单
   */
  onSubmit( { value, valid }, ev: Event ) {
    ev.preventDefault()
    if (!valid) {
      return;
    }
    console.log(value)
  }

}
