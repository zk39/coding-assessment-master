import { Component,OnInit } from '@angular/core';
import { ITodo } from '@app/todos/interfaces';
import { Store } from '@ngrx/store';
import * as TodoActions from "../../state/todo.actions";
import * as TodoSelectors from "../../state/todo.selectors";
@Component({
  selector: 'app-todos-list',
  styleUrls: [
    './todo-list.component.scss',
  ],
  templateUrl: './todo-list.component.html',
})
export class TodosListComponent {
  name = "";
  todolist: ITodo[];
  constructor(private store: Store){
    
  }
  ngOnInit():void{
    this.store.select(TodoSelectors.allTodos).subscribe((temp:ITodo[])=>{
      this.todolist = temp;
    });
  }
  remove(index:number){
    this.store.dispatch(TodoActions.removeTodo({index}));
  }
  toggleCompleted(index: number) {
    console.log("selected index "+index+" with value :" + this.todolist[index].completed);
    this.store.dispatch(TodoActions.toggleCompleted({index}));
  }
  
}
