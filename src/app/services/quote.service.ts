import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Quote } from "../domian/quote.module";

@Injectable()
export class QuoteService {

  constructor( @Inject('BASE_CONFIG') private config,
               private http: Http ) {
  }

  /**
   * 提供每日佳句服务
   */
  getQuote(): Observable<Quote> {
    const uri = `${this.config.uri}/quotes/${Math.floor(Math.random()*10)}`;
    return this.http.get(uri).debug('quote: ').map(res => res.json() as Quote)
  }
}
