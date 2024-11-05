import {
  Component, OnInit, Output,
  EventEmitter, ElementRef, QueryList,
  ViewChildren, AfterViewInit, Renderer2
} from '@angular/core';
import IMessage from '../../interfaces/IMessage';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-div-conversation',
  standalone: true,
  imports: [],
  templateUrl: './div-conversation.component.html',
  styleUrl: './div-conversation.component.scss'
})

export class DivConversationComponent implements OnInit {
  @Output() messagesEvent = new EventEmitter<IMessage[]>();
  messages: IMessage[] = [];
  @ViewChildren("msg") divsMessages: QueryList<ElementRef> | undefined;

  constructor(
    private websocketService: WebsocketService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    if (this.divsMessages === undefined)
      return;
  }

  addMessage(message: IMessage) {
    if (message != null) {
      if (message.type == "open" || message.type == "close")
        return;

      if (this.messages.length >= 20) {
        this.messages = this.messages.slice(1);
        // this.removeMessages();
      }

      this.messages = [...this.messages, message];
      if(message.type === "sender"){
        this.scrollDown();
      }
      this.emitEvent();
    }

  }

  emitEvent() {
    if (this.messages.length > 0) {
      this.messagesEvent.emit(this.messages);
    }
  }

  ngOnInit(): void {

    // for (let i = 0; i < 10; i++) {
    //   this.addMessage({ text: "message" + i, type: "sender", user: "john doe" });
    //   this.scrollDown();
    // }
    this.websocketService.obsMessage$.subscribe((msg) => {

      this.addMessage(msg)
    })
  }

  scrollDown() {
    const div = this.elementRef.nativeElement.firstChild;
    div.scrollTop = div.scrollHeight - div.clientHeight;
  }

  toScroll($event: Event) {
    const div = this.elementRef.nativeElement.firstChild;
    const max = div.scrollHeight - div.clientHeight;
    // console.log("current position scroll: " + div.scrollTop);

    if (div.scrollTop !== max) {
      div.firstChild.hidden = false;
      div.firstChild.style.marginTop = (div.scrollTop + 400) + "px"
    }
    if (div.scrollTop === max) {
      div.firstChild.hidden = true;
    }
  }

  removeMessages() {
    this.divsMessages?.forEach((divMessage) => {
      // console.log("div:" + divMessage);
      this.renderer.removeChild(this.elementRef, divMessage.nativeElement);
    })
  }
}
