import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text: String = "";

  @Output() btnClick = new EventEmitter<boolean>()
  // isClicked: boolean = false;

  onClick(): void{
    // console.log("click");
    // this.isClicked = true;
    this.emitEvent();
  }

  emitEvent(){
    this.btnClick.emit();
  }
}
