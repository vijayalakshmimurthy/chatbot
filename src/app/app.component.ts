import { Component , OnChanges } from '@angular/core';
import {Observable, Subject, from } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges{
  title = 'chatbot';
  
  public msg: Subject<any> = new Subject();
  onbuttonchecked = false;
  constructor() {
  }
  ngOnChanges() {
    
    console.log(this.msg)
  }
  selectedbutton(e){
    
  
console.log(e)
  }
  
  openchatbot() {
    this.onbuttonchecked = true;
  }
  onclosechatbot(e) {
    this.onbuttonchecked = false;
  }
  // public onMsgReceive(msg: string) { }
}
