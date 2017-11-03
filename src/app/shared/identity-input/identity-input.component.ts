import { ChangeDetectionStrategy, Component, Input, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormGroup,
  FormControl,
  FormBuilder,
} from '@angular/forms'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { Subscription } from 'rxjs/Subscription'
import { IdentityType, Identity } from "../../domian";

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: [ './identity-input.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  private propagateChange = ( _: any ) => {
  };
  identityTypes = [
    {
      value: IdentityType.IdCard,
      label: '身份证'
    }, {
      value: IdentityType.Insurance,
      label: '医保'
    }, {
      value: IdentityType.Passport,
      label: '护照'
    }, {
      value: IdentityType.Military,
      label: '军官证'
    }, {
      value: IdentityType.Other,
      label: '其他'
    }
  ]

  identity: Identity = { identityType: null, identityNo: null }

  private _idType = new Subject<IdentityType>()
  private _idNo = new Subject<string>()
  private sub: Subscription

  constructor() {
  }

  ngOnInit() {
    const val$ = Observable.combineLatest(this.idNo, this.idType, ( _no, _type ) => {
      return {
        identityType: _type,
        identityNo: _no
      }
    })

    this.sub = val$.subscribe(id => {
      this.propagateChange(id)
    })
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  /**
   * 改变证件类型
   */
  onIdTypeChange( idType: IdentityType ) {
    this._idType.next(idType)
  }

  get idType(): Observable<IdentityType> {
    return this._idType.asObservable()
  }

  get idNo(): Observable<string> {
    return this._idNo.asObservable()
  }

  /**
   * 改变证件号码
   */
  onIdNoChange( idNo: string ) {
    this._idNo.next(idNo)
  }

  // 提供值的写入方法
  public writeValue( obj: any ) {
    if (obj) {
      this.identity = obj
    }
  }

  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  public registerOnChange( fn: any ) {
    this.propagateChange = fn;
  }

  // 这里没有使用，用于注册 touched 状态
  public registerOnTouched( fn: any ): void {
  }

  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  validate( c: FormControl ): { [key: string]: any } {
    const val = c.value
    if (!val) {
      return null
    }
    switch (c.value.identityType) {
      case IdentityType.IdCard: {
        return this.validateIdCard(c);
      }
      case IdentityType.Passport: {
        return this.validatePassport(c);
      }
      case IdentityType.Military: {
        return this.validateMilitary(c);
      }
      case IdentityType.Insurance:
      default: {
        return null;
      }
    }
  }

  /**
   * 身份证验证
   */
  validateIdCard( c: FormControl ): { [key: string]: any } {
    const val = c.value.identityNo
    if (val.length !== 18) {
      return { idInvalid: true }
    }
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    return pattern.test(val) ? null : { idNotValid: true }
  }

  /**
   * 护照验证
   */
  validatePassport( c: FormControl ): { [key: string]: any } {
    const val = c.value.identityNo
    if (val.length !== 9) {
      return { PassPortInvalid: true }
    }
    const pattern = /^[GgEe]\d{8}$/;
    return pattern.test(val) ? null : { PassPortNotValid: true }
  }

  /**
   * 军官证验证
   */
  validateMilitary( c: FormControl ): { [key: string]: any } {
    const val = c.value.identityNo

    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    return pattern.test(val) ? null : { idNotValid: true }
  }

}
