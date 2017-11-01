import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'
import { QuoteService } from "../../services/quote.service";
import { Quote } from "../../domian/quote.module";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  quote: Quote = {
    "id": "0",
    "cn": "我突然就觉得自己像个华丽的木偶,演尽了所有的悲欢离合,可是背上总是有无数闪亮的银色丝线,操纵我哪怕一举手一投足。",
    "en": "I suddenly feel myself like a doll,acting all kinds of joys and sorrows.There are lots of shining silvery thread on my back,controlling all my action.",
    "pic": "/assets/img/quotes/0.jpg"
  }
  form: FormGroup

  constructor( private fb: FormBuilder,
               private quoteService$: QuoteService ) {
    this.quoteService$.getQuote().subscribe(q => this.quote=q)
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
        emailNotValid: 'the email must start with yang'
      }
    }
  }

}
