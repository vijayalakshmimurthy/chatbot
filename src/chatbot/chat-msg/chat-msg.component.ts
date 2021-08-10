import { Component, Input, OnInit, Output, EventEmitter , OnChanges } from '@angular/core';

@Component({
  selector: 'chat-msg',
  templateUrl: './chat-msg.component.html',
  styleUrls: ['./chat-msg.component.scss']
})
export class ChatMsgComponent implements OnInit , OnChanges {
  isVisible;
  selectedvalue = '';
  disable = false;
  moreButCheck_bool = false;
  @Input() msg: any;
  @Input() checkcountinput;
  @Input() initialbuttoncount;
  @Input() selectedbuttons: any;
  @Input() loading: boolean;
  @Output() buttontext = new EventEmitter();
  @Output() moreEventemit = new EventEmitter();
  count = 0
  constructor() {
  }
  date = new Date();
  options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  ngOnInit() {
    setTimeout(() => { this.isVisible = true }, 0);
  }
  ngOnChanges() {
  }
  buttonclick(e , type) {
    debugger
    this.count++;
    const value = {
      value : e,
      type: type
    }
    this.selectedvalue = value.value;
    this.moreButCheck_bool = true;
    this.buttontext.emit(value);
    this.disable = true;
  }
  moreButCheck(button,question) {
    if(button !== undefined) {
      this.moreEventemit.emit('keyword')
    }
    if(question !== undefined) {
      this.moreEventemit.emit('question')
    }
    this.moreButCheck_bool = true;
  }
  timeString = this.date.toLocaleString('en-US', this.options);

}
