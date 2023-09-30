import { Component, AfterContentChecked } from '@angular/core';
import { BlogService } from '../blog.service';
import { IcurMessage } from '../shared/interfaces/faces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterContentChecked {
  public CurMess: IcurMessage[] = [
    {
      userID: -1,
      dateTime: new Date(),
      title: '',
      message: ''
    }
  ];
  public masUsers = [
    {
      login: '',
      password: '',
      email: ''
    }
  ];

  constructor(public ServUser: BlogService) {  }

  ngAfterContentChecked(): void {
    if (this.ServUser.mesProc || this.ServUser.userProc) this.getMess()
  }

  getMess() {
    this.ServUser.getMess().subscribe(data => {
      this.CurMess = data;
    });
    this.ServUser.getUser().subscribe(data => {
      this.masUsers = data;
    }
    );
    this.ServUser.mesProc = false;
    this.ServUser.userProc = false;
  }

  testUserRole(mes: IcurMessage): boolean {
    return this.ServUser.testUser(mes)
  }

  delMess(mes: number = 0): void {
    this.ServUser.deleteMessage(mes).subscribe()
    this.getMess()
  }

  editMess(mes: number = 0): void {
    this.ServUser.emode = true;
    this.ServUser.curMessID = mes;
  }

  getUserNameByID(ID: number): string {
    return this.ServUser.getUserByID(this.masUsers, ID)
  }
}
