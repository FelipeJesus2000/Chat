import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Output() inputEvent = new EventEmitter<string>();
  @Output() enterEvent = new EventEmitter<boolean>();
  @Input() inputValue: string = "";

  onKeyUp(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    this.inputValue = target.value;

    this.emitEvent();
  }

  emitEvent() {
    this.inputEvent.emit(this.inputValue);
  }

  onEnter(event: KeyboardEvent){
    if(event.key === "Enter"){
      console.log("Key 'enter' was pressed");
      this.enterEvent.emit(true);
    }
  }

  clear() {
    this.inputValue = "";
  }
}
