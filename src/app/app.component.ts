import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Todo } from './todo.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'todo-list';
  newTotoTitle: String = '';
  todos: Todo[] = [];
  private readonly storageKey = 'ang_todos';
  todoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  addTodo(): void {
    if (this.todoForm.invalid) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: this.todoForm.get('title')?.value,
      completed: false
    };

    this.todos.push(newTodo);
    this.saveTodos();

    this.todoForm.reset();   // clear
  }

  toggleCompletion(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveTodos();
  }

  // --- ฟังก์ชันจัดการ LocalStorage ---

  private saveTodos(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
  }

  private loadTodos(): void {
    const storedTodos = localStorage.getItem(this.storageKey);
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }

  trackById(index: number, item: Todo): number {
    return item.id;
  }

}
