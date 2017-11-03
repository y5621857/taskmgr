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
import { Subscription } from 'rxjs/Subscription'
import { Subject } from 'rxjs/Subject'
import { Address } from "../../domian";
import { getProvinces, getCitiesByProvince, getAreasByCity } from '../../utils/area.uitl'

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: [ './area-list.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true,
    }
  ]
})
export class AreaListComponent implements ControlValueAccessor, OnInit, OnDestroy {

  private propagateChange = ( _: any ) => {
  };

  _address: Address = {
    province: '',
    city: '',
    district: '',
    street: ''
  }

  _province = new Subject<string>()
  _city = new Subject<string>()
  _district = new Subject<string>()
  _street = new Subject<string>()

  cities$: Observable<string[]>;
  districts$: Observable<string[]>;
  provinces = getProvinces();

  sub: Subscription

  constructor() {
  }

  ngOnInit() {
    const province$ = this._province.asObservable().startWith('')
    const city$ = this._city.asObservable().startWith('')
    const district$ = this._district.asObservable().startWith('')
    const street$ = this._street.asObservable().startWith('')

    /**
     * 合并多个数据联动
     */
    const val$ = Observable.combineLatest([ province$, city$, district$, street$ ], ( _p, _c, _d, _s ) => {
      return {
        province: _p,
        city: _c,
        district: _d,
        street: _s
      }
    })

    this.sub = val$.subscribe(v => {
      this.propagateChange(v)
    })

    // 根据省份的选择得到城市列表
    this.cities$ = province$.mergeMap(province => Observable.of(getCitiesByProvince(province)));
    // 根据省份和城市的选择得到地区列表
    this.districts$ = Observable
      .combineLatest(province$, city$, (p, c) => ({province: p, city: c}))
      .mergeMap(a => Observable.of(getAreasByCity(a.province, a.city)));
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  // 提供值的写入方法
  public writeValue( obj: Address ) {
    if (obj) {
      this._address = obj
      if (this._address.province) {
        this._province.next(this._address.province)
      }
      if (this._address.city) {
        this._city.next(this._address.city)
      }
      if (this._address.district) {
        this._district.next(this._address.district)
      }
      if (this._address.street) {
        this._street.next(this._address.street)
      }
    }
  }

  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  public registerOnChange( fn: any ) {
    this.propagateChange = fn;
  }

  // 这里没有使用，用于注册 touched 状态
  public registerOnTouched() {
  }

  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  validate( c: FormControl ): { [key: string]: any } {
    const val = c.value
    if (!val) {
      return null
    }
    if (val.providers && val.city && val.selector && val.street) {
      return null
    }

    return {
      addressInvalid: true
    }
  }

  /**
   * 选择省份
   */
  onProvinceChange() {
    this._province.next(this._address.province);
  }

  /**
   * 选择城市
   */
  onCityChange() {
    this._city.next(this._address.city);
  }

  /**
   * 选择区县
   */
  onDistrictChange() {
    this._district.next(this._address.district);
  }

  /**
   * 填写街道
   */
  onStreetChange() {
    this._street.next(this._address.street);
  }
}
