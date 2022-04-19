import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as TodoActions from "../app/todos/state/todo.actions";
import { FILTER_MODES } from "./todos/constants/filter-modes";
import { filterMode } from "./todos/state/todos.reducer";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  text = "";
  flag = true;
  constructor(private store: Store) {}

  add() {
    this.store.dispatch(TodoActions.addTodo({ text: this.text }));
    this.text = "";
  }

  clear() {
    this.store.dispatch(TodoActions.clearCompleted());
  }

  switchMode(mode: FILTER_MODES) {
    this.store.dispatch(TodoActions.changeFilterMode({ mode }));
    this.printForm(mode);
  }
  printForm(mode: FILTER_MODES){
    if(mode ==="Completed"){
    this.flag = true;
      return this.flag;
  }
  
  }
}
