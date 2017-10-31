import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms'

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: [ './image-list-select.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    },
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor {

  @Input() title:string = "选择"
  @Input() cols: number = 6
  @Input() rowHeight = '64px'
  @Input() items: string[] = []
  @Input() useSvgIcon = false
  @Input() itemWidth = '80px'

  selected: string

  constructor() {
  }

  private propagateChange = ( _: any ) => {
  }

  /**
   * 写入控件值
    * @param obj
   */
  writeValue( obj: any ): void {
    this.selected = obj
  }

  /**
   * 当表单控件值改变时，函数 fn 会被调用
   * 这也是我们把变化 emit 回表单的机制
   * @param fn
   */
  registerOnChange( fn: any ): void {
    this.propagateChange = fn
  }

  /**
   * 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
   * @param fn
   */
  registerOnTouched( fn: any ): void {

  }

  /**
   * 选取图片事件
   */
  onChange( index ) {
    this.selected = this.items[ index ]
    this.propagateChange(this.selected)
  }

  /**
   * 自定义验证器
   */
  validate( c: FormControl ): { [key: string]: any } {
    return this.selected ? null : {
      imagelistInValid: {
        valid: false
      }
    }
  }

}
