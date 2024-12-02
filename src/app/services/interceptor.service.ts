import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.callToken()).pipe(
      switchMap((token) => {
        const cloneRequest = this.addSecret(req, token);
        return next.handle(cloneRequest);
      })
    );
  }

  callToken() {
    return new Promise(async (resolve) => {
      let token = localStorage.getItem('token');
      resolve(token);
    });
  }

  private addSecret(request: HttpRequest<any>, value: any) {
    let v = value ? 'Bearer ' + value : '';
    var obj: any = {
      Authorization: v,
      Accept: 'application/json',
    };

    let cnt = request.headers.get('Content-Type');
    if (cnt == 'application/json') {
      obj['Content-Type'] = request.headers.get('Content-Type');
    }

    const clone = request.clone({
      setHeaders: obj,
    });

    return clone;
  }
}
