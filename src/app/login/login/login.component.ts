import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  form: FormGroup

  constructor( private fb: FormBuilder ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [ 'yang@163.com', Validators.compose([
        Validators.required,
        Validators.email,
        this.validate
      ]) ],
      password: [ '', Validators.required ]
    })
  }

  /**
   * 提交表单事件
   */
  onSubmit( { value, valid }, ev: Event ) {
    ev.preventDefault()
    console.log(value)
    console.log(valid)
  }

  /**
   * 自定义验证器
   */
  validate( c: FormControl ): { [key: string]: any } {
    if (!c.value) {
      return null
    }

    const pattern = /^yang+/
    if (pattern.test(c.value)) {
      return null
    } else {
      return {
        emailNotValid:'the email must start with yang'
      }
    }
  }

}
