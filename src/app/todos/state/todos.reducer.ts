import { Action, createReducer, on } from "@ngrx/store";
import * as TodoActions from "./todo.actions";
import { FILTER_MODES } from "./../constants/filter-modes";
import { ITodo } from "../interfaces/ITodo";

export interface ITodosState {
  filterMode?: FILTER_MODES;
  todos?: ITodo[];
}

export const initialState: ITodosState = {
  filterMode: "All",
  todos: [],
};
//@localStore copy of the todo list
let localStore = [];
export function todosReducer(state: ITodosState, action: Action) {
  return createReducer(
    initialState,
    on(TodoActions.addTodo, (existingState, { text }) => {
      localStore = [{ text, completed: false }, ...existingState.todos];
      //with return value of new uncompleted todo
      return {
        ...existingState,
        todos: [{ text, completed: false }, ...existingState.todos],
      };
    }),
    //remove current selected todo
    on(TodoActions.removeTodo, (existingState, { index }) => {
      const updatedTodos = [...existingState.todos];
      updatedTodos.splice(index, 1);
      localStore = [...updatedTodos];
      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),

    //edit todo and update it
    on(TodoActions.updateTodo, (existingState, { index, text }) => {
      const updatedTodos = [...existingState.todos];

      localStore = [...updatedTodos];
      const completedTodo = {
        ...updatedTodos[index],
        text: text,
      };
      return {
        ...existingState,
        todos: {
          ...existingState.todos.slice(0, index),
          completedTodo,
          ...existingState.todos.slice(index + 1),
        },
      };
    }),

    //checking different modes with returning value of completed ,uncompleted and all values
    on(TodoActions.changeFilterMode, (existingState, { mode }) => {
      if (mode === "All") {
        return {
          ...existingState,
          todos: [...localStore],
          filterMode: mode,
        };
      } else if (mode === "Active") {
        console.log(...localStore.filter((data) => !data.completed));
        return {
          ...existingState,
          todos: [
            ...localStore.filter((data) => {
              !data.completed;
            }),
          ],
          filterMode: mode,
        };
      } else if (mode === "Completed") {
        console.log(...localStore.filter((data) => data.completed));
        return {
          ...existingState,
          todos: [
            ...localStore.filter((data) => {
              data.completed;
            }),
          ],
          filterMode: mode,
        };
      }
      return {};
    }),
    //adding select all todos
    // on(TodoActions.toggleAllCompleted, (existingState) => {
    //   const updatedTodos = [...existingState.todos];
    //   const flag = true;
    //   // Object.keys(localStore).forEach(i => {localStore[i].completed = !localStore[i].completed})
    //   let list = [...existingState.todos.filter((todo) => !todo.completed)]
    //   localStore = [...list];
    //   return {
    //     ...existingState,
    //     todos: localStore,
    //   };
    // }),

    //clear all selected todos
    on(TodoActions.clearCompleted, (existingState) => {
      localStore = [...existingState.todos.filter((data) => !data.completed)];
      return {
        ...existingState,
        todos: [...existingState.todos.filter((todo) => !todo.completed)],
      };
    }),
    //dealing with selected todo tab
    on(TodoActions.toggleCompleted, (existingState, { index }) => {
      const updatedTodos = [...existingState.todos];
      const completedTodo = {
        ...updatedTodos[index],
        completed: !updatedTodos[index].completed,
      };
      const list = [
        ...existingState.todos.slice(0, index),
        completedTodo,
        ...existingState.todos.slice(index + 1),
      ];
      localStore = [...list];
      console.log(list.toString);
      return {
        ...existingState,
        todos: localStore,
      };
    })
  )(state, action);
}

export const filterMode = (state: ITodosState) => state.filterMode;
export const todos = (state: ITodosState) => state.todos;
