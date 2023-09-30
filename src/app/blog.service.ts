import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IcurUser, IcurMessage } from './shared/interfaces/faces';

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  constructor(private http: HttpClient) { }
  private url = 'http://localhost:3000';
  private api = { message: `${this.url}/curMess`, users: `${this.url}/masUsers` };

  public logined = false;
  public userProc = false;
  public mesProc = false;
  public curUserID: number = -1;
  public curUserLogin: string = '';
  public emode = false;
  public curMessID: number = -1;
  
  /**--------------------------------------------------------------------------for all func */
  focus(reg: RegExp, val: string): { style: string[], col: string } {
    let style: string[];
    let col: string;
    col = 'rgb(159,198,242)';
    style = ['tool', 'mestool'];
    if (reg.test(val) && val != null) {

      col = 'green';
      style = ['toolok'];
    }
    else {
      col = 'red';
      style = ['toolx', 'mestool'];
    }
    return { style: style, col: col }
  }

  input(reg: RegExp, val: string): { style: string[], col: string } {
    let style: string[];
    let col: string;
    if (reg.test(val)) {
      col = 'green';
      style = ['toolok'];
    }
    else {
      col = 'red';
      style = ['toolx', 'mestool'];
    }
    return { style: style, col: col }
  }

  getUser(): Observable<IcurUser[]> {
    return this.http.get<IcurUser[]>(`${this.api.users}`)
  }

  getMess(opt:string=''): Observable<IcurMessage[]> {
    return this.http.get<IcurMessage[]>(`${this.api.message}?_sort=dateTime&_order=DESC${opt}`)
  }
  getUserByID(mas: IcurUser[], ID: number): string {
    for (let val of mas)
      if (val.id == ID) return val.login;
    return ''
  }

  /*---------------------------------------------Main */
  testUser(mes: IcurMessage): boolean {
    if (mes.userID == this.curUserID || this.curUserLogin == 'admin') return true
    else return false
  }
  deleteMessage(mesID: number): Observable<void> {
    return this.http.delete<void>(`${this.api.message}/${mesID}`)
  }

  /*---------------------------------------------Add-post */
  getMesforEdit(mes: IcurMessage[]): IcurMessage {
    for (const val of mes)
      if (val.id == this.curMessID) return val
    return mes[0]
  }

  saveEditMess(ID: number, title: string, mes: string): Observable<IcurMessage> {
    return this.http.patch<IcurMessage>(`${this.api.message}/${ID}`, {
      title: title,
      message: mes,
      dateTime: new Date()
    })
  }

  addMess(title: string, mes: string): Observable<IcurMessage> {
    return this.http.post<IcurMessage>(this.api.message,
      {
        userID: this.curUserID,
        dateTime: new Date(),
        title: title,
        message: mes
      }
    )
  }
  /*-----------------------------------------------Sign In */
  passUser(mas: IcurUser[], email: string, password: string): boolean {
    let res = false;
    mas.forEach((val, ind) => {
      if (val.email == email && val.password == password) {
        this.curUserID = (val.id || val.id==0)? val.id : -1;
        this.curUserLogin = val.login;
        this.logined = true;
        this.userProc = true;
        res = true;
      }
    })
    return res
  }
  /*-------------------------------------------Sign Up */
  presUser(mas: IcurUser[], log: string, email: string): boolean {
    for (let val of mas)
      if (val.login == log || val.email == email) return true;
    return false
  }
  addUser(log: string, pass: string, email: string) {
    this.http.post<IcurUser>(this.api.users, { login: log, password: pass, email: email }).subscribe(data => {
      this.curUserID = data.id ? data.id : -1;
      this.logined = true;
      this.userProc = true;
      this.curUserLogin = log
    });
  }

  /*-------------------------------------------------------- */

}
