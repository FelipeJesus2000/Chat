import { Component, inject, Inject, Input, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DivConversationComponent } from "./components/div-conversation/div-conversation.component";
import { InputComponent } from "./components/input/input.component";
import { ButtonComponent } from "./components/button/button.component";
import IMessage from './interfaces/IMessage';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DivConversationComponent, InputComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chat-app';
  inputValue: string = "";
  @ViewChild('input') inputComponent!: InputComponent;
  @ViewChild('divConversation') divConversation!: DivConversationComponent
  // websocketService: WebsocketService = new WebsocketService();

  constructor(private websocketService: WebsocketService) { }

  handleEventButton($isClicked: boolean) {
    const message = {
      text: this.inputValue,
      type: "sender",
      user: "me"
    };
    console.log("button was clicked");
    console.log(this.inputValue);
    this.websocketService.send(this.inputValue);
    this.inputValue = "";
    this.inputComponent.clear();
    this.divConversation.scrollDown();
    // this.scrollDown();
  }
  handleEventInput($inputValue: string) {
    this.inputValue = $inputValue;
    // console.log($inputValue);
  }
  handleEventConversation($arrMessages: IMessage[]) {
    console.log("handle: " + $arrMessages);

  }

  

}
