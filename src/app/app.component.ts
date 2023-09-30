import { AfterContentChecked, Component } from '@angular/core';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {
  title = 'blog';
  public logined!: boolean;
  public curLogin = '';
  constructor(private ServUser: BlogService) { }


  ngAfterContentChecked(): void {
    this.logined = this.ServUser.logined;
    this.curLogin = this.ServUser.curUserLogin;
  }

  logOut(): void {
    this.ServUser.logined = false;
    this.ServUser.curUserID = -1;
    this.ServUser.curUserLogin = '';
  }
}
