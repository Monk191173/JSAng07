import { Component, ElementRef, ViewChild } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  public maxLengthP: number = 15;
  public passRegExp = /^[a-zA-Z0-9_\-\.]{4,16}$/
  public pasStyle = ['tool'];

  public maxLengthE: number = 55;
  public mailRegExp = /^[\w-\.]+@{1}[a-zA-Z]+\.{1}[a-zA-Z]{2,}$/;
  public mailStyle = ['tool'];

  public addEnabled = true;
  public cursor = 'default';
  public pOutColor = 'rgb(159,198,242)';
  public eOutColor = 'rgb(159,198,242)';
  public pVal = '';
  public eVal = '';
  // public userId: number = -1;
  public email!: string;
  public password!: string;

  @ViewChild('subBut') subBut!: ElementRef;
  @ViewChild('pInput') pInput!: ElementRef;
  @ViewChild('eInput') eInput!: ElementRef;
  @ViewChild('clBut') clBut!: ElementRef;

  constructor(private services: BlogService) { }


  validOk(classMas: Array<string>): boolean {
    return classMas.some(elem => elem == 'toolok')
  }

  checkBut(): void {
    if (this.validOk(this.pasStyle) && this.validOk(this.mailStyle)) {
      this.subBut.nativeElement.style.backgroundColor = 'rgb(77, 162, 252)';
      this.subBut.nativeElement.style.cursor = 'pointer';
      this.addEnabled = false;
    }
    else {
      this.subBut.nativeElement.style.backgroundColor = 'rgb(125, 187, 253)';
      this.addEnabled = true;
      this.subBut.nativeElement.style.cursor = 'default';
    }
  }

  resForm(): void {
    this.mailStyle = ['tool'];
    this.eInput.nativeElement.style.zIndex = '0';

    this.pasStyle = ['tool'];
    this.pInput.nativeElement.style.zIndex = '0';

    this.addEnabled = true;
    this.subBut.nativeElement.style.cursor = 'default';

    this.pVal = '';
    this.eVal = '';
  }


  /*---------------------------------------------------------------pass user */

  logIn(email: string, password: string): void {
    this.services.getUser().subscribe(data => {
      if (!this.services.passUser(data, email, password)) alert('Такого користувача не існує !!!')
      else {
        this.resForm();
        this.clBut.nativeElement.click();
      }

    })

  }

  /*-------------------------------------------------------------------password */
  pasFocus(): void {
    let res = this.services.focus(this.passRegExp, this.pVal);
    this.pOutColor = res.col;
    this.pasStyle = res.style;
    this.checkBut();
  };


  pasInput(): void {
    let res = this.services.input(this.passRegExp, this.pVal);
    this.pOutColor = res.col;
    this.pasStyle = res.style;
    this.checkBut();
  };

  /*-------------------------------------------------------------------email */
  mailFocus(): void {
    let res = this.services.focus(this.mailRegExp, this.eVal);
    this.eOutColor = res.col;
    this.mailStyle = res.style;
    this.checkBut();
  };


  mailInput(): void {
    let res = this.services.input(this.mailRegExp, this.eVal);
    this.eOutColor = res.col;
    this.mailStyle = res.style;
    this.checkBut();
  };


}
