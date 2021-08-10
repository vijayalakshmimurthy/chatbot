import { Component, ContentChild, ElementRef, OnChanges, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChatbotService } from '../../service/chatbot.service';
import { environment } from '../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'chat-bot',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
  @ContentChild(TemplateRef, { static: false }) template: TemplateRef<any>;
  @Input() msg: Subject<any>;
  @Output() onMsgReceive = new EventEmitter();
  @Output() closechatbot = new EventEmitter();
  @Output() selectedbutton = new EventEmitter();
  @ViewChild('msgArea', { static: false }) msgArea: ElementRef;
  @ViewChild('defaultMsgTemplate', { static: false }) defaultMsgTemplate: TemplateRef<any>;
  @ViewChild('defaultInputTemplate', { static: false }) defaultInputTemplate: TemplateRef<any>;
  loading: boolean = false;
  message = [];
  hidemsgarea: boolean = true;
  selectedbuttons = [];
  listofbut = [];
  question = [];
  showfeedback = false;
  showmorebutton;
  buttonlist: any[]
  count: number = 0;
  text;
  inputmsg;
  character;
  cureentkeyword_index: number = 0;
  cureentquesrion_index: number = 0;
  checkcountofbutton;
  initialbuttoncount;
  /** api request parameter */
  project_id: string = 'Capacity Planning';
  ein = '607981825'
  user_input: string;
  user_selection: string;
  user_selection_type: string;
  keyword: any[] = [];
  topic: string = "CDPR";
  session_Id: any = '';
  rating;
  rating3: number;
  /** end api request parameter */
  public form: FormGroup;
  constructor(private ChatbotService: ChatbotService, private fb: FormBuilder) {
    this.form = this.fb.group({
      rating1: ['', Validators.required]
    });

  }
  ngOnInit() {
    this.character = '1234567890abcdefghijklmnopqrstuvvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let length = this.character.length;
    for (let i = 0; i < 5; i++) {
      this.session_Id += this.character.charAt(Math.floor(Math.random() * length + 1));
    }
    this.addBotMessage('Welcome To Cp', undefined);
    this.loading = true;
    const maindata = environment.base_url + 'chatbot/fetch-keyword?projectName=Capacity Planning';
    this.ChatbotService.get(maindata).subscribe(keyword => {
      this.loading = false;
      this.checkcountofbutton = [...keyword];
      this.loadbutton(keyword, 'keyword');
      // this.msg.subscribe((msg) => {
      //     this.addBotMessage(this.listofbut);
      // })
    });
    this.hidemsgarea = false;
    // this.msg.subscribe((msg) => {
    //   this.handleuserresponse(msg);
    // })
  }

  userselection(input) {
    this.validatekeyword(input, 'input');
  }
  validatekeyword(msg, type) {
    debugger
    this.user_selection = '';
    this.user_input = '';
    this.keyword = [];
    this.user_selection_type = '';
    let keyword = this.buttonlist.map(v => v.toLowerCase());
    if (type === 'input') {
      this.user_selection_type = type
      this.user_input = msg;
      this.msg.next(this.user_input);
      let keywordllist = msg.split(' ');
      for (let i = 0; i < keywordllist.length; i++) {
        if (keyword.indexOf(keywordllist[i].toLocaleLowerCase()) !== -1) {
          this.keyword.push(keywordllist[i]);
        }
      }
    }
    if (type === 'keyword' || type === 'question') {
      this.user_selection_type = type
      this.user_selection = msg;
      this.msg.next(this.user_selection);
    }
    this.handleuserresponse(msg);
    // if (keyword.indexOf(msg.toLocaleLowerCase()) !== -1) {
    //   this.msg.next(msg  + '  Message match with keyword'); 
    //   return true;
    // } else {
    //   this.msg.next('Message not match with keyword');  
    // }
    const reqobj = {
      project_id: 'Capacity Planning',
      ein: '607981825',
      session_id: this.session_Id,
      topic: "CDPR",
      keywords: this.keyword,
      user_input: this.user_input,
      user_selection: this.user_selection,
      user_selection_type: this.user_selection_type
    }
    this.loading = true;
    const questiondata = environment.base_url + 'chatbot/fetch-chatbot-response';
    this.ChatbotService.post(questiondata, reqobj).subscribe(data => {
      this.loading = false;
      this.question = [];
      this.loadbutton(data, 'question');
      this.cureentquesrion_index = 0;
    });
    this.inputmsg = '';
  }
  userinput(e) {
    this.text = e.target.value;
    if (e.keyCode == 13) {
      this.validatekeyword(this.text, 'input')
    }
  }
  hidechatbot() {
    this.closechatbot.emit(false);
  }
  buttontext(value) {
    debugger
    this.selectedbuttons.push(value.value)
    this.selectedbutton.emit(value.value)
    this.validatekeyword(value.value, value.type);
    // this.handleuserresponse(e)
  }
  handleuserresponse(text) {
    this.loading = true;
    this.message.push({
      loading: true
    })
    setTimeout(() => {
      this.msgArea.nativeElement.scrollTop = this.msgArea.nativeElement.scrollHeight;
    });
    this.adduserMessage(text)
    this.loading = false;
  }
  addBotMessage(text?: any, buttontxt?: any, questiontxt?) {
    this.loading = true;
    // this.message.push({
    //   sendBy: 'bot',
    // })
    setTimeout(() => {
      this.message.push({
        text,
        sendBy: 'bot',
        button: buttontxt,
        question: questiontxt,
        moreButton: this.showmorebutton
      })
      this.loading = false;
    }, 600);
    setTimeout(() => {
      this.msgArea.nativeElement.scrollTop = this.msgArea.nativeElement.scrollHeight;
    }, 900);
  }
  adduserMessage(text) {
    this.message.push({
      text,
      sendBy: 'user'
    })
  }
  minimize() {
    this.hidemsgarea = !this.hidemsgarea;
    setTimeout(() => {
      this.msgArea.nativeElement.scrollTop = this.msgArea.nativeElement.scrollHeight;
    });
  }
  showfeedbackarea() {
    this.showfeedback = true;
  }
  submitfeedback(message, rating) {
    this.showfeedback = false;
    console.log(message.trim(), rating)
    this.rating3 = 0;
    
  }
  moreEventemit(type) {
    if (type === 'keyword') {
      this.loadbutton(this.buttonlist, type);
    }
    if (type === 'question') {
      this.loadbutton(this.question, type);
    }
  }
  loadbutton(button?, type?) {
    debugger
    let arr = []
    this.initialbuttoncount = [];
    if (type === 'keyword') {
      this.buttonlist = [...button];
      for (let i = 0; i < button.length; i++) {
        arr.push({ buttontext: button[i] })
      }
      if (this.buttonlist.length < 5) {
        this.listofbut = arr.slice(0, this.buttonlist.length);
        this.showmorebutton = false;
      } else {
        this.listofbut = arr.slice(this.cureentkeyword_index, this.cureentkeyword_index + 5)
        this.checkcountofbutton.splice(0 , 5)
        this.cureentkeyword_index = this.cureentkeyword_index + 5;
        if(this.checkcountofbutton.length !== 0) {
          this.showmorebutton = true;
        }
        }
 
      this.addBotMessage(undefined, this.listofbut, undefined);
    }
    if (type === 'question') {
      this.question = [...button];
      for (let i = 0; i < button.length; i++) {
        arr.push({ buttontext: button[i].primary_Question })
      }
      if (this.question.length < 5) {
        this.listofbut = arr.slice(0, this.question.length);
        this.showmorebutton = false;
      } else {
        this.listofbut = arr.slice(this.cureentquesrion_index, this.cureentquesrion_index + 5)
        this.checkcountofbutton.splice(0,5)
        this.cureentquesrion_index = this.cureentquesrion_index + 5;
        if(this.checkcountofbutton.length !== 0) {
          this.showmorebutton = true;
        }
      }


      this.addBotMessage(undefined, undefined, this.listofbut);
    }
  }

}
