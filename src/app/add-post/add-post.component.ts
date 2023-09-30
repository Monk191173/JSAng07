import { Component, AfterContentChecked, ElementRef, ViewChild } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})

export class AddPostComponent implements AfterContentChecked {
  public title!: string;
  public message!: string;
  public postName: string = 'Post';
  public postWinName: string = 'Add Post';
  private e_mode = false;
  @ViewChild('clBut') clBut!: ElementRef;

  constructor(public ServUser: BlogService) { }

  ngAfterContentChecked(): void {
    let mes;
    if (this.ServUser.emode) {
      this.ServUser.getMess().subscribe(data => {
        mes = this.ServUser.getMesforEdit(data);
        this.title = mes.title;
        this.message = mes.message;
        this.postName = 'Edit Post';
        this.postWinName = 'Editing post...'
        this.ServUser.emode = false;
        this.e_mode = true;
      })
    }
  }

  AddPost(tit: string, mess: string): void {
    if (!tit || !mess || tit.trim()=='' || mess.trim()=='') alert('Заповніть всі поля !!')
    else {
      if (this.e_mode) {
        this.ServUser.saveEditMess(this.ServUser.curMessID, tit, mess).subscribe();
        this.e_mode = false;
        this.postName = 'Post';
        this.postWinName = 'Add Post';
        this.ServUser.mesProc = true;
      }
      else { this.ServUser.addMess(this.title, this.message).subscribe(() => this.ServUser.mesProc = true); }

      this.title = '';
      this.message = '';
      this.clBut.nativeElement.click();
    }
  }

  closeModal(): void {
    this.e_mode = false;
    this.postName = 'Post';
    this.postWinName = 'Add Post';
    this.title = '';
    this.message = '';
  }

}


