import { Component, signal } from '@angular/core';

//Components
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';

// Interface
import { iListItems } from '../../interface/iListItems.Interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  public addItem = signal(true);

  #setListItems = signal<iListItems[]>(this.#parseItems());
  public getListItems = this.#setListItems.asReadonly();

  #parseItems(){
    return JSON.parse(localStorage.getItem('@my-list') || '[]')
  }
  public getInputAndAddItem(value: iListItems) {
    localStorage.setItem('@my-list', JSON.stringify([...this.#setListItems() ,value]));

    return this.#setListItems.set(this.#parseItems());
  }

  public listItemsStage(value: 'pending' | 'completed'){
    return this.getListItems().filter((res:iListItems) =>{
      if(value === 'pending'){
        return !res.checked;
      }

      if(value === 'completed'){
        return res.checked;
      }

      return res;
    })
  }

  public deleteAllItems(){
   localStorage.removeItem('@my-list');
   return this.#setListItems.set(this.#parseItems());
  }
}
