import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';

// Interfaces
import { iListItems } from '../../interface/iListItems.Interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);
  
  @ViewChild("inputText") public inputText!: ElementRef;
  
  @Input({ required:true }) public inputListItems: iListItems[] = []

  @Output() public outputAddListItems = new EventEmitter<iListItems>()
  public focusAndAddItem(value:string){
    if(value){
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const currentDate = new Date();
      const timeStamp = currentDate.getTime();
      const id = `ID ${timeStamp}`

      this.outputAddListItems.emit({
        id,
        checked: false,
        value
      })
      return this.inputText.nativeElement.focus();
    }
  }
}
