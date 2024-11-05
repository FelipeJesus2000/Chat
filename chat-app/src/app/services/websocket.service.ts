import { Injectable, OnInit } from '@angular/core';
import IMessage from '../interfaces/IMessage';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnInit {

  token: string = "OtBTQ7YQavw3PZHBEuKfUlQhvHXfbT77IydS3rkUPTORTvqr2gjZRrFVfQkroUK3";
  url: string = `ws://localhost:8080/${this.token}`;
  // socket: WebSocket | null = null;
  socket = new WebSocket(this.url);

  private message = new BehaviorSubject<IMessage>(
    {
      text: "",
      type: "",
      user: ""
    }
  ); // Valor inicial
  obsMessage$ = this.message.asObservable();

  constructor(){
    this.socket.addEventListener("error", (event) => {
      console.error("WebSocket error: ", event);
    });
    this.socket.addEventListener("open", (event) => {
      console.log("Connecting...")
    });
    this.socket.addEventListener("message", (event) => {
     
      const response = JSON.parse(event.data);
      if(response.type === "open" || response.type === "close"){
        console.log("Message from server: ", response.text);
        return;
      }
      this.updateMessage(response);
      // console.log(this.message)
    });
    this.socket.addEventListener("close", (event) => {
      console.warn("The connection was closed.");
    });
    
  }

  ngOnInit(): void {
  }

  send(message: string){
    if(this.socket.readyState === WebSocket.OPEN){
      this.socket.send(message);
    }
  }

  updateMessage(msg: IMessage){
    this.message.next(msg);
  }

}
