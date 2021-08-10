import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ChatWindowComponent } from '../chatbot/chat-window/chat-window.component';
import { ChatMsgComponent } from '../chatbot/chat-msg/chat-msg.component'
import { AppComponent } from './app.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxStarRatingModule } from 'ngx-star-rating';

@NgModule({
  declarations: [
    AppComponent, ChatWindowComponent,
    ChatMsgComponent
  ],
  imports: [
    BrowserModule,
    NgxStarRatingModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule, 
    ReactiveFormsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
